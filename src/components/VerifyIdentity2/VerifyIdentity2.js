import React, { useState, useEffect } from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import QRCode from "qrcode.react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Button from '@mui/material/Button';

import './VerifyIdentity2.css';

function VerifyIdentity2({ formData, updateFormData, setHoldFormData }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
        url: `https://main.d3jrvl3sduvqep.amplifyapp.com/confirm-identity?formData=${formDataQueryString}`,
        formData: formData,
        
    };
    return JSON.stringify(dataToEncode);
};
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  // const handleContinueClick = () => {
  //   // Check if the checkbox is checked before proceeding
  //   if (isCheckboxChecked) {
  //     // Continue with your logic
  //     console.log('Continue button clicked');
  //   } else {
  //     // Optionally, you can show a message or perform some other action
  //     console.log('Checkbox not checked. Please check before continuing.');
  //   }
  // };

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

        <div style={{display:"flex"}}>
          <QrCodeScannerIcon
          src="path/to/your/qr-code-icon.png"
          alt="QR Code Icon"
          onClick={handleOpenDialog} // Open the dialog on icon click
          style={{marginRight:"10px"}}
          />
          <p className="qrcodetext">Want to continue filling the application on your phone ? click the QR code icon</p>
      </div>

        {/* Dialog for displaying QR code */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogContent>
            <QRCode value={generateQRCodeData()} renderAs="svg" size={256} />
            <DialogContentText>
                Click the button below to close this pop-up.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default VerifyIdentity2;
