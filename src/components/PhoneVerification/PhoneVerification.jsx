import React from "react";
import "./PhoneVerification.css";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

function PhoneVerification(props){
  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const apiCallExecutedRef = useRef(false);
    const navigate = useNavigate();


    useEffect(() => {
        console.log("this is executed : ")
        if (props.formData.phoneNumber && !apiCallExecutedRef.current) {
            console.log("this is executed too: ")
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
        console.log('Verification not successful:', response.data);
      }
    } catch (error) {
        console.error('Error:', error);
        console.error('Response Data:', error.response.data);
      }
  };

    return (        
        <div className="main-area">

                <div className="section-header">We just texted you.</div>
                <p>A passcode was sent to phone number : {phoneNumber} </p>

                {/* Resend OTP button */}
                <button onClick={resendOTP}>
                    Resend Passcode
                </button>
                <p>Please enter the six digit passcode :  </p>
                {/* Input field for verification code */}
                <input className="form-control" placeholder="Passcode" value={verificationCode} 
                        onChange={(e) => setVerificationCode(e.target.value)}/>
                
                <div className="btn-wrapper">
                        <Link to="/create-profile" className="manulife-btn btn-white text-decoration-none">
                            Back
                        </Link>

                        <button onClick={checkVerificationCode} className="manulife-btn btn-orange text-decoration-none">
                            Verify
                        </button>
                </div>    
             
        </div>
    )
}

export default PhoneVerification;