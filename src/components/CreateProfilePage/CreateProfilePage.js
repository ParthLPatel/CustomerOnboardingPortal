import React, { useState } from "react";

import { useForm } from "react-hook-form"

import "./CreateProfilePage.css";

import { getAddress } from "../../utils/RetrieveAddress";

function CreateProfilePage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [homeAddressList, setHomeAddressList] = useState([]);

    const handleAddressSearch = async (query) => {
        setInputValue(query);
        const data = await getAddress(query);
        setHomeAddressList(data.Items);
        setShowDropdown(true);
    };

    const handleOptionClick = (option) => {
        setInputValue(`${option.Text}, ${option.Description}`);
        setShowDropdown(false);
    };

    const stage = 1;
    return (
        <div>

            <div>Step 1 - Create a profile </div>
            <div>
                <div>First, let’s create your profile.</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row gx-5">
                        <input className="col-sm-6 col-12 form-control green-bottom-border" placeholder="First Name" {...register("FirstName", { required: true })} />

                        {errors.FirstName && <span>This field is required</span>}

                        <input className="col-sm-6 col-12 form-control green-bottom-border" placeholder="Last Name" {...register("LastName", { required: true })} />

                        {errors.LastName && <span>This field is required</span>}

                        <input className="col-sm-6 col-12 form-control green-bottom-border" placeholder="Date of birth" type="date" {...register("DateOfBirth", { required: true })} />

                        {errors.DateOfBirth && <span>This field is required</span>}

                        <input className="col-sm-6 col-12 form-control green-bottom-border" placeholder="Phone Number" {...register("PhoneNumber", { required: true })} />

                        {errors.PhoneNumber && <span>This field is required</span>}

                        <input className="col-sm-6 col-12 form-control green-bottom-border" placeholder="Home Address" onChange={e => handleAddressSearch(e.target.value)} value={inputValue} />

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

                    </div>
                </div>
                <button class="btn btn-primary">Back</button>
                <button type="submit" class="btn btn-danger">Submit</button>
            </form>
        </div>

    )
}

export default CreateProfilePage;

