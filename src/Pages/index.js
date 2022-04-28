import React from 'react';
import PopUp from '../Components/PopUp';
import Reviews from '../Components/Reviews';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery : ["Data is being fetched"]
    };
  }

  //load images to the front page
  RefreshGallery() {
    fetch('http://localhost:8000/gallery', {
        method: 'GET',
        credentials: 'include',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({gallery : data});
      });
  }

  componentDidMount() {
    this.RefreshGallery();
    fetch('http://localhost:8000/test', {
        credentials: 'include',
        method: 'GET'
      });
  }

  render(){
    return (
      <div class="container">
        <PopUp/>
        <div class="content-flow1">
          {this.state.gallery.map((val, key) => {
            if(val.displayed == 1){
              return (
                <img class="my class" src={"../../uploads/" + val.gallery_image}></img>
              );
            }
          })}
          <h1>NEED A SIGN? ORDER AND CONTACT US BELOW</h1>
        </div>

        <div class="content-flow2">
          <div id="newborns"></div>
          <div id="annivs"></div>
          <div id="bdays"></div>
          <div id="xmas"></div>
          <div id="hallow"></div>
        </div>

        <Reviews/>

        <div class="content-flow4">
          <div>
            <h3>What is Sassy Signs?</h3>
            <p>Sassy Signs is a yard sign rental company in Greenville, S.C. We deliver personalized yard signs to your home, business or school to help celebrate life’s most memorable moments.</p>
            <ul>
              <li>Browse through past Sassy Signs Celebrations. Our pictures are submitted by our satisfied cutomers.</li>
              <li>Select the signs that are perfect for YOUR celebrations!</li>
              <li>To get YOUR Sassy Sign started, fill out the form and we'll be in contact with you.</li>
            </ul>
          </div>

          <div>
          <h3>What makes us special?</h3>
            <p>We design, draw, cut, paint and personalize each sign for one purpose: to bring joy and smiles to all viewers, specifically your loves ones. Unlike other sign companies in the area, our signs are made from sturdy, hand cut plywood, all hand painted and up to 5 feet tall. Our Sassy Signs make a big statement to give that extra wow factor with solar lights to keep your sign well lit!</p>
          </div>

        </div>

      </div>
    );
  }
};

export default Home;
