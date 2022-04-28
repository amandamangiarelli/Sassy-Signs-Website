import React from 'react';
import { useState } from "react";

class SignsDelete extends React.Component {
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
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({inventory : data});
      });

  }

  SendDelete() {
    const formData = new FormData();
    formData.append('sign_id', this.state.selected.sign_id);
   
    fetch('http://localhost:8000/inventory/delete', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        return response.json();
      });

    this.RefreshInventory();
  }

  componentDidMount() {
    this.RefreshInventory();
  }

  DeleteSign = (event, val) => {
    var data = val;
    console.log("hit 1");
    this.setState({selected : data});
    
  }

  static signList = this.state;
  
  render(){
    return (
      <div>
      <h1>Delete Inventory</h1>
      <div >
          <h2>Table of all the inventory</h2>
          
          <div>
            <table>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Image</th>
              </tr>
              {this.state.inventory.map((val, key) => {

                return (
                  <tr> 
                    <td>{val.sign_name}</td> 
                    <td>{val.category_name}</td> 
                    <td>{val.quantity}</td> 
                    <td><img src={"../../uploads/" + val.sign_image} height="200px"></img></td>
                    <td><button value={val.sign_id} onClick={(event) => {this.DeleteSign(event, val);}}>Delete</button></td> 
                  </tr>
                );
              })}
            </table>
          </div>
            <div>
            <h2>Confirm Delete</h2>
            <p>this is the info your are deleting</p>
            <table>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Image</th>
              </tr>
                  <tr> 
                    <td>{this.state.selected.sign_name}</td> 
                    <td>{this.state.selected.category_name}</td> 
                    <td>{this.state.selected.quantity}</td> 
                    <td><img src={"../../uploads/" + this.state.selected.sign_image}></img></td> 
                  </tr>
            </table>
            <p>If you are sure you would like to delete this entry then click <button onClick={this.SendDelete.bind(this)}>Confirm Delete</button></p>
          </div>
      </div>
    </div>

    );
  }
};

export default SignsDelete;