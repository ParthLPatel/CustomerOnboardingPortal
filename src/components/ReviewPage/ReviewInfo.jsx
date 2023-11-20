import React from "react";
import { useForm, Controller } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import "./ReviewInfo.css";

import ProgressBar from "../ProgressBar/ProgressBar.js";

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



    return (
        <div>
            <div className="container">
                <div className="row subContainer">
                    <div className="progress-step"></div>
                    <div className="progressBarContainer1">
                        <p className="progressBarLabel1">Step 6 - Review and submit</p>
                        <ProgressBar progress={6} /> {/* Pass the progress for this page */}
                    </div>
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
                    <div className="terms px-md-2">
                        <a href="">Account Agreement</a>

                    </div>
                    <div className="terms px-md-2">
                        <a href="">Terms & Conditions & Privacy</a>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-check">
                        <Controller
                            name="agreement"
                            control={control}
                            defaultValue={false}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    className="form-check-input custom-checkbox "
                                    type="checkbox"
                                    {...field}
                                />
                            )}
                        />
                        <label className="form-check-label">I have read and agree to the Account Agreement and Terms and Conditions</label>
                    </div>

                    <div className="form-check">
                        <Controller
                            name="credit"
                            control={control}
                            defaultValue={false}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input
                                    className="form-check-input custom-checkbox"
                                    type="checkbox"
                                    {...field}
                                />
                            )}
                        />
                        <label className="form-check-label">Credit Bureau Authorization</label>
                    </div>
                    <div className="btn-wrapper">
                                <button type="submit" className="manulife-btn btn-orange text-decoration-none">
                                    Submit</button>

                                <Link to="/create-profile" className="manulife-btn btn-white text-decoration-none" >
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