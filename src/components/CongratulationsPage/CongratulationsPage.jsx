import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './CongratulationsPage.css';

import cardFront from '../../Visa_Infinite_EN.png';

function CongratulationsPage({ formData, updateFormData }) {
  return (
    <div className="container">

      <div className="progressBarContainer1">
          {/* <p className="progressBarLabel1">Step 6 - Review and submit</p> */}
          <ProgressBar progress={6} /> {/* Pass the progress for this page */}
      </div>

      <div className='subContainer p-0'>
        
        <div className='row'>
          
          {/* card header */}
          <div className='card-header px-3'>
              <p style={{fontSize: '24px', textAlign:'left', fontWeight:'600', letterSpacing:'0.3px'}}>Welcome to Manulife Bank</p>
              <p className='header_label' style={{fontSize:'18px', fontWeight:'500', letterSpacing:'0.2px', textAlign:'left', paddingTop:"0em", paddingBottom:'0em'}}>
                <span>Congratulations! </span> 
                Your credit card has been approved.</p>
              <p>We will be sending your credit card application package by mail to you registered address in 10-15 days. 
                <p>Your application tracking ID - <b>A001254367</b></p>
              </p>
          </div>

          <div className='cardContainer'>            
            {/* card section */}
            <div className='cardPhoto'>
                <img src={cardFront} alt='card-front-image' className='frontImg'/>
                
            </div>
            
            {/* card-featiures section */}
            <div className='cardDesc'>
              <p className='paraDesc'>Manulife Visa Infinite Credit Card</p>
              <ul className='featureList px-3' style={{letterSpacing:'0.4px'}}>
                <li>Earn 2 points per $1 spent on gas, groceries and utilities</li>
                <li>1 point per dollar on all other purchases</li>
                <li>0% into APR for 6 months on Balance Transfers and Purchases.</li>
                <li>No Annual Fee</li>
              </ul>
            </div>
          </div>
          <div>
              <button className="manulife-btn btn-orange signInBtn">Sign in</button>
            </div>
          </div>
       
      </div>
    </div>
  );
}

export default CongratulationsPage;
