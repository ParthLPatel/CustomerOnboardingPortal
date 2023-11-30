import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './CongratulationsPage.css';
import {useState, useEffect} from "react";
import VerticalStepper from '../VerticalStepper/VerticalStepper';
import cardFront from '../../assets/Visa_Infinite_EN.png'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import QRCode from "qrcode.react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
// import FlipCard from '../CommonComponents/FlipCard/FlipCard'

function CongratulationsPage({ formData, setHoldFormData, setHoldCreditCrossSellData, setHoldFinancialInfoData, financialInfoData, creditCardCrossSell }) {
  
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {

    // searching for params in link if any and passing that data to the parent
    const queryParams = new URLSearchParams(window.location.search);
    const formDataParam = queryParams.get('formData');
    const financialDataParam = queryParams.get('financial');
    const crossSellDataParam = queryParams.get('crosssell');

    if (formDataParam && financialDataParam && crossSellDataParam) {
        const formDataFromQR = JSON.parse(formDataParam);
        const financialDataFromQR = JSON.parse(financialDataParam);
        const crossSellDataFromQR = JSON.parse(crossSellDataParam);

        setHoldFormData(formDataFromQR);
        setHoldFinancialInfoData(financialDataFromQR);
        setHoldCreditCrossSellData(crossSellDataFromQR);
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
    const financialDataQueryString = encodeURIComponent(JSON.stringify(financialInfoData));
    const crossSellDataQueryString = encodeURIComponent(JSON.stringify(creditCardCrossSell));
    const dataToEncode = {
        url: `https://main.d3jrvl3sduvqep.amplifyapp.com/congratulations-page?formData=${formDataQueryString}&financial=${financialDataQueryString}&crosssell=${crossSellDataQueryString}`,
        formData: formData,
        financialInfoData: financialInfoData,
        creditCardCrossSell: creditCardCrossSell

        
    };
    console.log(JSON.stringify(dataToEncode));
    console.log(formDataQueryString)

    return JSON.stringify(dataToEncode);
};
  
  
  return (
    <div className="container" >
      <div className="progressBarContainer1">
          {/* <p className="progressBarLabel1">Step 6 - Review and submit</p> */}
          <ProgressBar progress={6} /> {/* Pass the progress for this page */}
      </div>
      
      <div style={{display:"flex", marginTop: '200px'}}>
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
      

      <div className='subContainer widthSubContainer'>
      <div className='cardMainContainer'> 
          {/* Vertical application tracker */}
          <div className='cardTracker my-0'>
            <p className='header_label py-1' style={{textAlign:'left', display: 'inline-block'}}>Tracking Details</p>
            <VerticalStepper />
          </div>

        <div className='row exceptTrackerContainer'>
          
          <div>
          {/* card header */}
          <div className='card-header'>
              <p style={{fontSize: '24px', textAlign:'left', fontWeight:'600', letterSpacing:'0.3px'}}>Welcome to Manulife Bank</p>
              <p className='stepLabel' style={{fontSize:'16px', fontWeight:'500', letterSpacing:'0.2px', textAlign:'left', paddingTop:"0em", paddingBottom:'0em'}}>
                <span>Congratulations! </span> 
                Your credit card has been approved.</p>
                <p>Your application tracking ID - <b>A001254367</b></p>
              
          </div>

          <div className='cardContainer'>

            {/* card section */}
            <div className='cardPhoto'>
                <img src={cardFront} alt='card-front' className='frontImg'/>
                {/* <FlipCard style={{height:'300px', width:'300px'}}/> */}
            </div>
            
            {/* card-featiures section */}
            <div className='cardDesc'>
              <p className='stepLabel' style={{fontSize:'18px'}}>Manulife Visa Infinite Credit Card</p>
              <ul className='stepLabel px-3' style={{letterSpacing:'0.4px', fontWeight:500}}>
                <li>Earn 2 points per $1 spent on gas, groceries and utilities</li>
                <li>1 point per dollar on all other purchases</li>
                <li>0% into APR for 6 months on Balance Transfers and Purchases.</li>
                <li>No Annual Fee</li>
                <li>Earn 2500 bonus points with first purchase or balance transfers</li>
              </ul>
            </div>
          </div>

          </div>
          <div className='signInBtnContainer'>
                <button className="manulife-btn btn-orange signInBtn">Sign in</button>
            </div>
</div>
            
          </div>
       
      </div>
    </div>
  );
}

export default CongratulationsPage;
