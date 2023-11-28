import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import "./ReviewInfo.css";
import ProgressBar from "../ProgressBar/ProgressBar.js";
const ReviewInfo = ({ formData, financialInfoData }) => {


    const { firstName, lastName, birthDate, homeAddress, emailAddress, phoneNumber } = formData;
    //const { annualIncome, otherHouseholdIncome, employmentStatus, employerName, employerIndustry, institutionName, graduationDate } = financialInfoData;
    const annualIncome = financialInfoData?.annualIncome || '';
    const otherHouseholdIncome = financialInfoData?.otherHouseholdIncome || '';
    const employmentStatus = financialInfoData?.employmentStatus || '';
    const employerName = financialInfoData?.employerName || '';
    const employerIndustry = financialInfoData?.employerIndustry || '';
    const institutionName = financialInfoData?.institutionName || '';
    const graduationDate = financialInfoData?.graduationDate || '';


    const {
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = data => {
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
                    <ProgressBar progress={5} /> {/* Pass the progress for this page */}
                </div>
                <div className="row subContainer">

                    <p className="header_label" style={{textAlign:"left"}}>Please review your information and the terms and conditions</p>
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="info-label">Phone Number</div>
                            <div>{`${phoneNumber}`}</div>
                        </div>
                    </div>

                    {
                        (employmentStatus === "Full-time employee") ?
                            (<div className="row">
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
                            (employmentStatus === "Student" ? (<div className="row  ">
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
                            </div>) : (<div className="row  ">
                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Annual Income</div>
                                    <div>{`${annualIncome}`}</div>
                                </div>
                                <div className="col-md-6 col-xl-3">
                                    <div className="info-label">Employment Status</div>
                                    <div>{`${employmentStatus}`}</div>
                                </div></div>))
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
                            <label htmlFor='detailsVerified' className='' style={{marginLeft:"0.5em"}}>I have read and agree to the Account Agreement and Terms and Conditions</label>
                        </div>

                        <div className="btn-wrapper">
                            {isCheckboxChecked ? (
                                <Link to="/congratulations-page" className="manulife-btn btn-orange text-decoration-none ">
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