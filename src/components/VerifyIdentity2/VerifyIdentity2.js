import React, { useState } from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import './VerifyIdentity2.css';

function VerifyIdentity2({ formData, updateFormData }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleContinueClick = () => {
    // Check if the checkbox is checked before proceeding
    if (isCheckboxChecked) {
      // Continue with your logic
      console.log('Continue button clicked');
    } else {
      // Optionally, you can show a message or perform some other action
      console.log('Checkbox not checked. Please check before continuing.');
    }
  };

  return (
    <div className='container'>
      <div className='subContainer'>
        <div className="progressBarContainer1">
          <ProgressBar progress={4} />
        </div>

        <div className="section-header">Your ID looks good!</div>
        <p className='subHeader'>Please check the details of your ID we captured</p>

        <div className="verification-details">
          <p className='idContainer'>
            <p className='dropdown my-1'>ID Type</p>
            <p>{formData.IDtype}</p>
          </p>
          <p className='idContainer'>
            <p className='dropdown my-1'>ID Number</p>
            <p>123456</p>
          </p>
          <p className='idContainer'>
            <p className='dropdown my-1'>Expiry Date</p>
            <p>2030/05/21</p>
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
          <Link to="/verify-identity" className="manulife-btn btn-white text-decoration-none">
            Back
          </Link>
          {isCheckboxChecked ? (
            <Link to="/financial-info" className="manulife-btn btn-orange text-decoration-none ">
              Continue
            </Link>
          ) : (
            <span className="manulife-btn btn-orange btn-orange-lighter">Continue</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyIdentity2;
