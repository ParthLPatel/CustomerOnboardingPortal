import React, { useState } from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import './VerifyIdentity2.css';

function VerifyIdentity2({ formData, updateFormData }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <div className='container'>
      <div className="progressBarContainer1">
          <ProgressBar progress={3} />
        </div>
      <div className='subContainer'>
        

        <div className="header_label">Your ID looks good!</div>
        <p className='checkboxLabel my-4 px-0'>Please check the details of your ID we captured</p>

        <div className="verification-details">
          <p className='idContainer'>
            <p className='eachLabel my-2'>ID Type</p>
            <p className='eachLabelValue'>{formData.IDtype}</p>
          </p>
          <p className='idContainer'>
            <p className='eachLabel my-2'>ID Number</p>
            <p className='eachLabelValue'>123456</p>
          </p>
          <p className='idContainer'>
            <p className='eachLabel my-2'>Expiry Date</p>
            <p className='eachLabelValue'>2030/05/21</p>
          </p>
        </div>

        <div className="verification-checkbox">
          <input
            type="checkbox"
            id="detailsVerified"
            name="detailsVerified"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='detailsVerified' className='checkboxLabel'>Details have been captured correctly</label>
        </div>

        <div className="btn-wrapper my-4 px-0">
          {isCheckboxChecked ? (
              <Link to="/financial-info" className="manulife-btn btn-orange text-decoration-none "
              style={{fontWeight:'700', fontSize:'18px'}}>
                Continue
              </Link>
          ) : (
            <span className="manulife-btn btn-orange btn-orange-lighter"
            style={{fontWeight:'700', fontSize:'18px'}}>Continue</span>
          )}
          <Link to="/verify-identity" className="manulife-btn btn-white text-decoration-none"
          style={{fontWeight:'700', fontSize:'18px'}}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyIdentity2;
