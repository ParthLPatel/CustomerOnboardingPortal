import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import "./ReviewInfo.css";
import FormHelperText from '@mui/material/FormHelperText';
import ProgressBar from "../ProgressBar/ProgressBar.js";
import InputLabel from '@mui/material/InputLabel';
const ReviewInfo = ({ formData, financialInfoData }) => {


    const { firstName, lastName, birthDate, homeAddress, emailAddress, phoneNumber } = formData;
    const { annualIncome, otherHouseholdIncome, employmentStatus, employerName, employerIndustry, institutionName, graduationDate } = financialInfoData;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control
    } = useForm()

    const onSubmit=data=>{
        console.log(data);
    }

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    return (
        <div>
            <div className="container">
                <div className="progressBarContainer1">
                        {/* <p className="progressBarLabel1">Step 6 - Review and submit</p> */}
                        <ProgressBar progress={6} /> {/* Pass the progress for this page */}
                    </div>
                <div className="row subContainer">
                    
                    <p className="header_label">Please review your information and the terms and conditions</p>
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
                            <div>{`${homeAddress}`}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="info-label">Email</div>
                            <div>{`${emailAddress}`}</div>
                        </div>
                    </div>
                    <div className="row  ">
                        <div className="col-md-6">
                            <div className="info-label">Phone Number</div>
                            <div>{`${phoneNumber}`}</div>
                        </div>
                    </div>

                    {
                        (employmentStatus === "Full Time Employment") ?
                            (<div className="row  ">
                                <div className="col-md-6 col-xl-3">
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
                                </div>
                            </div>) :
                            (<div className="row  ">
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
                            </div>)
                    }

                    <div className="please-review px-md-2">
                        Please review the following:
                    </div>
                    <div className="terms px-md-2 mb-3">
                        <a href="" className="termsLink1">Account Agreement</a>

                    </div>
                    <div className="terms px-md-2 mb-3">
                        <a href="" className="termsLink2">Terms & Conditions & Privacy</a>

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
                            <label htmlFor='detailsVerified' className='checkboxLabel'>I have read and agree to the Account Agreement and Terms and Conditions</label>
                        </div>

                        <div className="btn-wrapper">
                            {isCheckboxChecked ? (
                                <Link to="##" className="manulife-btn btn-orange text-decoration-none ">
                                    Submit
                                </Link>
                            ) : (
                                <span className="manulife-btn btn-orange btn-orange-lighter">Submit</span>
                            )}
                            <Link to="/cross-sell" className="manulife-btn btn-white text-decoration-none" >
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