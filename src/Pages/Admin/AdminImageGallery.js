import React from 'react';

class AdminImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGallery : ["Data is being fetched"],
      gallery : ["Data is being fetched"],
      selected : ["Nothing is Selected"],
      addition : {image_name: 'name', gallery_image: null}
    };
  }

  //refresh when gallery changes
  RefreshGallery() {
    fetch('http://localhost:8000/gallery', {
        credentials: 'include',
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({gallery : data});
      });

  }

  componentDidMount() {
    this.RefreshGallery();
  }

  EditGallery = (event, val) => {
    this.updateDisplayed(event,val);
  }

  updateDisplayed(val){
    const formData = new FormData();
    formData.append('image_id', val.target.name);
    if(val.target.value == 1)
          formData.append('displayed', true);
    else
          formData.append('displayed', false);

    fetch('http://localhost:8000/gallery/edit', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        return response.json();
      });

    this.RefreshGallery();
  }

  handleChange = (event) => {
    this.setState(prevState => ({
      addition: {
        ...prevState.addition,
        image_name: event.target.value
      }
    }));
  }

  fileChange = (event) => {
    this.setState(prevState => ({
      addition: {
        ...prevState.addition,
        gallery_image: event.target.files[0]
      }
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image_name', this.state.addition.image_name);
    formData.append('gallery_image', this.state.addition.gallery_image);

    fetch('http://localhost:8000/gallery/new', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        console.log(response);
        this.RefreshGallery();
        return response.json();
      });

    this.RefreshGallery();
  }

  render(){

    return (
      <div class="container">
        <div class="content-flow5">
        <h1>Gallery Image Selection</h1>

          <p id="gallinstruc">Currently displayed image gallery. when hovering over an image there is a delete buton (X)</p>
          <table>
                  <tr>
                    <th>Name</th>
                    <th width="400px">Image</th>
                  </tr>
                  {this.state.gallery.map((val, key) => {
                    if(val.displayed == 1){
                      return (
                        <tr>
                          <td>{val.image_name}</td>
                          <td><img src={"../../uploads/" + val.gallery_image} height="200px"></img></td>
                          <td><button name={val.image_id} value={val.displayed} onClick={(event) => {this.EditGallery(event, val);}}>Remove Display</button></td>
                        </tr>
                      );
                    }
                  })}
          </table>


          <h3>Grid is not in gallery, click to add images</h3>
          <div>
                <table>
                  <tr>
                    <th>Name</th>
                    <th  width="400px">Image</th>
                  </tr>
                  {this.state.gallery.map((val, key) => {
                   if(val.displayed !== 1){
                    return (
                      <tr>
                        <td>{val.image_name}</td>
                        <td><img src={"../../uploads/" + val.gallery_image} height="200px"></img></td>
                        <td><button  name={val.image_id} value={val.displayed} onClick={(event) => {this.EditGallery(event, val);}}>Display</button></td>
                      </tr>
                    );
                  }
                  })}
                </table>
            </div>


            <h2>Add Gallery Image</h2>

            <div class="addimage">
              <form onSubmit={this.handleSubmit}>
                <h3>Upload Image for Inventory</h3>
                <label for="gallery_image">Select image: </label>
                <input type="file" id="gallery_image" name="img" accept="image/*" onChange={this.fileChange}></input>
                <h2>Information</h2>
                <label for="image_name">Name: </label>
                <input type="text" id="image_name" name="sign_name" value={this.state.sign_name} onChange={this.handleChange} />
                <br></br>
                <input type="submit" value="Submit"></input>
              </form>
            </div>

        </div>
      </div>
    );
  }
};

export default AdminImageGallery;
