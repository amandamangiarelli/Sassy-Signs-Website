import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const [selected, setSelected] = useState({data:[]});
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('gmail', 'template_eauc3bp', form.current, 'ItybawPG7mtTmoBjG')
      .then((result) => {
          console.log(result.text);
          alert("Email sent!");
      }, (error) => {
          console.log(error.text);
      });
  };

  //load items in cart on page
   useEffect(()=>{
    fetch('http://localhost:8000/getCart', {
      credentials: 'include',
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setSelected({data});

    });
   }, []);

  return (
    <div className="container">
      <div className="content-flow5">
        <div className="form-style-9">
          <h1>Order Form</h1>
          <form ref={form} onSubmit={sendEmail}>
            <ul>
              <li>
                <label>Name*: </label>
                <input type="text" name="name" required/><br></br>
              </li>
              <li>
                <label>Email*: </label>
                <input type="email" name="email" required/><br></br>
              </li>
              <li>
                <label>Phone*: </label>
                <input type="tel" name="phonenumber" required/><br></br>
              </li>
              <li>
                <label>Address*: </label>
                <input type="text" name="address" required/><br></br>
              </li>
              <li>
                {/*automatically put signs from cart into form so user doesn't have to type them in*/}
                <label>Signs*:</label>
                {selected.data.map((val, index) => {
                  return (<input type="text" name="signs" value={val.sign_name} readonly/>
                )})}
              </li>
              <li>
                <label>Message*:</label>
                <textarea name="message" required/><br></br>
                <input type="submit" value="Send" />
              </li>
            </ul>
          </form>

          <ul>
            <li>Payment is required upon booking to hold your reservation date.</li>
            <li>Venmo is preferred however cash or paypal are accepted.</li>
            <li>Please do not move or alter the sign display.</li>
            <li>Sassy Signs Greenville is not responsible or liable for any injury to any persons and/or property that may occur during the setup, duration or removal of the sign display.</li>
            <li>If you must cancel your order, please let us know as far in advance as possible. The full rental amount will be credited towards a future rental.</li>
            <li>The renter will be responsible for damage and/or theft to the Sassy Signs.</li>
          </ul>
        </div>

        <h3>We will text or email you to finalize details and confirm your request.</h3>
      </div>
    </div>

  );
}

export default ContactUs;
