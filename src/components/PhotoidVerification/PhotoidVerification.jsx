import React from "react";
import "./PhotoidVerification.css";
import {useState} from "react";
import {useForm} from "react-hook-form";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

function PhotoidVerification(){

    const {register, handleSubmit, errors} = useForm();
    const [IDtype, setIDtype] = useState('');
    const [selectedIDFile, setSelectedIDFile] = useState(null);
    const [selectedSelfieFile, setSelectedSelfieFile] = useState(null);
    const [verificationOption, setVerificationOption] = useState('');

    const IDtypeoptions = [
        "Driver's License",
        "Passport",
        "Health Card"
    ];

    const handleDropdownChange = (event) => {
        setIDtype(event.target.value);
        console.log(IDtype)
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

      const handleVerificationOptionClick = (option) => {
        setVerificationOption(option);
    };

    const onSubmit = (data) => {
        setIDtype(data);
    };

    return (
        <div className="main-area">
            <form onSubmit={handleSubmit(onSubmit)}>
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

            <div class="form-group">
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
            <div class="form-group">
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
            <div class="form-group">
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
                <button className="manulife-btn btn-orange">Continue</button>
            </div>

        </div>


            </form>
            
            

        </div>
    )
}

export default PhotoidVerification