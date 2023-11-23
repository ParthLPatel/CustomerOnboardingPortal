import React from "react";
import "./PhoneVerification.css";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from "../ProgressBar/ProgressBar";
import TextField from '@mui/material/TextField';

import phoneLogo from './phoneLogo.png'
import Button from '@mui/material/Button';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

function PhoneVerification(props){
  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const apiCallExecutedRef = useRef(false);
    const navigate = useNavigate();


    useEffect(() => {
     
        if (props.formData.phoneNumber && !apiCallExecutedRef.current) {
       
          // Set the phone number and send verification code
          setPhoneNumber(props.formData.phoneNumber);
          sendVerificationCode(props.formData.phoneNumber);
          apiCallExecutedRef.current = true;
        }
      }, [props.formData.phoneNumber]);

    // Function to send verification code
  const sendVerificationCode = async (phone) => {
    try {
        
        const response = await axios.post(
            'https://verify.twilio.com/v2/Services/VAcc79b879ce82d7e8a17e20022979fdba/Verifications',
            `To=%2B1${encodeURIComponent(phone)}&Channel=sms`,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('AC66165b5e7ef24e7dcd14d2652d01bf9d:047f14a8ce69e82ca4bb852beff520b7')
              }
            }
          );
        console.log(response.data); // Handle the response as needed
        apiCallExecutedRef.current = true;
    } catch (error) {
        console.error('Error:', error);
        console.error('Response Data:', error.response.data);
      }
  };

  // Function to resend OTP
  const resendOTP = () => {
    sendVerificationCode(phoneNumber);
  };

  // Function to check verification code
  const checkVerificationCode = async () => {
    try {
      const response = await axios.post(
        `https://verify.twilio.com/v2/Services/VAcc79b879ce82d7e8a17e20022979fdba/VerificationCheck`,
        `To=%2B1${encodeURIComponent(phoneNumber)}&Code=${verificationCode}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('AC66165b5e7ef24e7dcd14d2652d01bf9d:047f14a8ce69e82ca4bb852beff520b7')
              }
        }
      );
      console.log(response.data); // Handle the response as needed
     // Check if verification was successful
     if (response.data.status === 'approved') {
        // Display an alert box for successful verification
        alert('Verification successful!');
        navigate("/verify-identity");
      } else {
        // Handle other verification statuses if needed
        alert('Verification unsuccessful, please try again!');
        console.log('Verification not successful:', response.data);
      }
    } catch (error) {
        console.error('Error:', error);
        console.error('Response Data:', error.response.data);
      }
  };

    return (        
        <div className="container">

          <div className="progressBarContainer1">
              {/* <p className="progressBarLabel1">Step 2 - Verify your phone number</p> */}
              <ProgressBar progress={2} /> {/* Pass the progress for this page */}
          </div>

          <div className=' subOTPContainer'>

                <div className="headerContainer">
                    <img src={phoneLogo} alt="Your SVG" className="phoneLogo"/>
                    <p className="header_label headerlbl my-2">We just texted you.</p>
                </div>
                <p className="subHeaderOTP my-3">A passcode was sent to <span className="subHeaderBold">{phoneNumber}</span></p>

                {/* Resend OTP button */}
                <Button variant="contained" 
                    onClick={resendOTP} 
                    className="labelUpload mt-1"
                    style={
                      { backgroundColor: 'white', 
                        color: 'green',
                        fontWeight: 600,
                        fontSize: "14px",
                        border: "2px solid green",
                        borderRadius: "100px" }}>
                  Resend passcode
                </Button>
                <p className="subHeaderOTP my-4">Please enter the six digit passcode :  </p>
                {/* Input field for verification code */}
                <TextField
                  className="form-control"
                  placeholder="Passcode"
                  label="Passcode"
                  variant="outlined"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                
                <div className="btn-wrapper my-4">
                    <Link to="/create-profile" className="manulife-btn btn-white text-decoration-none">
                        Back
                    </Link>

                    <button onClick={checkVerificationCode} className="manulife-btn btn-orange text-decoration-none">
                        Verify
                    </button>
                </div>  

                </div>  
             
        </div>
    )
}

export default PhoneVerification;