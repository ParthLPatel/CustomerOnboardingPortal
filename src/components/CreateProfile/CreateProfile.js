import React, { useState, useRef } from "react";

import { useForm } from "react-hook-form"

import { getAddress } from "../../utils/RetrieveAddress";
import './CreateProfile.css'
import { Link } from 'react-router-dom';

import ProgressBar from "../ProgressBar/ProgressBar";
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import plantImg from "../../assets/plantImg.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


function CreateProfile({ formData, updateFormData }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const formRef = useRef(null);  // Create a ref for the form

    const onSubmit = () => console.log(formData)
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [homeAddressList, setHomeAddressList] = useState([]);
    const [manualAddress, setManualAddress] = useState(false);

    const handleInputChange = (e, fieldName) => {
        updateFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleAddressSearch = async (query) => {
        setInputValue(query);
        const data = await getAddress(query);
        console.log(data.Items);
        setHomeAddressList(data.Items);
        console.log(showDropdown);
        if (data.Items?.length > 0) {
            setShowDropdown(true);
        } else {
            // Handle the case when data or data.Items is null or undefined
            setHomeAddressList("");
            setShowDropdown(false);
        }
    };

    const handleOptionClick = (option) => {
        if (option && option.Text && option.Description) {
            setInputValue(`${option.Text}, ${option.Description}`);
            setShowDropdown(false);
            updateFormData({ ...formData, homeAddress: option.Text + ", " + option.Description });
        } else {
            // Handle the case where option or its properties are null or undefined
            console.error("Invalid option:", option);
        }
    };

    const handleManualAddressChange=()=>{
        setManualAddress(!manualAddress)
    }

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <div className="container">

                    <div className="progressBarContainer1">
                        {/* <p className="progressBarLabel1">Step 1 - Create a profile</p> */}
                        <ProgressBar progress={1} /> {/* Pass the progress for this page */}
                    </div>

                    <div className="row subContainer">


                        <div className="headerContainer">
                            <img src={plantImg} alt="Your SVG" className="plantLogo" />
                            <p className="header_label">First, let's create your profile.</p>
                        </div>

                        <div className="insideContainer">

                            <div className="row grpContainer">
                                <div className="col">
                                    <TextField
                                        color="success"
                                        placeholder="First Name"
                                        {...register("firstName", { required: true })}
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange(e, "firstName")}
                                        label="First Name"
                                        variant="outlined"
                                        className="form-control mb-4"
                                        InputProps={{
                                            style: { borderColor: '#09874E' }, // Set your desired color
                                        }}
                                    />
                                </div>
                                {errors.firstName && <span>This field is required</span>}

                                <div className="col">
                                    <TextField
                                        color="success"
                                        placeholder="Last Name"
                                        {...register("lastName", { required: true })}
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange(e, "lastName")}
                                        label="Last Name"
                                        variant="outlined"
                                        className="form-control mb-4"
                                    />
                                </div>
                                {errors.lastName && <span>This field is required</span>}
                            </div>

                            <div className="row grpContainer">
                                <div className="col">
                                    <TextField
                                        color="success"
                                        id="outlined-basic"
                                        label="Date of Birth"
                                        type="date"
                                        variant="outlined"
                                        value={formData.birthDate}
                                        onChange={(e) => handleInputChange(e, "birthDate")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        className="form-control mb-4"
                                    />
                                </div>

                                {errors.birthDate && <span>This field is required</span>}

                                <div className="col">
                                    <TextField
                                        color="success"
                                        placeholder="Email Address"
                                        {...register("emailAddress", { required: true })}
                                        value={formData.emailAddress}
                                        onChange={(e) => handleInputChange(e, "emailAddress")}
                                        label="Email Address"
                                        variant="outlined"
                                        className="form-control mb-4"
                                    />
                                </div>

                                {errors.emailAddress && <span>This field is required</span>}
                            </div>

                            <div className="row grpContainer">

                                <div className="col">
                                    <TextField
                                        color="success"
                                        placeholder="Phone Number"
                                        {...register("phoneNumber", { required: true })}
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange(e, "phoneNumber")}
                                        label="Phone Number"
                                        variant="outlined"
                                        className="form-control"
                                    />

                                </div>
                            </div>

                            {errors.phoneNumber && <span>This field is required</span>}

                        

                        
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} checked={manualAddress} label="Needs to enter the address manually" onChange={handleManualAddressChange}/>
                        </FormGroup>
                        
                        {
                            (!manualAddress)?(                        <Autocomplete
                                options={homeAddressList}
                                getOptionLabel={(option) => `${option.Text}, ${option.Description}`}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => handleAddressSearch(newInputValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Home Address"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => handleInputChange(e, "homeAddress")}
                                        color="success"
                                    
                                    />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                    `${option.Text}, ${option.Description}` === value
                                }
                                onChange={(event, newValue) => handleOptionClick(newValue)}
                                className="mt-4 mb-2 "
                            />):(
                                <div></div>
                            )
                        }

                          
                        
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
                        <div className="btn-wrapper">
                            <Link to="/verify-phone-number" className="manulife-btn btn-orange text-decoration-none">
                                Submit
                            </Link>

                            <Link to="/" className="manulife-btn btn-white text-decoration-none">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default CreateProfile;

