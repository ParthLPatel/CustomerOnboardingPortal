import React, { useState } from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import './CongratulationsPage.css';
import checkMark from "../../assets/checkMark.png"


function CongratulationsPage({ formData, updateFormData }) {




  return (
    <div className='container'>
      <div className="progressBarContainer1">
          <ProgressBar progress={6} />
        </div>
      <div className='subContainer'>
        
        <div className='row outerContainer'>
          <div className='col greenBox'>
            <img src={checkMark} className='checkMarkLogo completed-animation' alt="Checkmark"/>
          </div>
          <div className="col descContainer">
            <p className='header_label mt-4 mb-4' style={{textAlign: 'left'}}>Welcome to Manulife Bank</p>
            <p className='desc'>We’re so thrilled you are here!</p>
            <p className='desc'>Now, you may sign in the online banking portal to view your account details, fund your account and start you financial success journey with Manulife Bank</p>
          </div>
          <div className="col descContainer">
            <button className="manulife-btn btn-orange signInBtn">Sign in</button>
          </div>
          </div>
       
      </div>
    </div>
  );
}

export default CongratulationsPage;
