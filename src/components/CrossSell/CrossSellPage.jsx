import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import ProgressBar from "../ProgressBar/ProgressBar";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import "./CrossSellPage.css";


const CrossSellPage = ({ creditCardCrossSell, updateCreditCardCrossSell }) => {
    const {
        register,
        handleSubmit,
        formState,
        control,
        setValue
    } = useForm();

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [newChecking, setNewChecking] = useState(false);
    const [newSaving, setNewSaving] = useState(false);
    useEffect(() => {

        if (creditCardCrossSell?.accountIntent) {
            setSelectedOptions([...creditCardCrossSell?.accountIntent]);
        }

        setNewChecking(creditCardCrossSell?.newChecking);
        setNewSaving(creditCardCrossSell?.newSaving);
        setValue("SIN",creditCardCrossSell?.SIN || "")
    }, []);

    const changeNewChanging = () => {
        setNewChecking(!newChecking);
    }

    const changeNewSaving = () => {
        setNewSaving(!newSaving);
    }

    const checkboxOptions = [
        { value: 'PersonalSavings', label: 'Personal Savings' },
        { value: 'DepositsLivingExpenses', label: 'Deposits / Living Expenses' },
        { value: 'Investment', label: 'Investment' },
    ];

    const navigate  = useNavigate();
    const handleCheckboxChange = (option) => {
        const optionIndex = selectedOptions.indexOf(option);
        if (optionIndex !== -1) {
            // Option is already selected, remove it
            const updatedOptions = [...selectedOptions];
            updatedOptions.splice(optionIndex, 1);
            setSelectedOptions(updatedOptions);
        } else {
            // Option is not selected, add it
            setSelectedOptions([...selectedOptions, option]);
        }
        updateCreditCardCrossSell({ ...creditCardCrossSell, accountIntent: [...selectedOptions] })
    }

    const onSubmit = (data) => {

        updateCreditCardCrossSell({ newChecking, newSaving, SIN:data.SIN, accountIntent: [...selectedOptions], })
        navigate("/review-info");
    };

    return (
        <div>
            <div className="container">
                <div className="progressBarContainer1">
                    <ProgressBar progress={4} /> {/* Pass the progress for this page */}
                </div>
                <div className="cross-sell-subContainer">
                    <p className="header_label">Please review your information and the terms and conditions</p>
                    <div>
                        <p className="other-options">Did you know there are other options to help you?</p>
                        <p className="do-not-miss">Right now, you can add them to your application bundle. If you want these products later, you have to re-apply</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="new-account">
                            <FormControlLabel
                                control={
                                    <Checkbox name="newChecking" color="success" onChange={changeNewChanging} checked={newChecking}/>
                                }
                                label="Chequing Account"
                            />
                            <div>Description of the chequing account</div>

                        </div>
                        <div className="new-account">
                            <FormControlLabel
                                control={
                                    <Checkbox name="newSaving" color="success" onChange={changeNewSaving} checked={newSaving}/>
                                }
                                label="Saving Account"
                            />
                            <div>Description of the savings account</div>
                        </div>

                        {
                            (newSaving || newChecking) ?
                                (<><div className="header_label" style={{ "textAlign": "left", "marginBottom": "20px" }}>
                                    Let’s set up your account.
                                </div>
                                    <div className="cross-sell-more-input">
                                        We just need a bit more input from you.
                                    </div>
                                    <div className="input-div">
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="SIN" color="success">Social insurance number</InputLabel>
                                            <OutlinedInput
                                                color="success"
                                                id="SIN"
                                                label="Social insurance number"
                                                {...register("SIN", { required: true })}
                                            />
                                            <FormHelperText >You SIN is required for tax reporting purposes. </FormHelperText>
                                            <FormHelperText sx={{ color: "crimson" }}> {(formState.errors.SIN) && "This field is required"}</FormHelperText>
                                        </FormControl>

                                    </div>
                                    <div className="intend-to-use">
                                        How do you intend to use this account?
                                    </div>
                                    <div className="cross-sell-option-wrapper">
                                        <FormGroup>
                                            {

                                                checkboxOptions.map((checkbox) => (
                                                    <FormControlLabel key={checkbox.value}
                                                        control={
                                                            <Checkbox name={checkbox.value} color="success" sx={{ "display": "block" }} />
                                                        }
                                                        label={checkbox.value}
                                                        checked={selectedOptions.indexOf(checkbox.value) !== -1}
                                                        onChange={() => handleCheckboxChange(checkbox.value)}
                                                    />
                                                ))

                                            }
                                        </FormGroup>
                                    </div></>) : (<div></div>)
                        }



                        <div className="btn-wrapper">
                        <button type="submit" className="manulife-btn btn-orange text-decoration-none">
                                    Continue</button>
                            <Link to="/financial-info" className="manulife-btn btn-white text-decoration-none" >
                                Back
                            </Link>
                        </div>
                    </form>
                </div></div>
        </div>)
}
export default CrossSellPage;