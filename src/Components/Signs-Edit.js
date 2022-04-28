import React from 'react';
import { useState } from "react";

class SignsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory : ["Data is being fetched"],
      selected : ["Nothing is Selected"],
    };
  }

  RefreshInventory() {

    console.log("refreshed");
    fetch('http://localhost:8000/inventory', {
        method: 'GET',
        credentials: 'include',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({inventory : data});

      });
  }

  componentDidMount() {
    this.RefreshInventory();
  }

  EditSign = (event, val) => {
    var data = val;
    this.setState({selected : data});
  }

  updateName = (event) => {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        sign_name: event.target.value
      }
    }));
  }

  updateQuantity = (event) => {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        quantity: event.target.value
      }
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('sign_name', this.state.selected.sign_name);
    formData.append('quantity', this.state.selected.quantity);
    formData.append('sign_id', this.state.selected.sign_id);

    fetch('http://localhost:8000/inventory/edit', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    this.RefreshInventory();  
 
  }

  static signList = this.state;

  render(){
    return (
        <div>
          <h1>Edit Inventory</h1>
          <div >
              <h2>Table of all the inventory</h2>
              
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.inventory.map((val, key) => {
                    return (
                      <tr> 
                        <td>{val.sign_name}</td> 
                        <td>{val.category_name}</td> 
                        <td>{val.quantity}</td> 
                        <td><img src={"../../uploads/" + val.sign_image} height="200px" alt={val.sign_name}></img></td>
                        <td><button value={val.sign_id} onClick={(event) => {this.EditSign(event, val);}}>Edit</button></td> 
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
          </div>
          <div>
              <h2>Edit Information</h2>
              <form  onSubmit={this.handleSubmit}>
                <label for="name">Name:</label>
                <input type="text" id="name" name="sign_name" value={this.state.selected.sign_name} onChange={this.updateName}></input><br></br>
                <label for="quantity">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value={this.state.selected.quantity} onChange={this.updateQuantity}></input>
                <input type="hidden" id="sign_id" name="sign_id" value={this.state.selected.sign_id}></input>
                <input type="submit" value="Submit"></input>
              </form>
          </div>
        </div>
    );
  };    
};

export default SignsEdit;