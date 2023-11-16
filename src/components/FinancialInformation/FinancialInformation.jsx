import React, { useState } from "react";
import { useForm } from "react-hook-form"

const FinancialInformation = ()=>{
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm()

    const employmentStatusList=["Full Time Employment","Student","Retired","Self-Employment"];
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
                <div>Step 3 - Financial information</div>
                <div>
                    <div>We need to know some of your financial information</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                            <div className="row">
                            <input className="col-12 form-control green-bottom-border" placeholder="Annual Income" {...register("AnnualIncome", { required: true })} />
                            {errors.AnnualIncome && <span>This field is required</span>}

                            <input className="col-12 form-control green-bottom-border" placeholder="Other household income (Optional)" {...register("AnnualIncome")} />
                            
                            <select class="form-select" aria-label="Select the employment status"{...register("EmploymentStatus",{ required: true })}>
                                <option value="" selected disabled>Select Employment type</option>
                                {
                                    employmentStatusList.map(e=><option key={e} value={e}>{e}</option>)
                                }
                            </select>
                            {errors.EmploymentStatus && <span>Please select an employment type</span>}

                            </div>

                            {
                                employmentStatus=="Full Time Employment"?
                                (<div>
                                    <input className="col-12 form-control green-bottom-border" placeholder="Employer Name" {...register("EmployerName", { required: true })} />
                                    {errors.EmployerName && <span>This field is required</span>}
                                    <input className="col-12 form-control green-bottom-border" placeholder="Employer Industry" {...register("EmployerIndustry", { required: true })} />
                                    {errors.EmployerIndustry && <span>This field is required</span>}

                                </div>):
                                (employmentStatus=="Self-Employment"?(<div>Self-Employment</div>):(<div>Other</div>))
                                
                            }
                        </div>
                        <button className="btn btn-primary" >Back</button>
                        <button className="btn btn-danger" type="submit">submit</button>
                    </form>
                </div>
        </div>
    )

}

export default FinancialInformation;