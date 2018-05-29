import React, { Component } from 'react';
import sun from '../sun.svg';
import './App.css';
import {validateEmail} from '../Util';
import DropDown from './DropDown';
import Message from './Message';
import axios from 'axios';

/**
 * Class representing the Weather App component which
 * is made up of smaller, reusable components.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      error: false, 
      message: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
  }

  /**
   * Handle email input change. Update state with current value.
   */
  onEmailChange(event) {
    this.setState({email: event.target.value});
  }

  /**
   * Send user email and city to web server.
   * @param {Stirng} email 
   * @param {String} city 
   */
  sendData(email, city) {
    let obj = Object.assign(this.state);
    const alreadySubedMsg = "The email you have entered is already subscribed.";
    const subConfirmationMsg = "You are subscribed! Check your email for weather updates.";
    axios.post("http://localhost:5000/api/v1/subscribe", {email: email, city: city})
    .then(res => {
      if(!res.data.newUser) {
        obj.message = alreadySubedMsg;
        obj.error = true;
        this.setState(obj);
      }
      else {
        obj.message = subConfirmationMsg;
        obj.error = false;
        this.setState(obj);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  /**
   * Handle subscribe button press.
   */
  onSubscribe() {
    const DEFAULT_CITY = "City";
    let city = document.getElementsByClassName("dropDownButton")[0].innerText;
    let obj = Object.assign(this.state);
    if(validateEmail(this.state.email)) {
      if(city !== DEFAULT_CITY) {
        // send data to server. show success message
        obj.message = "";
        obj.error = false;
        this.setState(obj);
        this.sendData(this.state.email, city);
      }
      else {
        // error: no city selected
        obj.message = "Please select a city from the dropdown menu.";
        obj.error = true;
        this.setState(obj);
      }
    }
    else {
      // error: invalid email
      obj.message = "Please input a valid email address.";
      obj.error = true;
      this.setState(obj);
    }
  }

  render() {
    return (
      <div className="AppContainer">
        <div className="appCard">
          <div className="cardHeader">
            <img src={sun} className="cardIcon" alt="bright sun"/>
            <h2 className="cardTitle">Weather Powered Email</h2>
          </div>
          <div className="cardInput">
            <div className="inputTitleWrapper">
              <label>Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.onEmailChange}/>
            </div>
          </div>
          <DropDown />
          <Message message={this.state.message} isError={this.state.error}/>
          <div className="cardFooter">
            <button className="subscribeButton button" onClick={this.onSubscribe}>Subscribe</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
