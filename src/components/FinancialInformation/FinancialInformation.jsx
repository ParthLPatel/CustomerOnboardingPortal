import React, { useState } from "react";
import { useForm } from "react-hook-form"
import "./FinancialInformation.css"
import { Link } from 'react-router-dom';
const FinancialInformation = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm()

    const employmentStatusList = ["Full Time Employment", "Student", "Retired", "Self-Employment"];
    // const [employmentStatus,setEmploymentStatus] = useState("");

    const employmentStatus = watch("EmploymentStatus");

    const onSubmit = (data) => {
        // Check if the default option is selected
        if (employmentStatus === "") {
            setValue("EmploymentStatus", ""); // Reset the field value
            // Set a custom error message for the EmploymentStatus field
            setError("EmploymentStatus", {
                type: "manual",
                message: "Please select a valid employment status",
            });
            return;
        }

        console.log(data);
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
                                <input className="col-12 form-control green-bottom-border" placeholder="Annual Income" {...register("AnnualIncome", { required: true })} />
                                {errors.AnnualIncome && <span className="error-message">This field is required</span>}

                            </div>
                            <div className="input-div">
                                <input className="col-12 form-control green-bottom-border" placeholder="Other household income (Optional)" {...register("AnnualIncome")} />
                            </div>
                            <select class="form-select" aria-label="Select the employment status"{...register("EmploymentStatus", { required: true })}>
                                <option value="" selected disabled>Select Employment type</option>
                                {
                                    employmentStatusList.map(e => <option key={e} value={e}>{e}</option>)
                                }
                            </select>
                            {errors.EmploymentStatus && <span className="error-message">Please select an employment type</span>}
                            {
                                employmentStatus == "Full Time Employment" ?
                                    (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <input className="col-12 form-control green-bottom-border" placeholder="Employer Name" {...register("EmployerName", { required: true })} />
                                            {errors.EmployerName && <span className="error-message">This field is required</span>}
                                        </div>
                                        <div className="input-div"><input className="col-12 form-control green-bottom-border" placeholder="Employer Industry" {...register("EmployerIndustry", { required: true })} />
                                            {errors.EmployerIndustry && <span className="error-message">This field is required</span>}
                                        </div>
                                    </div>) :
                                    (employmentStatus == "Student" ? (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <input className="col-12 form-control green-bottom-border" placeholder="Institution Name" {...register("InstitutionName", { required: true })} />
                                            {errors.InstitutionName && <span className="error-message">This field is required</span>}
                                        </div>
                                        <div className="input-div"><input className="col-12 form-control green-bottom-border" type="date" placeholder="Graduation Date" {...register("GraduationDate", { required: true })} />
                                            {errors.GraduationDate && <span className="error-message">This field is required</span>}
                                        </div>
                                    </div>) : (<div></div>))

                            }

                            <div className="btn-wrapper">
                                <button type="submit" className="manulife-btn btn-orange text-decoration-none">
                                    Submit
                                </button>
                                <Link to="/" className="manulife-btn btn-white text-decoration-none">
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