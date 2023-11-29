import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import "./ReviewInfo.css";
import ProgressBar from "../ProgressBar/ProgressBar.js";

import CreateProfileDialog from "../CreateProfile/CreateProfileDialog.js"
import FinancialInformationDialog from "../FinancialInformation/FinancialInformationDialog.js";
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
const ReviewInfo = ({ formData, financialInfoData, updateFormData, updateFinancialInfoData }) => {

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
    const otherHouseholdIncome = financialInfoData?.otherHouseholdIncome || '';
    const employmentStatus = financialInfoData?.employmentStatus || '';
    const employerName = financialInfoData?.employerName || '';
    const employerIndustry = financialInfoData?.employerIndustry || '';
    const institutionName = financialInfoData?.institutionName || '';
    const graduationDate = financialInfoData?.graduationDate || '';

    console.log(otherHouseholdIncome);
    
    const [useEmailAsUsername, setUseEmailAsUsername] = useState(true);
    const handleuChangeUseEmailAsUsernameCheckBoxChange = (e)=>{
        setUseEmailAsUsername(e.target.checked);
        if(!e.target.checked){
            setValue("username","");
        }
    }
    const handleInputChange = (e, fieldName) => {
        clearErrors();
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

    const handleEditFinancialInfoDialogClose = () => {
        setOpenFinancialInfoDialog(false);
    };


    const onSubmit = data => {
        
        console.log(data);
        if(data.password !== data.confirmPassword){
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


    return (
        <div>
            <div className="container">
                <div className="progressBarContainer1">
                    {/* <p className="progressBarLabel1">Step 6 - Review and submit</p> */}
                    <ProgressBar progress={5} /> {/* Pass the progress for this page */}
                </div>
                <div className="row subContainer" style={{width:'85%'}}>
                    <p className="header_label" style={{ textAlign: "left" }}>Please review your information and the terms and conditions</p>
                    <div className="row ">
                        <div className="col-12 edit-area">
                            <span className="mr-3" style={{fontWeight:'600', marginTop:'0.2em', borderBottom:'2px solid lightgray'}}>Your Contact Information</span>
                            <span onClick={handleEditContactInfoDialogOpen}><EditIcon />(Edit)</span>
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
                                <div>{`${phoneNumber}`}</div>
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-12 edit-area">
                            <span className="mr-3" style={{fontWeight:'600', marginTop:'0.2em', borderBottom:'2px solid lightgray'}}>Your Employment Information</span>
                            <span onClick={handleEditFinancialInfoDialogOpen}><EditIcon />(Edit)</span>
                            <FinancialInformationDialog open={openFinancialInfoDialog}
                                onClose={handleEditFinancialInfoDialogClose} formData={financialInfoData} updateFormData={updateFinancialInfoData} />
                        </div>
                    </div>
                    {
                        (employmentStatus === "Full-time employee") ?
                            (<div className="area">
                                <div className="row">                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Annual Income</div>
                                    <div>{`${annualIncome}`}</div>
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
                                    <div>{`${annualIncome}`}</div>
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
                                        <div>{`${annualIncome}`}</div>
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
                    <div className="terms px-md-2 mb-3">
                        <p className="termsLink1">Account Agreement</p>

                    </div>
                    <div className="terms px-md-2 mb-3">
                        <p className="termsLink2">Terms & Conditions & Privacy</p>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="verification-checkbox mb-4 mt-3">
                            <input
                                type="checkbox"
                                id="detailsVerified"
                                name="detailsVerified"
                                checked={isCheckboxChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor='detailsVerified' className='' style={{ marginLeft: "0.5em" }}>I have read and agree to the Account Agreement and Terms and Conditions</label>
                        </div>

                        <div>
                            <div className="review-page-header">Credit Card PIN</div>
                            <div className="row grpContainer my-4 px-0">
                                <div className="col">
                                    <TextField
                                        color="success"
                                        placeholder="PIN"
                                        {...register("creditCardPIN", { required: true })}
                                        value={formData.creditCardPIN}
                                        onChange={(e) => handleInputChange(e, "creditCardPIN")}
                                        label="Credit card PIN"
                                        variant="outlined"
                                        className="form-control"

                                    />
                                    <FormHelperText sx={{ color: "#09874E" }}>*This PIN will be your credit card PIN</FormHelperText>

                                    <FormHelperText sx={{ color: "crimson" }}>{errors.creditCardPIN && "This field is required"}</FormHelperText>
                                </div>
                                <div className="col">

                                    <TextField
                                        color="success"
                                        placeholder="Confirm PIN"
                                        {...register("confirmCreditCardPIN", { required: true })}
                                        label="Confirm credit card PIN"
                                        variant="outlined"
                                        className="form-control"

                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.creditCardPIN && "This field is required"}</FormHelperText>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="review-page-header">Online Banking Information</div>
                            <div className="row grpContainer my-4 px-0">
                                <div className="col-12 col-md-8">
                                    <TextField
                                        color="success"

                                        {...register("username", { required: true })}
                                        value={useEmailAsUsername?formData.emailAddress:formData.username}
                                        disabled={useEmailAsUsername}
                                        onChange={(e) => handleInputChange(e, "username")}
                                        label="Username"
                                        variant="outlined"
                                        className="form-control"

                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.username && "This field is required"}</FormHelperText>
                                </div>
                                <div className="col-12 col-md-4">
                                <FormGroup>
                                <FormControlLabel control={<Checkbox color="success" />} checked={useEmailAsUsername} label="Use email address "
                                    onChange={e => handleuChangeUseEmailAsUsernameCheckBoxChange(e)}
                                />
                                </FormGroup>
                                </div>
                            </div>
                            <div className="row grpContainer my-4 px-0">
                                <div className="col">
                                    <TextField
                                        color="success"
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange(e, "password")}
                                        label="Password"
                                        variant="outlined"
                                        className="form-control"

                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.creditCardPIN && "This field is required"}</FormHelperText>
                                </div>
                                <div className="col password-field">

                                    <TextField
                                        color="success"
                                        placeholder="Confirm password"
                                        {...register("confirmPassword", { required: true })}
                                        label="Confirm password"
                                        variant="outlined"
                                        className="form-control"

                                    />
                                    <FormHelperText sx={{ color: "crimson" }}>{errors.passwordMismatch && "Does not match with the password"}</FormHelperText>
                                </div>
                            </div>
                        </div>

                        <div className="btn-wrapper">
                            {isCheckboxChecked ? (
                                                            <Link to="/cross-sell" className="manulife-btn btn-orange text-decoration-none" >
                                                            Submit application
                                                        </Link>
                                // <button type="submit" className="manulife-btn btn-orange text-decoration-none ">
                                //     Submit application
                                // </button>
                            ) : (
                                <button className="manulife-btn btn-orange btn-orange-lighter" disabled>Submit application</button>
                            )}
                            <Link to="/financial-info" className="manulife-btn btn-white text-decoration-none" >
                                Back
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )

}

export default ReviewInfo;