import React from 'react';

class SignsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sign_name: 'insert name', sign_image: null , category_id: '0', quantity: '0' };
  }
 
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  fileChange = (event) => {
    console.log(event.target.files);
    this.setState({sign_image: event.target.files[0]});
  }
 
  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('sign_name', this.state.sign_name);
    formData.append('sign_image', this.state.sign_image);
    formData.append('category_id', this.state.category_id);
    formData.append('quantity', this.state.quantity);

    fetch('http://localhost:8000/inventory/new', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
 
  }
  
  render(){
    return (
        <div>
            <h1>Add Inventory</h1>
            <div >
              <form onSubmit={this.handleSubmit}>
                <h2>Upload Image for Inventory</h2>
                <label for="sign_image">Select image: </label>
                <input type="file" id="sign_image" name="img" accept="image/*" onChange={this.fileChange}></input>
                <h3>Information for Image</h3> 
                <label for="sign_name">Name: </label><br></br>
                <input type="text" id="sign_name" name="sign_name" value={this.state.sign_name} onChange={this.handleChange} />
                <br></br><br></br>
                <label for="quantity">Quantity: </label><br></br>
                <input type="text" id="quantity" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                <br></br><br></br>
                <label for="category_id">Category(1 = Birthday, 2 = Graduation, 3 = Numbers, 4 = Baby Anouncements, 5 = Holidays, 6 = Add-On): </label><br></br>
                <input type="text" id="category_id" name="category_id" value={this.state.category_id} onChange={this.handleChange} />
                <br></br><br></br>
                <input type="submit" value="Submit"></input>
              </form>
            </div>
        </div>
      );
    };
  }

export default SignsAdd;