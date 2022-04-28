import React from 'react';
import PopUp from '../../Components/PopUp';

class AdminPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpContent: 'Message Here',
      showPopUp: false,
    };
  }

  //see if show popup is checked or not
  handleChange = (event) => {
    if(event.target.name == "showPopUp")
    {
      if(event.target.checked) {
        this.setState({showPopUp : true});
      }
      else{
        this.setState({showPopUp : false});
      }

    }
    else
    {
      this.setState({[event.target.name]: event.target.value});
    }

    console.log(this.state);
  }

  //submit changes to popup
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const formData = new FormData();
    formData.append('showPopUp', this.state.showPopUp);
    formData.append('popUpContent', this.state.popUpContent);

    fetch('http://localhost:8000/editPopUp', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }).then(function(response) {
        console.log(response)
        alert("Pop-up saved");
        return response.json();
      });

  }


  render(){
    return (
        <div class="content-flow5">
            <h1>Edit Pop-Ups</h1>
            <div>
              <p>Current Message:</p>
              <PopUp />
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <ul>
                  <li id="pop-spacing">
                    <label htmlFor="showPopUp">Show Pop-up?: </label>
                    <input type="checkbox" id="showPopUp" name="showPopUp" value={this.state.showPopUp} onChange={this.handleChange}/>
                  </li>
                  <li id="pop-spacing">
                    <label htmlFor="popUpContent">Content (Text Only): </label>
                    <input type="textarea" id="popUpContent" name="popUpContent" value={this.state.popUpContent} onChange={this.handleChange} size="50" />
                  </li>
                    <input type="submit" value="Save"></input>
                </ul>
              </form>
            </div>
        </div>
      );
    };
  }

export default AdminPopUp;
