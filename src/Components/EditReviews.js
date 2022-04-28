import React from 'react';
import { useState } from "react";

class EditReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews : ["Data is being fetched"],
      selected : ["Nothing is Selected"],
    };
  }

  //refresh reviews when state changes
  RefreshReviews() {
    fetch('http://localhost:8000/reviews', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({reviews : data});
      });

  }

  componentDidMount() {
    this.RefreshReviews();
  }

  EditReviews = (event, val) => {
    var data = val;
    this.setState({selected : data});
  }

  updateText = (event) => {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        reviewText: event.target.value
      }
    }));
  }

  updateRating = (event) => {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        reviewRating: event.target.value
      }
    }));
  }

  //handle submitting edited review
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('reviewText', this.state.selected.reviewText);
    formData.append('reviewRating', this.state.selected.reviewRating);
    formData.append('review_id', this.state.selected.review_id);

    fetch('http://localhost:8000/editreviews', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    this.RefreshReviews();

  }

  render(){
    return (
        <div class="container">
          <div class="content-flow7">
            <h1>Edit Reviews</h1>
              <h3>Currently Visible Reviews</h3>
              <div>
                <table>
                  <tr>
                    <th>Content</th>
                    <th>Rating</th>
                    <th>Edit</th>
                  </tr>
                  {this.state.reviews.map((val, key) => {
                    return (
                      <tr>
                        <td>{val.reviewText}</td>
                        <td>{val.reviewRating}</td>
                        <td><button value={val.review_id} id="editbutton" onClick={(event) => {this.EditReviews(event, val);}}>Edit</button></td>
                      </tr>
                    );
                  })}
                </table>
          </div>



              <div class="form-style-9">
                <h3>Edit a Review</h3>
                <form  onSubmit={this.handleSubmit}>
                <ul>

                <li>

                  <label for="reviewText">Text: </label>
                  <input type="text" id="reviewText" name="reviewText" value={this.state.selected.reviewText} onChange={this.updateText}></input>
                </li>
                <li>
                  <label for="reviewRating">Rating: </label>
                  <input type="text" id="reviewRating" name="reviewRating" value={this.state.selected.reviewRating} onChange={this.updateRating}></input>
                </li>
                  <input type="hidden" id="review_id" name="review_id" value={this.state.selected.review_id}></input>
                  <input type="submit" id="submitbutton" value="Submit"></input>
                </ul>
                </form>
              </div>
          </div>
        </div>
    );
  };
};

export default EditReviews;
