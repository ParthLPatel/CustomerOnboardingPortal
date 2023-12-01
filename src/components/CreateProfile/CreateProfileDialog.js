import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


import { useState, useEffect } from "react";

import { useForm } from "react-hook-form"

import { getAddress } from "../../utils/RetrieveAddress";
import './CreateProfile.css'
// import { Link } from 'react-router-dom';

// import ProgressBar from "../ProgressBar/ProgressBar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
// import plantImg from "../../assets/plantImg.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getCities, getProvinces } from "./cityMapping";

const CreateProfileDialog = (props) => {
    const { onClose, open, formData, updateFormData } = props;


    const {
        register,
        handleSubmit,
        formState,
        clearErrors,
        setError
    } = useForm()

    
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [homeAddressList, setHomeAddressList] = useState([]);

    const [needsManualAddress, setNeedsManualAddress] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [manualProvince, setManualProvince] = useState('');
    const [manualCity, setManualCity] = useState('');
    const [tempFormData,setTempFormData] = useState({});
    const [existingAddress, setExistingAddress] = useState(false);
    const handleInputChange = (e, fieldName) => {
        setTempFormData({ ...tempFormData, [fieldName]: e.target.value });
        clearErrors(fieldName);
    };

    const handleManualProvinceChange = (e) => {
        setManualProvince(e.target.value);
        const cities = getCities(e.target.value);
        setCityList([...cities]);
    }

    const handleManualCityChange = (e) => {
        setManualCity(e.target.value);
    }

    const handleManualCheckboxChange = (e) => {
        setNeedsManualAddress(e.target.checked);
    }
    useEffect(() => {
        setNeedsManualAddress(formData.needsManualAddress);
        setManualProvince(formData.manualProvince);
        if (formData.manualProvince !== "") {
            setCityList([...getCities(formData.manualProvince)]);
        }
        if (formData.manualCity !== "") {
            setManualCity(formData.manualCity);
        }
        if (formData.homeAddress !== "") {
            setExistingAddress(true);
            setInputValue(formData.homeAddress);
        }
        setTempFormData({...formData});
    }, [formData]);

    const handleAddressSearch = async (query) => {
        if (query === "" && existingAddress) {
        } else {
            setExistingAddress(false);
            setInputValue(query);
            if (query !== "") {
                console.log("find");
                const data = await getAddress(query);
                // console.log(data.Items);
                setHomeAddressList([...data.Items]);
            }
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

    const onSubmit = () => {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const numberRegex = /^\d{10,12}$/;
        const isValidNumber = numberRegex.test(formData.phoneNumber);
        const isValidEmail = emailRegex.test(formData.emailAddress);
        if(!isValidEmail){
            setError("emailAddress", {
                type: "manual",
                message: "Please enter a valid email address",
            });
            return;
        }

        if(!isValidNumber){
            setError("phoneNumber", {
                type: "manual",
                message: "Please enter a valid phone number",
            });
            return;
        }
        updateFormData({...tempFormData,manualCity,manualProvince,needsManualAddress});
        onClose();
    }

    
    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle style={{
                // borderBottom: '1px solid black',
                fontWeight: '600',
                textAlign:'center',
            }}>Edit Contact Information</DialogTitle>
            <div >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="" >

                        <div className="row changeContainer" >
                            <div className="insideContainer">

                                <div className="row grpContainer">
                                    <div className="col">
                                        <TextField
                                            color="success"
                                            placeholder="First Name"
                                            {...register("firstName", { required: true })}
                                            value={tempFormData.firstName}
                                            onChange={(e) => handleInputChange(e, "firstName")}
                                            label="First Name"
                                            variant="outlined"
                                            className="form-control mb-4"
                                            InputProps={{
                                                style: { borderColor: '#09874E' }, // Set your desired color
                                            }}
                                        />
                                    </div>
                                    {/* {errors.firstName && <span>This field is required</span>} */}

                                    <div className="col">
                                        <TextField
                                            color="success"
                                            placeholder="Last Name"
                                            {...register("lastName", { required: true })}
                                            value={tempFormData.lastName}
                                            onChange={(e) => handleInputChange(e, "lastName")}
                                            label="Last Name"
                                            variant="outlined"
                                            className="form-control mb-4"
                                        />
                                    </div>
                                    {/* {errors.lastName && <span>This field is required</span>} */}
                                </div>

                                <div className="row grpContainer">
                                    <div className="col">
                                        <TextField
                                            color="success"
                                            id="outlined-basic"
                                            label="Date of Birth"
                                            type="date"
                                            variant="outlined"
                                            value={tempFormData.birthDate}
                                            onChange={(e) => handleInputChange(e, "birthDate")}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className="form-control mb-4"
                                        />
                                    </div>

                                    {/* {errors.birthDate && <span>This field is required</span>} */}

                                    <div className="col">
                                        <TextField
                                            color="success"
                                            placeholder="Email Address"
                                            {...register("emailAddress", { required: true })}
                                            value={tempFormData.emailAddress}
                                            onChange={(e) => handleInputChange(e, "emailAddress")}
                                            label="Email Address"
                                            variant="outlined"
                                            className="form-control mb-4"
                                        />
                                    </div>

                                    {/* {errors.emailAddress && <span>This field is required</span>} */}
                                </div>

                                <div className="row grpContainer">

                                    <div className="col">
                                        <TextField
                                            color="success"
                                            placeholder="Phone Number"
                                            {...register("phoneNumber", { required: true })}
                                            value={tempFormData.phoneNumber}
                                            onChange={(e) => handleInputChange(e, "phoneNumber")}
                                            label="Phone Number"
                                            variant="outlined"
                                            className="form-control"
                                        />

                                    </div>
                                </div>

                                {/* {errors.phoneNumber && <span>This field is required</span>} */}






                                {
                                    (!needsManualAddress) ? (<Autocomplete
                                        clearOnEscape
                                        filterOptions={(x) => x}
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
                                                // onChange={(e) => handleInputChange(e, "homeAddress")}
                                                color="success"

                                            />
                                        )}
                                        isOptionEqualToValue={(option, value) =>
                                            `${option.Text}, ${option.Description}` === value
                                        }
                                        onChange={(event, newValue) => handleOptionClick(newValue)}
                                        className="mt-4 mb-2 "
                                    />) : (
                                        <div></div>
                                    )
                                }
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="success" />} checked={needsManualAddress} label="Can't find address? Needs to enter the address manually"
                                        onChange={e => handleManualCheckboxChange(e)}
                                    />
                                </FormGroup>

                                {
                                    (needsManualAddress) ? (
                                        <>
                                            <div className="row grpContainer my-2">
                                                <div className="col-12 col-md-8">
                                                    <TextField
                                                        color="success"
                                                        placeholder="Address line"
                                                        {...register("manualAddressLine", { required: true })}
                                                        value={tempFormData.manualAddressLine}
                                                        onChange={(e) => handleInputChange(e, "manualAddressLine")}
                                                        label="Address line"
                                                        variant="outlined"
                                                        className="form-control"
                                                    />

                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <TextField
                                                        color="success"
                                                        placeholder="Postal code"
                                                        {...register("manualPostalCode", { required: true })}
                                                        value={tempFormData.manualPostalCode}
                                                        onChange={(e) => handleInputChange(e, "manualPostalCode")}
                                                        label="Postal code"
                                                        variant="outlined"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row grpContainer my-2">
                                                <div className="col-12 col-md-6">
                                                    <FormControl fullWidth>
                                                        <InputLabel id="province-label">Province</InputLabel>
                                                        <Select
                                                            labelId="province-label"
                                                            id="manual-province"
                                                            value={manualProvince}
                                                            label="Province"
                                                            color="success"
                                                            onChange={e => handleManualProvinceChange(e)}
                                                        >
                                                            {
                                                                getProvinces().map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <FormControl fullWidth>
                                                        <InputLabel id="city-label">City</InputLabel>
                                                        <Select
                                                            labelId="city-label"
                                                            id="manual-city"
                                                            value={manualCity}
                                                            label="City"
                                                            color="success"
                                                            onChange={e => handleManualCityChange(e)}
                                                        >
                                                            {
                                                                cityList.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div></div>
                                    )
                                }

                            </div>
                            <div className="btn-wrapper">
                                <button type="submit" className="manulife-btn btn-orange text-decoration-none"
                                style={{fontWeight:'700', fontSize:'18px'}}>
                                    Continue
                                </button>

                                <button  onClick={e=>handleClose(e)} className="manulife-btn btn-white text-decoration-none"
                                style={{fontWeight:'700', fontSize:'18px'}}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}


export default CreateProfileDialog;