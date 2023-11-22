import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import "./FinancialInformation.css"
import { Link, useNavigate } from 'react-router-dom';


import ProgressBar from "../ProgressBar/ProgressBar.js";


const FinancialInformation = ({ financialInfoData, updateFinancialInfoData }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        getValues,
        formState
    } = useForm()

    const employmentStatus = watch("employmentStatus");
    const navigate = useNavigate();

    useEffect(() => {
        if (financialInfoData) {
            setValue('annualIncome', financialInfoData.annualIncome || '');
            setValue('otherHouseholdIncome', financialInfoData.otherHouseholdIncome || '');
            setValue('employmentStatus', financialInfoData.employmentStatus || '');
            setValue('employerName', financialInfoData.employerName || '');
            setValue('employerIndustry', financialInfoData.employerIndustry || '');
            setValue('institutionName', financialInfoData.institutionName || '');
            setValue('graduationDate', financialInfoData.graduationDate || '');
        }
    }, [financialInfoData, setValue]);


    const employmentStatusList = ["Full Time Employment", "Student", "Retired", "Self-Employment"];


    const onSubmit = (data) => {
        // Check if the default option is selected
        if (employmentStatus === "") {
            setValue("employmentStatus", ""); // Reset the field value
            // Set a custom error message for the EmploymentStatus field
            setError("employmentStatus", {
                type: "manual",
                message: "Please select a valid employment status",
            });
            return;
        }
        clearData(data);
        updateFinancialInfoData({ ...data, employmentStatus });
        navigate("/review-info");
    };


    const clearData = (data) => {
        if (data.employmentStatus === "Full Time Employment") {
            data.institutionName = "";
            data.graduationDate = "";
        } else if (data.employmentStatus === "Student") {
            data.employerName = "";
            data.employerIndustry = "";
        } else {
            data.institutionName = "";
            data.graduationDate = "";
            data.employerName = "";
            data.employerIndustry = "";
        }
    }

    const onCancel = () => {
        // Access form data when the "Cancel" button is clicked
        const data = getValues();
        clearData(data);
        updateFinancialInfoData({ ...data, employmentStatus });
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row subContainer">
                            <div className="progressBarContainer1">
                                <p className="progressBarLabel1">Step 4 - Financial information</p>
                                <ProgressBar progress={5} /> {/* Pass the progress for this page */}
                            </div>
                            <p className="header_label">We need to know some of your financial information</p>
                            <div className="input-div ">
                                <label className="labeldef">Annual Income</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span><input className="col-12 form-control green-bottom-border" placeholder="Annual Income" {...register("annualIncome", { required: true })} />

                                </div>
                                {(formState.errors.annualIncome) && <div className="error-message">This field is required</div>}

                            </div>
                            <div className="input-div">
                                <label className="labeldef">Other Household Annual Income</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input className="col-12 form-control green-bottom-border" placeholder="Other household income (Optional)" {...register("otherHouseholdIncome")} />

                                </div>
                            </div>
                            <div className="input-div ">
                            <label className="labeldef">Employment Status</label>
                            <select className="form-select" defaultValue="" aria-label="Select the employment status" {...register("employmentStatus", { required: true })}>
                                <option value="" disabled>Select Employment type</option>
                                {
                                    employmentStatusList.map(e => <option key={e} value={e}>{e}</option>)
                                }
                            </select>
                            {formState.errors.employmentStatus && <span className="error-message">Please select an employment type</span>}
                            
                            
                            </div>

                            {
                                employmentStatus == "Full Time Employment" ?
                                    (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <label className="labeldef">Employer Name</label>
                                            <input className="col-12 form-control green-bottom-border" placeholder="Employer Name" key="employerName" {...register("employerName", { required: true })} />
                                            {formState.errors.employerName && <span className="error-message">This field is required</span>}
                                        </div>
                                        <div className="input-div">
                                            <label className="labeldef">Employer Industry</label>
                                            <input className="col-12 form-control green-bottom-border" placeholder="Employer Industry" key="employerIndustry" {...register("employerIndustry", { required: true })} />
                                            {formState.errors.employerIndustry && <span className="error-message">This field is required</span>}
                                        </div>
                                    </div>) :
                                    (employmentStatus == "Student" ? (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <label className="labeldef">Institution Name</label>
                                            <input className="col-12 form-control green-bottom-border" placeholder="Institution Name" key="institutionName"  {...register("institutionName", { required: true })} />
                                            {formState.errors.institutionName && <span className="error-message">This field is required</span>}
                                        </div>
                                        <div className="input-div">
                                            <label className="labeldef">Graduation Date</label>
                                            <input className="col-12 form-control green-bottom-border" type="date" placeholder="Graduation Date" key="graduationDate"  {...register("graduationDate", { required: true })} />
                                            {formState.errors.graduationDate && <span className="error-message">This field is required</span>}
                                        </div>
                                    </div>) : (<div></div>))

                            }

                            <div className="btn-wrapper">
                                <button type="submit" className="manulife-btn btn-orange text-decoration-none">
                                    Continue</button>
                                <Link to="/create-profile" className="manulife-btn btn-white text-decoration-none" onClick={onCancel}>
                                    Back
                                </Link>
                            </div>
                        </div>


                    </div>

                </form>
            </div>
        </div>
    )

}

export default FinancialInformation;