import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import "./FinancialInformation.css"
import { Link } from 'react-router-dom';
const FinancialInformation = ({ financialInfoData, updateFinancialInfoData }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        getValues,
        formState: { errors },
    } = useForm()

    const employmentStatus = watch("employmentStatus");


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

        updateFinancialInfoData({...data,employmentStatus});

    };

    const onCancel = () => {
        // Access form data when the "Cancel" button is clicked
        const data = getValues();
        updateFinancialInfoData({...data,employmentStatus});
      };


    return (
        <div>

            <div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row subContainer">
                            <div className="progress-step">Step 3 - Financial information</div>
                            <p className="header_label">We need to know some of your financial information</p>
                            <div className="input-div">
                                <input className="col-12 form-control green-bottom-border" placeholder="Annual Income" {...register("annualIncome", { required: true })} />
                                {errors.annualIncome && <span className="error-message">This field is required</span>}

                            </div>
                            <div className="input-div">
                                <input className="col-12 form-control green-bottom-border" placeholder="Other household income (Optional)" {...register("otherHouseholdIncome")} />
                            </div>
                            <select className="form-select" defaultValue="" aria-label="Select the employment status" {...register("employmentStatus", { required: true })}>
                                <option value=""  disabled>Select Employment type</option>
                                {
                                    employmentStatusList.map(e => <option key={e} value={e}>{e}</option>)
                                }
                            </select>
                            {errors.employmentStatus && <span className="error-message">Please select an employment type</span>}
                            {
                                employmentStatus == "Full Time Employment" ?
                                    (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <label>Employer Name</label>
                                            <input className="col-12 form-control green-bottom-border" placeholder="Employer Name" key="employerName" {...register("employerName", { required: true })} />
                                            {errors.employerName && <span className="error-message">This field is required</span>}
                                        </div>
                                        <div className="input-div">
                                            <label>Employer Industry</label>
                                            <input className="col-12 form-control green-bottom-border" placeholder="Employer Industry" key="employerIndustry" {...register("employerIndustry", { required: true })} />
                                            {errors.employerIndustry && <span className="error-message">This field is required</span>}
                                        </div>
                                    </div>) :
                                    (employmentStatus == "Student" ? (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <label>Institution Name</label>
                                            <input className="col-12 form-control green-bottom-border" placeholder="Institution Name"  key="institutionName"  {...register("institutionName", { required: true })} />
                                            {errors.institutionName && <span className="error-message">This field is required</span>}
                                        </div>
                                        <div className="input-div">
                                            <label>Graduation Date</label>
                                            <input className="col-12 form-control green-bottom-border" type="date" placeholder="Graduation Date" key="graduationDate"  {...register("graduationDate", { required: true })} />
                                            {errors.graduationDate && <span className="error-message">This field is required</span>}
                                        </div>
                                    </div>) : (<div></div>))

                            }

                            <div className="btn-wrapper">
                            <Link to="/financial-info" type="submit" className="manulife-btn btn-orange text-decoration-none">
                                Submit
                            </Link>
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