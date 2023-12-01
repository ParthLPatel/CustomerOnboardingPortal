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
import ScrollToTop from "../ParentContainer/ScrollToTop";

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
        formData: formData
    };
    console.log(dataToEncode.url);
    return JSON.stringify(dataToEncode);
};
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <div className='container'>
      <div className="progressBarContainer1">
          // <ProgressBar progress={3} />
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
            <p className='eachLabelValue'>D2789 - 61678  - 98709</p>
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

        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleOpenDialog}>
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
      </div>
    </div>
  );
}

export default VerifyIdentity2;
