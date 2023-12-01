import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';

import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';

import './VerifyIdentity.css'
import documetLogo from '../../assets/documentLogo.png'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import btnLogoleft from "../../assets/btnLogo01.png"
import btnLogoright from "../../assets/btnLogo02.png"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import QRCode from "qrcode.react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';


function VerifyIdentity({ formData, updateFormData, setHoldFormData }) {

  const {
    handleSubmit, // Add the missing import
  } = useForm();

  const IDtypeoptions = [
    "Driver's License",
    "Passport",
    "Health Card"
  ];

  const [verificationOption, setVerificationOption] = useState('online'); // Add the missing state
  const [IDtype, setIDType] = useState(''); // Add the missing state
  const [openDialog, setOpenDialog] = useState(false);


//         IDtype: "",
//         selectedIDFile: "",
//         selectedSelfieFile: "",
//         verificationOption: "",


  // const handleInputChange = (e, fieldName) => {
  //     updateFormData({ ...formData, [fieldName]: e.target.value });
  // };

  useEffect(() => {

    // searching for params in link if any and passing that data to the parent
    const queryParams = new URLSearchParams(window.location.search);
    const formDataParam = queryParams.get('formData');
    if (formDataParam) {
        const formDataFromQR = JSON.parse(formDataParam);
        setHoldFormData(formDataFromQR);
    }
  }, []);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

const generateQRCodeData = () => {

    const formDataQueryString = encodeURIComponent(JSON.stringify(formData));
    const dataToEncode = {
        url: `https://main.d3jrvl3sduvqep.amplifyapp.com/verify-identity?formData=${formDataQueryString}`,
        formData: formData,
        
    };
    return JSON.stringify(dataToEncode);
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
        <div className="progressBarContainer1">
              {/* <p className="progressBarLabel1">Step 3.1 - Verify your identity</p> */}
              <ProgressBar progress={3} /> {/* Pass the progress for this page */}
          </div>
          
        <div className='subContainer'>
          
          <div className="headerContainer">
              <img src={documetLogo} alt="Your SVG" className="docLogo"/>
              <p className="header_label">We need to verify your photo ID</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
        
          <div className="verification-options">
            <Button
              style={{
                borderTopLeftRadius: "100px",
                borderBottomLeftRadius: "100px",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.1px",
                textTransform: "none",
                color: "black",
                fontWeight: "600",
                padding:'10px 12px',
                backgroundColor: verificationOption === 'online' ? '#BBDBC5' : 'white',
                borderColor: verificationOption === 'online' ? '#09874E' : 'gray',

              }}
              startIcon={<img src={btnLogoleft} className='btnLogosStyle' alt='btnLogoLeft'/>}
              variant="outlined"
              onClick={() => handleVerificationOptionClick('online')}
            >
              Online
            </Button>

            <Button
              style={{
                borderTopRightRadius: "100px",
                borderBottomRightRadius: "100px",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.1px",
                textTransform: "none",
                color: "black",
                fontWeight: "600",
                padding:'10px 12px',
                backgroundColor: verificationOption === 'inPerson' ? '#BBDBC5' : 'white',
                borderColor: verificationOption === 'inPerson' ? '#09874E' : 'gray',
              }}
              startIcon={<img src={btnLogoright} className='btnLogosStyle' alt='btnLogoRight'/>}
              variant="outlined"
              onClick={() => handleVerificationOptionClick('inPerson')}
            >
              In Person
            </Button>
          </div>


            
            <div className='stepContainer'>
              <div className='btnStep'>1</div>
              <label htmlFor="dropdown" className='dropdown'>A photo of your ID</label>
            </div>
            <Select
              id="dropdown"
              value={IDtype}
              onChange={handleIDtype}
              displayEmpty
              inputProps={{ 'aria-label': 'Select ID type' }}
              style={{minWidth: "50%", fontSize: "16px", color: "#09874E", fontWeight: "400", lineHeight: "24px",
              letterSpacing: "0.5px",}}
              color="success"
            >
              <MenuItem value="" disabled>
                Select ID type
              </MenuItem>
              {IDtypeoptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            {/* Button to upload ID photo */}            
            <div className="form-group my-4">
            <input
              type="file"
              id="fileUpload"
              accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
              onChange={handleIDFileChange}
              hidden
            />
            {/* Display the uploaded file name */}
            {formData.selectedIDFile && <p className='dropdown m-2'>File uploaded: {formData.selectedIDFile.name}</p>}
            <Button variant="outlined" component="label" htmlFor="fileUpload" style={
                      { backgroundColor: 'white', 
                        color: 'green',
                        fontWeight: 500,
                        fontSize: "14px",
                        border: "1px solid gray",
                        lineHeight: "20px",
                        letterSpacing: "0.2px",
                        borderRadius: "100px",
                        textTransform: 'none',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        paddingRight:'24px',
                        paddingLeft:'16px',
                        textAlign: "center" }}>
              +&nbsp;&nbsp;Upload ID photo
            </Button>
          </div>

                      
            {/* Button to upload selfie file */}
          <div className="form-group">
            <div className='stepContainer'>
              <div className='btnStep'>2</div>
              <label htmlFor="fileUpload1" className='dropdown'>A selfie of yourself</label>
            </div>
            <input
              type="file"
              id="fileUpload1"
              accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
              onChange={handleSelfieFileChange}
              hidden
            />
            {/* Display the uploaded file name */}
            {formData.selectedSelfieFile && <p className='dropdown m-2'>File uploaded: {formData.selectedSelfieFile.name}</p>}
            <Button variant="outlined" component="label" htmlFor="fileUpload1" style={
                      { backgroundColor: 'white', 
                      color: 'green',
                      fontWeight: 500,
                      fontSize: "14px",
                      border: "1px solid gray",
                      letterSpacing: "0.2px",
                      lineHeight: "20px",
                      borderRadius: "100px",
                      textTransform: 'none',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      paddingRight:'24px',
                      paddingLeft:'16px',
                      textAlign: "center" }}>
              +&nbsp;&nbsp;Upload selfie
            </Button>
          </div>
    
            <div className="btn-wrapper my-4">
                <Link to="/confirm-identity" className="manulife-btn btn-orange text-decoration-none"
                  style={{fontWeight:'700', fontSize:'18px'}}>
                    Continue
                </Link>
                <Link to="/verify-phone-number" className="manulife-btn btn-white text-decoration-none"
                  style={{fontWeight:'700', fontSize:'18px'}}>
                    Back
                </Link>
            </div>
            <div className="qrcodestyler" style={{alignItems: "center", cursor: "pointer" }} onClick={handleOpenDialog}>
                            <QrCodeScannerIcon
                                src="path/to/your/qr-code-icon.png"
                                alt="QR Code Icon"
                                style={{ marginRight: "10px" }}
                            />
                            <p className="qrcodetext" style={{ margin: 0, fontSize: "14px" }}>
                                Want to continue filling the application on your phone? <span style={{ textDecoration: "underline" }}>Click here</span>.
                            </p>
                        </div>

                        {/* Dialog for displaying QR code */}
                        <Dialog open={openDialog} onClose={handleCloseDialog} style={{ borderRadius: "10px" }}>
                            <DialogTitle style={{ textAlign: "center" }}>Scan QR Code</DialogTitle>
                            <DialogContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <QRCode value={generateQRCodeData()} renderAs="svg" size={256} />
                                <DialogContentText style={{ textAlign: "center", marginTop: "10px" }}>
                                    Click the button below to close this pop-up.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions style={{ justifyContent: "center" }}>
                                <Button onClick={handleCloseDialog} variant="contained" color="primary" style={{ backgroundColor: "#ED6453", color: "#fff", marginBottom:"10px" }}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
          </form>   
        </div> 
    </div>
  )
}

export default VerifyIdentity