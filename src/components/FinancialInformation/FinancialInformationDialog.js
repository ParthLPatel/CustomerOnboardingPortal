import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import  { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form"
import "./FinancialInformation.css"
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
// import ProgressBar from "../ProgressBar/ProgressBar.js";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { Slider } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
// import { ReactComponent as FinancialInformationPageIcon } from "../../assets/FinancialInformationPageIcon.svg"

import { getIndustries, getOccupations } from "./joblist.js";
import { getInstitutions } from "./institutionList.js";


const FinancialInformationDialog = (props) => {
    const { onClose, open, formData, updateFormData } = props;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        // getValues,
        formState,
        clearErrors,
        control
    } = useForm()

    // const employmentStatus = watch("employmentStatus");
    // const navigate = useNavigate();
    const [empStatus, setEmpStatus] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [insName,setInsName] = useState("");
    const [tempFinancialInfoData, setTempFinancialInfoData] = useState({});
    console.log(tempFinancialInfoData);

    
    useEffect(() => {
        if (formData) {
            setTempFinancialInfoData({...formData});
            console.log(formData)
            setValue('annualIncome', formData.annualIncome || '');
            setValue('otherHouseholdIncome', formData.otherHouseholdIncome || '');
            setValue('employmentStatus', formData.employmentStatus || '');
            setValue('employerName', formData.employerName || '');
            setValue('employerIndustry', formData.employerIndustry || '');
            setValue('institutionName', formData.institutionName || '');
            setValue('graduationDate', formData.graduationDate || '');
            setValue('occupation', formData.occupation || '');
            setSelectedIndustry(formData.employerIndustry || '');
            setEmpStatus(formData.employmentStatus || '');
            setInsName(formData.institutionName || '');
        }
    }, [formData, setValue]);


    const employmentStatusList = ["Full-time employee", "Student", "Retired", "Unemployed"];
    const institutionList = getInstitutions();
    const lessIncome = watch("annualIncome");

    const onSubmit = (data) => {
        // Check if the default option is selected
        if (empStatus === "") {
            setValue("employmentStatus", ""); // Reset the field value
            // Set a custom error message for the EmploymentStatus field
            setError("employmentStatus", {
                type: "manual",
                message: "Please select a valid employment status",
            });
            return;
        }
        clearData(data);
        updateFormData({ ...data, employmentStatus: empStatus });
        onClose();
    };


    const clearData = (data) => {
        if (empStatus === "Full-time employee") {
            data.institutionName = "";
            data.graduationDate = "";
        } else if (empStatus === "Student") {
            data.employerName = "";
            data.employerIndustry = "";
            data.occupation = "";
        } else {
            data.institutionName = "";
            data.graduationDate = "";
            data.employerName = "";
            data.employerIndustry = "";
            data.occupation = "";
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        setTempFinancialInfoData({...formData});
        setSelectedIndustry(formData.employerIndustry || '');
            setEmpStatus(formData.employmentStatus || '');
            setInsName(formData.institutionName || '');
        onClose();
    };

    const handleEmpChange = (e) => {
        clearErrors("employmentStatus");
        setEmpStatus(e.target.value);
    }

    const marks = [
        {
            value: 0,
            label: '$0',
        },
        {
            value: 100000,
            label: '$100,000',
        },
        {
            value: 200000,
            label: '>$200,000',
        },
    ];


    return (        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit Contact Information</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">

                        <div className="row subContainer mt-1">
                            <div className="input-div ">

                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="personal-annual-income" color="success">Personal annual income</InputLabel>
                                    <Controller
                                        name="annualIncome"
                                        control={control}
                                        defaultValue={50000}
                                        render={({ field }) => (
                                            <>
                                                <OutlinedInput
                                                    id="personal-annual-income"
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    label="Personal annual income"
                                                    {...field}
                                                    {...register("annualIncome", { required: true })}
                                                    color="success"
                                                />
                                                <FormHelperText sx={{ color: "crimson" }}>{formState.errors.annualIncome && "This field is required"}</FormHelperText>
                                                <div className="slider-wrapper">
                                                    <Slider
                                                        value={field.value}
                                                        onChange={(event, newValue) => setValue("annualIncome", newValue)}
                                                        aria-labelledby="input-slider"
                                                        valueLabelDisplay="auto"
                                                        step={1000}
                                                        min={0}
                                                        max={200000}
                                                        marks={marks}
                                                        sx={{
                                                            color: '#09874E'
                                                        }}
                                                    />
                                                    {
                                                        lessIncome < 50000 ? (<div className="less-income">
                                                            <span>Annual income less than $50,000? We recommend the <b>ManulifeMONEY+ Visa Platinum</b>, click <b><Link>HERE</Link></b> to apply!</span>
                                                        </div>) : (<></>)
                                                    }

                                                </div>


                                            </>
                                        )}
                                    />
                                </FormControl>

                            </div>
                            <div>

                            </div>
                            <div className="input-div">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="household-annual-income" color="success">Total household annual income</InputLabel>
                                    <Controller
                                        name="otherHouseholdIncome"
                                        control={control}
                                        defaultValue={0}
                                        render={({ field }) => (
                                            <>
                                                <OutlinedInput
                                                    id="household-annual-income"
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    label="Total household annual income"
                                                    {...field}
                                                    {...register("otherHouseholdIncome")}
                                                    color="success"
                                                />
                                                <Slider
                                                    value={field.value}
                                                    onChange={(event, newValue) => setValue("otherHouseholdIncome", newValue)}
                                                    aria-labelledby="input-slider"
                                                    valueLabelDisplay="auto"
                                                    step={1000}
                                                    min={0}
                                                    max={200000}
                                                    marks={marks}
                                                    sx={{
                                                        color: '#09874E'
                                                    }}
                                                />

                                            </>
                                        )}
                                    />
                                </FormControl>

                            </div>
                            <div className="input-div ">
                                <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="employment-status" color="success">Employment status</InputLabel>
                                    <Select
                                        color="success"
                                        labelId="employment-status"
                                        id="employment-status"
                                        value={empStatus}
                                        label="Employment status"
                                        onChange={handleEmpChange}

                                    >
                                        <MenuItem value="" disabled>
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            employmentStatusList.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                {formState.errors.employmentStatus && <span className="error-message">Please select an employment type</span>}


                            </div>

                            {
                                empStatus === "Full-time employee" ?
                                    (<div className="employment-wrapper">

                                        <div className="input-div">
                                            <FormControl fullWidth sx={{ m: 1 }}>
                                                <InputLabel htmlFor="industry" color="success">Select industry:</InputLabel>
                                                <Controller
                                                    color="success"
                                                    name="industry"
                                                    control={control}
                                                    defaultValue=""
                                                    {...register("employerIndustry", { required: true })}
                                                    render={({ field }) => (
                                                        <Select {...field}
                                                            label="Select industry"
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setSelectedIndustry(e.target.value);
                                                            }}
                                                            color="success"
                                                        >

                                                            <MenuItem value="" disabled>Select an industry</MenuItem>
                                                            {getIndustries().map((industry) => (
                                                                <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                <FormHelperText sx={{ color: "crimson" }}>{formState.errors.employerIndustry && "This field is required"}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="input-div">
                                            <FormControl fullWidth sx={{ m: 1 }} >
                                                <InputLabel htmlFor="occupation" color="success">Select occupation:</InputLabel>
                                                <Controller

                                                    name="occupation"
                                                    control={control}
                                                    defaultValue=""
                                                    {...register("occupation", { required: true })}
                                                    render={({ field }) => (
                                                        <Select {...field} color="success" label="Select occupation">

                                                            <MenuItem value="" disabled>Select an occupation</MenuItem>
                                                            {getOccupations(selectedIndustry)?.map((occupation) => (
                                                                <MenuItem key={occupation} value={occupation}>{occupation}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                <FormHelperText sx={{ color: "crimson" }}>{formState.errors.occupation && "This field is required"}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="input-div">
                                            <FormControl fullWidth sx={{ m: 1 }}>
                                                <InputLabel htmlFor="employer-name" color="success">Employer name</InputLabel>
                                                <OutlinedInput
                                                    color="success"
                                                    id="employer-name"
                                                    label="Employer name"
                                                    {...register("employerName", { required: true })}
                                                />
                                                <FormHelperText sx={{ color: "crimson" }}> {(formState.errors.employerName) && "This field is required"}</FormHelperText>
                                            </FormControl>
                                        </div>

                                    </div>) :
                                    (empStatus === "Student" ? (<div className="employment-wrapper">
                                        <div className="input-div">
                                            <Autocomplete
                                                disablePortal
                                                id="institution-name"
                                                color="success"
                                                options={institutionList}
                                                fullWidth
                                                sx={{ m: 1,marginTop:"10px" }}
                                                defaultValue={insName}
                                                renderInput={(params) => <TextField color="success" {...register("institutionName", { required: true })} {...params} label="Institution name" />}
                                            />
                                            <FormHelperText sx={{ color: "crimson" }}> {(formState.errors.institutionName) && "This field is required"}</FormHelperText>

                                        </div>
                                        <div className="input-div">
                                            <TextField
                                                color="success"
                                                id="graduation-date"
                                                label="Graduation date"
                                                type="date"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    color: "success"
                                                }}
                                                fullWidth
                                                sx={{ m: 1 }}
                                                {...register("graduationDate", { required: true })}
                                            />

                                            <FormHelperText sx={{ color: "crimson" }}> {(formState.errors.graduationDate) && "This field is required"}</FormHelperText>
                                        </div>
                                    </div>) : (<div></div>))

                            }

                        </div>


                    </div>
                    <div className="btn-wrapper">
                                <button type="submit" className="manulife-btn btn-orange text-decoration-none">
                                    Submit
                                </button>

                                <button  onClick={e=>handleClose(e)} className="manulife-btn btn-white text-decoration-none">
                                    Cancel
                                </button>
                            </div>
                </form>
            </Dialog>)
}

export default FinancialInformationDialog;