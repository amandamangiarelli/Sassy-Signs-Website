import React from 'react';
import { useState } from "react";

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews : ["Data is being fetched"],
      selected : ["Nothing is Selected"],
    };
  }

  //fetch the reviews
  componentDidMount() {
    fetch('http://localhost:8000/reviews', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({reviews : data});
      });
  }

  render(){
    return (
        <div>
            <h3>Reviews go here</h3>
            {this.state.reviews.map((val, key) => {
                    return (
                      <div> 
                        <p>{val.reviewText}</p> 
                        <p>{val.reviewRating}</p> 
                      </div>
                    );
                  })}
        </div>
    );
  };    
};

export default Reviews;