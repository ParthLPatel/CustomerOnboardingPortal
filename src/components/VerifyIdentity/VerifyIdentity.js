import React, {useState} from 'react'
import { useForm } from 'react-hook-form';

import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';

import './VerifyIdentity.css'

function VerifyIdentity({ formData, updateFormData }) {

  const {
    register,
    handleSubmit, // Add the missing import
  } = useForm();

  const IDtypeoptions = [
    "Driver's License",
    "Passport",
    "Health Card"
  ];

  const [verificationOption, setVerificationOption] = useState(''); // Add the missing state
  const [IDtype, setIDType] = useState(''); // Add the missing state


//         IDtype: "",
//         selectedIDFile: "",
//         selectedSelfieFile: "",
//         verificationOption: "",


  const handleInputChange = (e, fieldName) => {
      updateFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleIDtype = (e) => {
      setIDType(e.target.value);
      updateFormData({ ...formData, IDtype:  e.target.value});
  }

  // handle document file upload 
  const handleIDFileChange = (event) => {
    // Get the selected file
    const file = event.target.files[0];
    // Update the state with the selected file
    updateFormData({ ...formData, selectedIDFile: file });
  };

  // handle selfie file upload
  const handleSelfieFileChange = (event) => {
    // Get the selected file
    const file = event.target.files[0];
    // Update the state with the selected file
    updateFormData({ ...formData, selectedSelfieFile: file });
  };

  //handle verification option
  const handleVerificationOptionClick = (option) => {
    setVerificationOption(option);
    updateFormData({ ...formData, verificationOption: option });
  };


  // on form submit:
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className='container'>
        <div className='subContainer'>
          
          <div className="progressBarContainer1">
              <p className="progressBarLabel1">Step 3.1 - Verify your identity</p>
              <ProgressBar progress={3} /> {/* Pass the progress for this page */}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}> 
            <div className="section-header">We need to verify your photo ID</div>
            <p className='subHeader'>You can share your ID with us online or in person </p>
        
            <div className="verification-options">
                    <button
                        className={`verification-button verificationBtnGreen ${verificationOption === 'online' ? 'selected' : ''}`}
                        type="button"
                        onClick={() => handleVerificationOptionClick('online')}
                    >
                        Online
                    </button>

                    <button
                        className={`verification-button verificationBtnWhite ${verificationOption === 'inPerson' ? 'selected' : ''}`}
                        type="button"
                        onClick={() => handleVerificationOptionClick('inPerson')}
                    >
                        In Person
                    </button>
            </div>

            
            <div className='stepContainer'>
              <div className='btnStep'>1</div>
              <label htmlFor="dropdown" className='dropdown'>A photo of your ID</label>
            </div>
            <select id="dropdown" value={IDtype} onChange={handleIDtype} className="form-control">
                <option value="">Select ID type</option>
                {IDtypeoptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {/* Button to upload ID photo */}            
            <div className="form-group">
                <label htmlFor="fileUpload" className='labelUpload'>+ Upload ID photo</label>
                <input
                    type="file"
                    id="fileUpload"
                    accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
                    onChange={handleIDFileChange}
                    hidden 
                />
                {/* Display the uploaded file name */}
                {formData.selectedIDFile && <p className='dropdown m-2'>File uploaded: {formData.selectedIDFile.name}</p>}
            </div>

            {/* Button to upload selfie file */}            
            <div className="form-group">
                <div className='stepContainer'>
                  <div className='btnStep'>2</div>
                  <label htmlFor="fileUpload1" className='dropdown'>A selfie of yourself</label>
                </div>
                <label htmlFor="fileUpload1" className='labelUpload'>+ Upload selfie</label>
                <input
                    type="file"
                    id="fileUpload1"
                    accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
                    onChange={handleSelfieFileChange}
                    hidden
                />

                {/* Display the uploaded file name */}
                {formData.selectedSelfieFile && <p className='dropdown m-2'>File uploaded: {formData.selectedSelfieFile.name}</p>}
            </div>
    
            <div className="btn-wrapper my-4">
                <Link to="/verify-phone-number" className="manulife-btn btn-white text-decoration-none">
                    Back
                </Link>
                <Link to="/confirm-identity" className="manulife-btn btn-orange text-decoration-none">
                Continue
                </Link>
            </div>
          </form>   
        </div> 
    </div>
  )
}

export default VerifyIdentity