const express = require('express');
const path = require('path');
const multer  = require('multer')
const cors = require("cors");
const mysql = require('mysql');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 8000;
const session = require("express-session");
const FileStore = require('session-file-store')(session);

// This displays message that the server running and listening to specified port
let server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(
  session({
    store: new FileStore(), //fileStoreOptions
    secret: "testing",
    httpOnly: false,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600 * 1000 * 3,
      secure: false
    }
  })
);

app.use(cors({
  origin: ["http://localhost:3000", "http://www.sassysignsgreenville.com", "https://www.sassysignsgreenville.com", "http://sassysignsgreenville.com", "https://sassysignsgreenville.com"],
  credentials:true
}));

var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {

    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage });
  
//create database connection
const conn = mysql.createConnection({
  host: 'deltona.birdnest.org', //localhost
  user: 'my.smitho3', //root
  password: 'sequel',
  database: 'my_smitho3_signs'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get("/test", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  res.end();
});

//when a user clicks to add a sign to the cart
app.post("/addCart", upload.none(), (req, res) => {
  console.log("here is the sent body: ", req.body);
  let addition = {
    sign_id : req.body.sign_id,
    sign_name : req.body.sign_name,
    sign_image : req.body.sign_image
  }
  if(req.session.cart){
    var cart = req.session.cart;
    console.log(cart);
    cart.push(addition);
    console.log(cart);
    req.session.cart = cart;
    req.session.cartAmt += 1;
  }
  else{
    req.session.cart = [addition];
    req.session.cartAmt = 1;
  }
  console.log(req.session);
  res.end();
});

//getting the items stored in the cart
app.get("/getCart", async (req, res) => {
  var selected_collection = req.session.cart;
  console.log(selected_collection);  
  res.send(selected_collection);
});

//add new sign
app.post('/inventory/new', upload.single('sign_image'), (req, res) => {
  let data = {sign_name: req.body.sign_name, sign_image: req.file.filename, category_id: req.body.category_id, quantity: req.body.quantity};
  let sql = "INSERT INTO Signs SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//edit sign
app.post('/inventory/edit', upload.none(), (req, res) => {
  let data = [req.body.sign_name, req.body.quantity, req.body.sign_id];
  let sql = "UPDATE Signs SET sign_name = ?, quantity = ? WHERE sign_id = ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//delete a sign
app.post('/inventory/delete', upload.none(), (req, res) => {
  let data = [req.body.sign_id];
  let sql = "DELETE from Signs WHERE sign_id = ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get images in inventory
app.get("/inventory", (req, res) => {
  conn.query("SELECT sign_id, sign_name, sign_image, quantity, category_name FROM Signs s LEFT JOIN categories c on s.category_id = c.category_id; ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//get popup contents
app.get("/popUpContent", (req, res) => {
  conn.query("SELECT showPopUp, popUpContent FROM popup WHERE id = 1; ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//editing popup content
app.post("/editPopUp", upload.none(), (req, res) => {
  const showPopUp = req.body.showPopUp;
  const popUpContent = req.body.popUpContent;
  //if true, show pop-up and change the pop up content
  if(showPopUp != 'true'){
    conn.query(
      "UPDATE popup SET showPopUp = 0, popUpContent = ? WHERE id = 1",
      [popUpContent],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }
  //if false, don't show popup and change the pop up content
  else {
    conn.query(
      "UPDATE popup SET showPopUp = 1, popUpContent = ? WHERE id = 1",
      [popUpContent],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }
});

//get reviews
app.get("/reviews", (req, res) => {
  conn.query("SELECT review_id, reviewText, reviewRating FROM reviews;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//editing reviews
app.post('/editreviews', upload.none(), (req, res) => {
  let data = [req.body.reviewText, req.body.reviewRating, req.body.review_id];
  let sql = "UPDATE reviews SET reviewText = ?, reviewRating = ? WHERE review_id = ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));

  });
});

//showing gallery pics
app.get("/gallery", (req, res) => {
  conn.query("SELECT * FROM gallery; ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

//uploading new image to gallery
app.post('/gallery/new', upload.single('gallery_image'), (req, res) => {
  let data = {image_name: req.body.image_name, gallery_image: req.file.filename, displayed: 0};
  let sql = "INSERT INTO gallery SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//editing info for gallery image
app.post('/gallery/edit', upload.none(), (req, res) => {
  let newDisplay;
  if (req.body.displayed === 'false' || req.body.displayed === false){
    newDisplay = 1;
  }
  else {
    newDisplay = 0;
  }
  let data = [newDisplay, req.body.image_id];
  let sql = "UPDATE gallery SET displayed = ? WHERE image_id = ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});