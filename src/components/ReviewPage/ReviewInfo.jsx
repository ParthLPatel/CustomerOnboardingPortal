import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import "./ReviewInfo.css";
import ProgressBar from "../ProgressBar/ProgressBar.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import QRCode from "qrcode.react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CreateProfileDialog from "../CreateProfile/CreateProfileDialog.js"
import FinancialInformationDialog from "../FinancialInformation/FinancialInformationDialog.js";
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { changePhoneNumberFormat } from "../../utils/Utils.js";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
// import ABC_logo from '../../assets/CGI_logo.svg.png'


const ReviewInfo = ({ formData, financialInfoData, updateFormData, updateFinancialInfoData, setHoldFormData, setHoldFinancialInfoData }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm()
    const navigate = useNavigate();

    const { firstName, lastName, birthDate, emailAddress, phoneNumber } = formData;
    //const { annualIncome, otherHouseholdIncome, employmentStatus, employerName, employerIndustry, institutionName, graduationDate } = financialInfoData;
    const annualIncome = financialInfoData?.annualIncome || '';
    // const otherHouseholdIncome = financialInfoData?.otherHouseholdIncome || '';
    const employmentStatus = financialInfoData?.employmentStatus || '';
    const employerName = financialInfoData?.employerName || '';
    const employerIndustry = financialInfoData?.employerIndustry || '';
    const institutionName = financialInfoData?.institutionName || '';
    const graduationDate = financialInfoData?.graduationDate || '';
    const [openDialog, setOpenDialog] = useState(false);

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

    }, [setHoldFinancialInfoData, setHoldFormData]);

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
            url: `https://main.d3jrvl3sduvqep.amplifyapp.com/review-info?formData=${formDataQueryString}&financial=${financialDataQueryString}`,
            formData: formData,
            financialInfoData: financialInfoData
        };
        console.log(JSON.stringify(dataToEncode));
        console.log(dataToEncode.url);
        return JSON.stringify(dataToEncode);
    };

    const [useEmailAsUsername, setUseEmailAsUsername] = useState(true);
    const handleuChangeUseEmailAsUsernameCheckBoxChange = (e) => {
        setUseEmailAsUsername(e.target.checked);
        if (!e.target.checked) {
            setValue("username", "");
        }
    }
    const handleInputChange = (e, fieldName) => {
        clearErrors(fieldName);
        if(fieldName==="confirmCreditCardPIN"){
            console.log("chang");
            clearErrors("PINMisMatch");
        }
        if(fieldName==="confirmPassword"){
            clearErrors("passwordMismatch");
        }
        updateFormData({ ...formData, [fieldName]: e.target.value });
    };

    const [openContactInfoDialog, setOpenContactInfoDialog] = useState(false);

    const handleEditContactInfoDialogOpen = () => {
        setOpenContactInfoDialog(true);
    };

    const handleEditContactInfoDialogClose = () => {
        setOpenContactInfoDialog(false);
    };

    const [openFinancialInfoDialog, setOpenFinancialInfoDialog] = useState(false);

    const handleEditFinancialInfoDialogOpen = () => {
        setOpenFinancialInfoDialog(true);
    };

    const [pinVisiable, setPinVisiable] = useState(false);

    const handlePinVisibleChange = (v) => {
        setPinVisiable(v);
    }

    const [passwordVisiable, setPasswordVisiable] = useState(false);

    const handlePasswordVisibleChange = (v) => {
        setPasswordVisiable(v);
    }

    const handleEditFinancialInfoDialogClose = () => {
        setOpenFinancialInfoDialog(false);
    };


    const onSubmit = data => {

        if (data.creditCardPIN !== data.confirmCreditCardPIN) {
            
            setError("PINMisMatch", {
                type: "manual",
                message: "PIN doesn't match",
            });
            return;
        }
        if (data.password !== data.confirmPassword) {
            setError("passwordMismatch", {
                type: "manual",
                message: "Password doesn't match",
            });
            return;
        }

        navigate("/cross-sell");
    }

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const getAddress = () => {
        if (formData.needsManualAddress) {
            return `${formData.manualAddressLine}, ${formData.manualCity}, ${formData.manualProvince}, ${formData.manualPostalCode} `
        } else {
            return formData.homeAddress;
        }
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
    setOpen(false);
    };

    const termsdata = [
        { id: 1, 
          name: 'Annual Interest Rates', 
          description: "These interest rates are in effect the day your account is opened (whether or not your card is activated). Purchases, fees, and other charges: 20.99% Cash Advances and Balance Transfers: 22.99% If you do not make your minimum payment by the payment due date 2 or more times in any 12-month period, your annual interest rates will increase to standard rates of 25.99% on Purchases, fees, and other charges and 27.99% for Cash Advances and Balance Transfers, including those done under any previous rate. This increase will take effect in the third statement period following the missed payment that caused the rate to increase. The increased rates will remain in effect until you make your minimum payments by the due date for 12 consecutive months"
        },
        { id: 2, 
          name: 'Interest-free Grace Period',
          description: 'You will benefit from an interest-free grace period of at least 21 days if you pay off your balance in full by the due date. No interest is charged on Purchases and fees appearing on your statement for the 1sttime if you pay your new balance in full by the payment due date. There is no interest-free period on Cash Advances and Balance Transfers' 
        },
        { id: 3, 
          name: 'Minimum Payment', 
          description: 'Your Minimum Payment will be $10 plus any interest and fees (not including the annual fee), plus any amount by which the new balance exceeds your credit limit, and any amount past due from the prior month. For Quebec residents only, after August 1, 2019 (for accounts opened prior to June 10, 2019).Your Minimum Payment will also include any amount by which the new balance exceeds your credit limit, and any amount past due from the prior month. For Quebec residents only, after August 1, 2019 (for accounts opened after June 10, 2019). Your Minimum Payment will be the greater of: a) 5% of the new balance shown on your statement; or b) $10. Your Minimum Payment also includes any amount by which the new balance exceeds your credit limit, and any amount past due from the prior month. For all clients and in all cases, if the new balance is less than $10, the balance is dueinfull.' 
        },
      ];



    return (
        <div>
            <div className="container">
                <div className="progressBarContainer1">
                    {/* <p className="progressBarLabel1">Step 6 - Review and submit</p> */}
                    <ProgressBar progress={5} /> {/* Pass the progress for this page */}
                </div>
                <div className="row subContainer reviewInfoSubContainer">
                    <p className="header_label" style={{ textAlign: "left", marginBottom: '2em' }}>Please review your information and the terms and conditions</p>
                    <div className="row ">
                        <div className="col-12 edit-area">
                            <span className="mr-3" style={{ fontWeight: '600', marginTop: '0.2em', fontSize: '1.2rem' }}>Contact Information</span>
                            <span onClick={handleEditContactInfoDialogOpen} className="editContainer"><EditIcon style={{ marginRight: '0.2em' }} />(Edit)</span>
                            <CreateProfileDialog open={openContactInfoDialog}
                                onClose={handleEditContactInfoDialogClose} formData={formData} updateFormData={updateFormData} />
                        </div>
                    </div>
                    <div className="area">
                        <div className="row ">
                            <div className="col-md-6">
                                <div className="info-label">Full Name</div>
                                <div>{`${firstName} ${lastName}`}</div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-label">Date of Birth</div>
                                <div>{`${birthDate}`}</div>
                            </div>
                        </div>
                        <div className="row  ">
                            <div className="col-md-6">
                                <div className="info-label">Address</div>
                                <div>{`${getAddress()}`}</div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-label">Email</div>
                                <div>{`${emailAddress}`}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="info-label">Phone Number</div>
                                <div>{changePhoneNumberFormat(phoneNumber)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-12 edit-area">
                            <span className="mr-3" style={{ fontWeight: '600', marginTop: '0.2em', fontSize: '1.2rem' }}>Employment Information</span>
                            <span onClick={handleEditFinancialInfoDialogOpen} className="editContainer"><EditIcon style={{ marginRight: '0.2em' }} />(Edit)</span>
                            <FinancialInformationDialog open={openFinancialInfoDialog}
                                onClose={handleEditFinancialInfoDialogClose} formData={financialInfoData} updateFormData={updateFinancialInfoData} />
                        </div>
                    </div>
                    {
                        (employmentStatus === "Full-time employee") ?
                            (<div className="area">
                                <div className="row">                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Annual Income</div>
                                    <div>{`${annualIncome.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'CAD'
                                    })}`}</div>
                                </div>
                                    <div className="col-md-6 col-xl-3">
                                        <div className="info-label">Employment Status</div>
                                        <div>{`${employmentStatus}`}</div>
                                    </div>
                                    <div className="col-md-6 col-xl-3">
                                        <div className="info-label">Employer Name</div>
                                        <div>{`${employerName}`}</div>
                                    </div>
                                    <div className="col-md-6 col-xl-3">
                                        <div className="info-label">Employer Industry</div>
                                        <div>{`${employerIndustry}`}</div>
                                    </div></div>

                            </div>) :
                            (employmentStatus === "Student" ? (<div className="row area ">
                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Annual Income</div>
                                    <div>{`${annualIncome.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'CAD'
                                    })}`}</div>
                                </div>
                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Employment Status</div>
                                    <div>{`${employmentStatus}`}</div>
                                </div>
                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Institution Name</div>
                                    <div>{`${institutionName}`}</div>
                                </div>
                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Graduation Date</div>
                                    <div>{`${graduationDate}`}</div>
                                </div>
                            </div>) : (<div className="area ">
                                <div className="row ">

                                    <div className="col-md-6 col-xl-3">
                                        <div className="info-label">Annual Income</div>
                                        <div>{`${annualIncome.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })}`}</div>
                                    </div>
                                    <div className="col-md-6 col-xl-3">
                                        <div className="info-label">Employment Status</div>
                                        <div>{`${employmentStatus}`}</div>
                                    </div>
                                </div></div>))
                    }

                    <div className="please-review px-md-2">
                        Please review the following:
                    </div>
 {/* terms and conditions */}
 <div className="terms px-md-2 mb-3">
                        <p className="termsLink1" onClick={handleOpen} style={{cursor: 'pointer'}}>Terms and conditions</p>
                    </div>

                    {/* Dialog Content */}
                    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
                        <DialogTitle style={{textAlign:'center'}}>
                            <u>Terms and Conditions</u>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <TableContainer component={Paper} >
                                <Table> 
                                    <TableHead style={{display:'flex', justifyContent:'space-between', textAlign:'left', margin:'1em 0'}}>
                                    <TableRow>
                                        <div className='col-3' style={{display:'flex', justifyContent:'space-between'}}>
                                            {/* <img src={ABC_logo} alt="Your SVG" className="ABCLogo" style={{marginRight:'1em'}}/> */}
                                            <p><b>ABC</b> Bank</p>
                                        </div>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {termsdata.map((row) => (
                                        <TableRow key={row.id}>
                                        <TableCell style={{width: '30%', border: '2px solid black'}}>{row.name}</TableCell>
                                        <TableCell style={{width: '70%', border: '2px solid black'}}>{row.description}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                    </Dialog>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox color="success" />} label="I have read and agree to the Account Agreement and Terms and Conditions"
                                name="detailsVerified"
                                checked={isCheckboxChecked}
                                onChange={handleCheckboxChange}
                                style={{
                                    marginBottom: '3em',
                                }}
                            />
                        </FormGroup>

                        <div>
                            <div className="review-page-header">Create You Personalized Credit Card PIN</div>
                            <div className="row grpContainer my-4 px-0">
                                <div className="col-12 col-md-6">
                                    <TextField
                                        color="success"
                                        placeholder="Enter PIN"
                                        {...register("creditCardPIN", { required: true })}
                                        value={formData.creditCardPIN}
                                        onChange={(e) => handleInputChange(e, "creditCardPIN")}
                                        variant="outlined"
                                        className="form-control"
                                        type={pinVisiable ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">                                    {
                                                pinVisiable ? (<span className="visibility" onClick={e => handlePinVisibleChange(false)}><VisibilityOffIcon /></span>) : (<span className="visibility" onClick={e => handlePinVisibleChange(true)} > <VisibilityIcon /></span>)
                                            }</InputAdornment>,
                                        }}
                                    />
                                    <FormHelperText sx={{ color: "#09874E", marginBottom: '1.4em' }}>*This PIN will be your credit card PIN</FormHelperText>

                                    <FormHelperText sx={{ color: "crimson" }}>{errors.creditCardPIN && "This field is required"}</FormHelperText>
                                </div>
                                <div className="col-12 col-md-6">

                                    <TextField
                                        color="success"
                                        placeholder="Confirm PIN"
                                        {...register("confirmCreditCardPIN", { required: true })}
                                        onChange={(e) => handleInputChange(e, "confirmCreditCardPIN")}
                                        label="Confirm PIN"
                                        variant="outlined"
                                        className="form-control"
                                        type={pinVisiable ? "text" : "password"}

                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.confirmCreditCardPIN && "This field is required"}</FormHelperText>
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.PINMisMatch && "PIN doesn't match"}</FormHelperText>
                                </div>
                                {/* <div className="col-12 col-md-4 visibility">
                                    {
                                        pinVisiable ? (<span className="visibility" onClick={e => handlePinVisibleChange(false)}><VisibilityOffIcon /></span>) : (<span className="visibility" onClick={e => handlePinVisibleChange(true)} > <VisibilityIcon /></span>)
                                    }

                                </div> */}
                            </div>
                        </div>

                        <div>
                            <div className="review-page-header">Create Your Online Banking Profile</div>
                            <div className="row grpContainer my-4 px-0">
                                <div className="col-12 col-md-6">
                                    <TextField
                                        color="success"

                                        {...register("username")}
                                        value={useEmailAsUsername ? formData.emailAddress : formData.username}
                                        disabled={useEmailAsUsername}
                                        onChange={(e) => handleInputChange(e, "username")}
                                        label="Username"
                                        variant="outlined"
                                        className="form-control"

                                    />
                                    {/* <FormHelperText sx={{ color: "crimson" }}>{errors.username && "This field is required"}</FormHelperText> */}
                                </div>
                                <div className="col-12 col-md-6">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox color="success" />} checked={useEmailAsUsername} label="Use email address "
                                            onChange={e => handleuChangeUseEmailAsUsernameCheckBoxChange(e)}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row grpContainer my-4 px-0">
                                <div className="col-12 col-md-6">
                                    <TextField
                                        color="success"
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange(e, "password")}
                                        label="Password"
                                        variant="outlined"
                                        className="form-control"
                                        type={passwordVisiable ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">                                    {
                                                passwordVisiable ? (<span className="visibility" onClick={e => handlePasswordVisibleChange(false)}><VisibilityOffIcon /></span>) : (<span className="visibility" onClick={e => handlePasswordVisibleChange(true)} > <VisibilityIcon /></span>)
                                            }</InputAdornment>,
                                        }}
                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.password && "This field is required"}</FormHelperText>
                                </div>
                                <div className="col-12 col-md-6 password-field">

                                    <TextField
                                        color="success"
                                        placeholder="Confirm password"
                                        {...register("confirmPassword", { required: true })}
                                        label="Confirm password"
                                        variant="outlined"
                                        className="form-control"
                                        type={passwordVisiable ? "text" : "password"}
                                        onChange={(e) => handleInputChange(e, "confirmPassword")}
                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.confirmPassword && "This field is required"}</FormHelperText>
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.passwordMismatch && "Does not match with the password"}</FormHelperText>
                                </div>
                            </div>
                        </div>

                        <div className="btn-wrapper">
                            {isCheckboxChecked ? (
                                // <Link to="/cross-sell" className="ABC-btn btn-orange text-decoration-none"
                                //     style={{ fontWeight: '700', fontSize: '18px' }}>
                                //     Submit application
                                // </Link>
                                <button className="ABC-btn btn-orange text-decoration-none"
                                    style={{ fontWeight: '700', fontSize: '18px' }}>
                                    Submit application
                                </button>
                            ) : (
                                <button className="ABC-btn btn-orange btn-orange-lighter" disabled
                                    style={{ fontWeight: '700', fontSize: '18px' }}>Submit</button>
                            )}
                            <Link to="/financial-info" className="ABC-btn btn-white text-decoration-none"
                                style={{ fontWeight: '700', fontSize: '18px' }}>
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

            </div >
        </div >
    )

}

export default ReviewInfo;