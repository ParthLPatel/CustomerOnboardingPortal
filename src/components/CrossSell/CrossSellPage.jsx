import React, { useState, useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import ProgressBar from "../ProgressBar/ProgressBar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import QRCode from "qrcode.react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import "./CrossSellPage.css";


const CrossSellPage = ({ creditCardCrossSell, formData, financialInfoData, setHoldFormData, setHoldFinancialInfoData, setHoldCreditCrossSellData, updateCreditCardCrossSell }) => {
    const {
        register,
        handleSubmit,
        formState,
        setValue
    } = useForm();

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [newChecking, setNewChecking] = useState(false);
    const [newSaving, setNewSaving] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const generateQRCodeData = () => {
  
      const formDataQueryString = encodeURIComponent(JSON.stringify(formData));
      const financialDataQueryString = encodeURIComponent(JSON.stringify(financialInfoData));
      const dataToEncode = {
          url: `https://main.d3jrvl3sduvqep.amplifyapp.com/cross-sell?formData=${formDataQueryString}&financial=${financialDataQueryString}`,
          formData: formData,
          financialInfoData: financialInfoData
      };
      console.log(JSON.stringify(dataToEncode));
      console.log(dataToEncode.url);
      return JSON.stringify(dataToEncode);
  };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const formDataParam = queryParams.get('formData');
        const financialDataParam = queryParams.get('financial');
      
  
        if (formDataParam && financialDataParam) {
            const formDataFromQR = JSON.parse(formDataParam);
            const financialDataFromQR = JSON.parse(financialDataParam);
            setHoldFormData(formDataFromQR);
            setHoldFinancialInfoData(financialDataFromQR);
            
        }

        if (creditCardCrossSell?.accountIntent) {
            setSelectedOptions([...creditCardCrossSell?.accountIntent]);
        }

        setNewChecking(creditCardCrossSell?.newChecking);
        setNewSaving(creditCardCrossSell?.newSaving);
        setValue("SIN",creditCardCrossSell?.SIN || "")
    }, [creditCardCrossSell?.SIN, creditCardCrossSell?.accountIntent, creditCardCrossSell?.newChecking, creditCardCrossSell?.newSaving, setValue]);

    const changeNewChanging = () => {
        setNewChecking(!newChecking);
    }

    const changeNewSaving = () => {
        setNewSaving(!newSaving);
    }

    const checkboxOptions = [
        { value: 'PersonalSavings', label: 'Personal Savings' },
        { value: 'DepositsLivingExpenses', label: 'Deposits / Living Expenses' },
        { value: 'Investment', label: 'Investment' },
    ];

    const navigate  = useNavigate();
    const handleCheckboxChange = (option) => {
        const optionIndex = selectedOptions.indexOf(option);
        if (optionIndex !== -1) {
            // Option is already selected, remove it
            const updatedOptions = [...selectedOptions];
            updatedOptions.splice(optionIndex, 1);
            setSelectedOptions(updatedOptions);
        } else {
            // Option is not selected, add it
            setSelectedOptions([...selectedOptions, option]);
        }
        // updateCreditCardCrossSell({ ...creditCardCrossSell, accountIntent: [...selectedOptions] })
    }

    const onSubmit = (data) => {

        updateCreditCardCrossSell({ newChecking, newSaving, SIN:data.SIN, accountIntent: [...selectedOptions], })
        navigate("/congratulations-page");
    };

    return (
        <div>
            <div className="container">
                <div className="progressBarContainer1">
                    <ProgressBar progress={6} /> {/* Pass the progress for this page */}
                </div>

                <div className="subContainer">
                    <p className="header_label" style={{textAlign:"left"}}>Congratulations! Your credit card has been approved!</p>
                    <div>
                        <p className="other-options">Did you know there are other options to help you?</p>
                        <p className="do-not-miss">Right now, you can add them to your application bundle. If you want these products later, you have to re-apply</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="new-account">
                            <FormControlLabel
                                control={
                                    <Checkbox name="newChecking" color="success" onChange={changeNewChanging} checked={newChecking}/>
                                }
                                label={<span style={{fontWeight: "600", fontSize:"16px", lineHeight:"21.79px"}}>Chequing Account</span>}
                            />
                            <div>Description of the chequing account</div>

                        </div>
                        <div className="new-account">
                            <FormControlLabel
                                control={
                                    <Checkbox name="newSaving" color="success" onChange={changeNewSaving} checked={newSaving}/>
                                }
                                label={<span style={{fontWeight: "600", fontSize:"16px", lineHeight:"21.79px"}}>Savings Account</span>}
                            />
                            <div>Description of the savings account</div>
                        </div>

                        {
                            (newSaving || newChecking) ?
                                (<><div className="header_label" style={{ "textAlign": "left", "marginBottom": "20px" }}>
                                    Let’s set up your account.
                                </div>
                                    <div className="cross-sell-more-input">
                                        We just need a bit more input from you.
                                    </div>
                                    <div className="input-div">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="SIN" color="success">Social insurance number</InputLabel>
                                            <OutlinedInput
                                                color="success"
                                                id="SIN"
                                                label="Social insurance number"
                                                {...register("SIN", { required: true })}
                                            />
                                            <FormHelperText >You SIN is required for tax reporting purposes. </FormHelperText>
                                            <FormHelperText sx={{ color: "crimson" }}> {(formState.errors.SIN) && "This field is required"}</FormHelperText>
                                        </FormControl>

                                    </div>
                                    <div className="intend-to-use">
                                        How do you intend to use this account?
                                    </div>
                                    <div className="cross-sell-option-wrapper">
                                        <FormGroup>
                                            {

                                                checkboxOptions.map((checkbox) => (
                                                    <FormControlLabel key={checkbox.value}
                                                        control={
                                                            <Checkbox name={checkbox.value} color="success" sx={{ "display": "block" }} />
                                                        }
                                                        label={checkbox.label}
                                                        checked={selectedOptions.indexOf(checkbox.value) !== -1}
                                                        onChange={() => handleCheckboxChange(checkbox.value)}
                                                    />
                                                ))

                                            }
                                        </FormGroup>
                                    </div></>) : (<div></div>)
                        }



                        <div className="btn-wrapper">
                        <button type="submit" className="manulife-btn btn-orange text-decoration-none" style={{fontWeight:'700', fontSize:'18px'}}>
                                    Continue</button>
                            <Link to="/review-info" className="manulife-btn btn-white text-decoration-none" style={{fontWeight:'700', fontSize:'18px'}}>
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
        </div>)
}
export default CrossSellPage;