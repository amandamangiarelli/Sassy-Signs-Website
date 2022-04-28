import React from 'react';
import { Link } from 'react-router-dom';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory : ["Data is being fetched"],
      selected : ["none are currently selected"]
    };
  }

  //refresh when items are added to cart
  RefreshInventory() {
    fetch('http://localhost:8000/inventory', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({inventory : data});

      });
      fetch('http://localhost:8000/getCart', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({selected : data});
        //console.log(data);
      });

  }

  //load items in cart
  getCart() {
    console.log("cart refreshed");
    fetch('http://localhost:8000/getCart', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({selected : data});
        //console.log(data);
      });
  }

  //add a sign to the cart
  addSignToCart(event, val) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('sign_id', val.sign_id);
    formData.append('sign_name', val.sign_name);
    formData.append('sign_image', val.sign_image);
    console.log(formData);

    fetch('http://localhost:8000/addCart', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then((response) => {
        console.log(response);
        this.getCart();
      });
  }

  componentDidMount() {
    this.RefreshInventory();
  }

  render(){
    return (
      <div className="container">
        <div className="content-flow6">
          <h1>Our Inventory</h1>
            <p>Your <i>first Sassy Sign is $65</i> and comes with vinyl personalization of the event. Each <i>additional sign is $10</i>. We install your Sassy Signs the evening before the event and pick them up the day after which allows you to enjoy your signs for 40-48 hours.</p>
            <p>Pending availability, <i>rental sign extension is $10 per day.</i></p>
            <p>Birth announcement Sassy Signs are $85. These stay up for 5 days. Choose from larger-than-life, pink or blue rattles, or baby carriages. Included is a keepsake wooden medallion with the baby’s birth information. Don’t forget big brother or sister! Add a star with their name for only $10.</p>
            <p>Delivery is free within a 15 mile radius of I-85/385 in Greenville. Please contact us for delivery fees outside of this area, custom sign requests, or general information.</p>
            <h3>Browse our inventory and choose which Sassy Signs are right for you!</h3>
        <div>
        {this.state.selected.map((val, key) => {
                    return (
                      <img src={"../../uploads/" + val.sign_image} height="200px" alt={val.sign_name}></img>
                    );
                  })}
          <Link to="/contact">CART</Link>
        </div>
        <div className="inven-layout">
          {this.state.inventory.map((val, key) => {
                    return (
                      <button value={val.sign_id} onClick={(event) => {this.addSignToCart(event, val);}} ><img src={"../../uploads/" + val.sign_image} height="200px" alt={val.sign_name}></img> {val.sign_name}</button>
                    );
                  })}
        </div>
        </div>
      </div>
    );
  }
};

export default Inventory;
