import React, { useState, useRef } from "react";

import { useForm } from "react-hook-form"

import { getAddress } from "../../utils/RetrieveAddress";
import './CreateProfile.css'
import { Link } from 'react-router-dom';

import ProgressBar from "../ProgressBar/ProgressBar";

function CreateProfile({ formData, updateFormData }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const formRef = useRef(null);  // Create a ref for the form

    const onSubmit = () => console.log(formData)
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [homeAddressList, setHomeAddressList] = useState([]);


    const handleInputChange = (e, fieldName) => {
        updateFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleAddressSearch = async (query) => {
        setInputValue(query);
        const data = await getAddress(query);
        console.log(data.Items);
        setHomeAddressList(data.Items);
        if(data.Items?.length > 0) {
            setShowDropdown(true);
        }else{
            setShowDropdown(false);
        }
    };

    const handleOptionClick = (option) => {
        setInputValue(`${option.Text}, ${option.Description}`);
        setShowDropdown(false);
        updateFormData({ ...formData, homeAddress: option.Text +", "+ option.Description });
    };


    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row subContainer">

                        <p className="header_label">First, let's create your profile.</p>

                        <input className="form-control" placeholder="First Name" {...register("firstName", { required: true })} value={formData.firstName} 
                        onChange={(e) => handleInputChange(e, "firstName")}/>

                        {errors.firstName && <span>This field is required</span>}

                        <input className="form-control" placeholder="Last Name" {...register("lastName", { required: true })} value={formData.lastName}
                            onChange={(e) => handleInputChange(e, "lastName")}/>

                        {errors.lastName && <span>This field is required</span>}

                        <input className="form-control" placeholder="Date of birth" type="date" {...register("birthDate", { required: true })} value={formData.birthDate}
                            onChange={(e) => handleInputChange(e, "birthDate")}/>

                        {errors.birthDate && <span>This field is required</span>}

                        <input className="form-control" placeholder="Phone Number" {...register("phoneNumber", { required: true })} value={formData.phoneNumber}
                            onChange={(e) => handleInputChange(e, "phoneNumber")}/>

                        {errors.phoneNumber && <span>This field is required</span>}

                        <input className="form-control" placeholder="Email Address" {...register("emailAddress", { required: true })} value={formData.emailAddress}
                            onChange={(e) => handleInputChange(e, "emailAddress")}/>

                        {errors.emailAddress && <span>This field is required</span>}

                        <input className="form-control" placeholder="Home Address" value={inputValue} onChange={(e) => {
                            handleAddressSearch(e.target.value); 
                            handleInputChange(e, "homeAddress");
                            }}/>

                        {showDropdown && (
                            <ul className="dropdown-list">
                                {homeAddressList
                                    .map((option) => (
                                        <li key={option.id} onClick={() => handleOptionClick(option)}>
                                            {`${option.Text}, ${option.Description}`}
                                        </li>
                                    ))}
                            </ul>
                        )}

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

