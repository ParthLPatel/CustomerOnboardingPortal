import React from 'react'
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import './VerifyIdentity2.css'

function VerifyIdentity2({ formData, updateFormData }) {

    console.log(formData.IDtype)
  return (
    <div className='container'>

        <div className='subContainer'>

            <div className="progressBarContainer1">
              <p className="progressBarLabel1">Step 3.2 - Verify your identity</p>
              <ProgressBar progress={4} /> {/* Pass the progress for this page */}
            </div>

            <div className="section-header">Your ID looks good!</div>
            <p className='subHeader'>Please check the details of your ID we captured</p>

            <div className="verification-details">
                {/* Display the captured details from step 1 */}
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
                <input type="checkbox" id="detailsVerified" name="detailsVerified"/>
                <label for='detailsVerified' className='checkboxLabel'>Details have been captured correctly</label>
            </div>
            <div className="btn-wrapper my-4 px-0">
                <Link to="/verify-identity" className="manulife-btn btn-white text-decoration-none">
                    Back
                </Link>
                <Link to="/financial-info" className="manulife-btn btn-orange text-decoration-none">
                Continue
                </Link>
            </div>   
        </div> 

    </div>
  )
}

export default VerifyIdentity2