import React from 'react';
import { useState } from "react";

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpContent : ["Data is being fetched"],
    };
  }

  //load popup information
  componentDidMount() {
    fetch('http://localhost:8000/popUpContent', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({popUpContent : data});
        console.log("first : state", this.state.popUpContent);
      });
  }

  static popUp = this.state;

  //0 false
  //1 true

  render(){
    return (
        <div>
            {this.state.popUpContent.map((val, key) => {
                //if showPopUp is false, don't show anything
                if(val.showPopUp == '0') 
                {
                    return (
                        <p></p>
                    )
                }
                //if showPopUp is true, show the pop up message
                if(val.showPopUp == '1')
                {
                return (
                    <div id="popUpDiv">
                        <p>{val.popUpContent}</p> 
                    </div>
                );
                }
            })}
        </div>
    );
  };    
};

export default PopUp;