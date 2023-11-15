import React from "react";
import "./PhotoidVerification.css";
import {useState} from "react";
import {useForm} from "react-hook-form";
import { render } from "@testing-library/react";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

function PhotoidVerification(){

    const {register, handleSubmit, errors} = useForm();
    const [IDtype, setIDtype] = useState('');
    const [selectedIDFile, setSelectedIDFile] = useState(null);
    const [selectedSelfieFile, setSelectedSelfieFile] = useState(null);
    const [verificationOption, setVerificationOption] = useState('');
    const [step, setStep] = useState(1);

    const IDtypeoptions = [
        "Driver's License",
        "Passport",
        "Health Card"
    ];

    const handleDropdownChange = (event) => {
        setIDtype(event.target.value);
        console.log(IDtype)
        setCapturedDetails({ ...capturedDetails, IDType: event.target.value });
    
    };

    const handleIDFileChange = (event) => {
        // Get the selected file
        const file = event.target.files[0];
    
        // Update the state with the selected file
        setSelectedIDFile(file);
    };
    
    const handleSelfieFileChange = (event) => {
        // Get the selected file
        const file = event.target.files[0];
    
        // Update the state with the selected file
        setSelectedSelfieFile(file);
    };

    const [capturedDetails, setCapturedDetails] = useState({
        IDType: ''
    });

    const handleVerificationOptionClick = (option) => {
        setVerificationOption(option);
        
    };

    const handleBackButtonClick = () => {
        // Reset temporary state when going back to step 1
        setStep(1);
        // Reset other temporary state if needed
    };

    const onSubmit = (data) => {
        
        if (step === 1) {
            setIDtype(data);
            setStep(2); // Move to step 2 after successful submission
          } else {
            // Handle step 2 submission (confirmation)
            // Add logic to handle confirmation and any further actions
          }
    };

    return (        
        <div className="main-area">
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* step 1 is the form where user uploads the identity documents */}  
                { step === 1 ? (
                <div>
                    <div className="section-header">We need to verify your photo ID</div>
                    <p>You can share your ID with us online or in person </p>
                
                    <div className="verification-options">
                            <button
                                className={`verification-button ${verificationOption === 'online' ? 'selected' : ''}`}
                                type="button"
                                onClick={() => handleVerificationOptionClick('online')}
                            >
                                Online
                            </button>

                            <button
                                className={`verification-button ${verificationOption === 'inPerson' ? 'selected' : ''}`}
                                type="button"
                                onClick={() => handleVerificationOptionClick('inPerson')}
                            >
                                In Person
                            </button>
                    </div>

                    
                        <label htmlFor="dropdown">A photo of your ID</label>
                        <select id="dropdown" value={IDtype} onChange={handleDropdownChange}>
                            <option value="">Select ID type</option>
                            {IDtypeoptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {/* Button to upload ID photo */}            
                        <div className="form-group">
                            <label htmlFor="fileUpload">Upload ID file:</label>
                            <input
                                type="file"
                                id="fileUpload"
                                accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
                                onChange={handleIDFileChange}
                                style={{ display: 'none' }}
                            />

                            {/* Button to trigger file input */}
                            <button
                                type="button"
                                onClick={() => document.getElementById('fileUpload').click()}
                            >
                                Upload ID photo
                            </button>

                            {/* Display the uploaded file name */}
                            {selectedIDFile && <p>File uploaded: {selectedIDFile.name}</p>}
                        </div>

                        {/* Button to upload selfie file */}            
                        <div className="form-group">
                            <label htmlFor="fileUpload">A selfie of yourself:</label>
                            <input
                                type="file"
                                id="fileUpload1"
                                accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
                                onChange={handleSelfieFileChange}
                                style={{ display: 'none' }}
                            />

                            {/* Button to trigger file input */}
                            <button
                                type="button"
                                onClick={() => document.getElementById('fileUpload1').click()}
                            >
                                Upload Selfie
                            </button>

                            {/* Display the uploaded file name */}
                            {selectedSelfieFile && <p>File uploaded: {selectedSelfieFile.name}</p>}
                        </div>
                
                        <div className="btn-wrapper">
                            <button className="manulife-btn btn-white">Back</button>
                            <button className="manulife-btn btn-orange" onClick={() => setStep(2)}>Continue</button>
                        </div>   
                </div>     
                ) : (
                    <div>
                        <div className="section-header">Your ID looks good!</div>
                        <p>Please check the details of your ID we captured</p>

                        <div className="verification-details">
                        {/* Display the captured details from step 1 */}
                        <p>ID Type: {capturedDetails.IDType}</p>
                        <p>ID Number: 123456</p>
                        <p>Expiry Date: 2030/05/21</p>
                        </div>

                        <div className="verification-checkbox">
                            <label>
                            <input type="checkbox" id="detailsVerified" name="detailsVerified" />
                            Details have been captured correctly
                            </label>
                        </div>
                        <div className="btn-wrapper">
                            <button className="manulife-btn btn-white" onClick={handleBackButtonClick}>Back</button>
                            <button className="manulife-btn btn-orange" onClick={() => setStep(2)}>Continue</button>
                        </div>   
                    </div> 
                )}      
            </form>              
        </div>
    )
}

export default PhotoidVerification