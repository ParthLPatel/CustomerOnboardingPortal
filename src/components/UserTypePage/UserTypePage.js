import React, { useState } from "react";
import "./UserTypePage.css";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Manulife_green_Logo from "../../assets/Manulife_Logo1.svg";

function UserTypePage() {
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    const handleNoClick = () => {
        setShowThankYou(true);
    };

    const handleApplyNowClick = () => {
        // Navigate to the next page or perform other actions
        navigate('/create-profile');
    };

    const handleYesClick = () => {
        // Perform any actions needed for "Yes"
        // ...

        // Hide the "Thank you" message and "Apply Now" button
        setShowThankYou(false);
    };

    return (
        <div className='container'>
            <div className="subContainer">
                <div className="section-header">
                    <img src={Manulife_green_Logo} alt="Your SVG" className="ManulifeLogo"/>
                </div>
                <div className="usertype-q" style={{ width: "100%", marginTop: '45px' }}>
                    Do you already have an account and bank with us online?
                </div>

                <Stack direction="column" spacing={2} style={{ width: "100%", marginTop: '45px' }}>
                    <Button
                        variant="outlined"
                        style={{
                            color: "#434559",
                            borderColor: "#434559",
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingRight: '30px',
                            paddingLeft: '30px',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            fontSize: '20px',
                            fontWeight: '600',
                            textTransform: 'none'
                        }}
                        onClick={handleYesClick}
                    >
                        Yes
                    </Button>
                    {!showThankYou ? (
                        <Button
                            variant="outlined"
                            style={{
                                color: "#434559",
                                borderColor: "#434559",
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                paddingRight: '30px',
                                paddingLeft: '30px',
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                fontSize: '20px',
                                fontWeight: '600',
                                textTransform: 'none'
                            }}
                            onClick={handleNoClick}
                        >
                            No
                        </Button>
                    ) : (
                        <div
                            className="noBtnExpand"
                            style={{
                                width: "100%",
                                // height: "240px",
                                padding: '20px 30px 20px 30px',
                                border: '2px solid #09874E',
                                borderRadius: '4px',
                                gap: '20px',
                                marginTop: '20px',
                            }}
                        >
                            <div className="no">No</div>
                            <div style={{ fontSize: '15px', fontWeight: '400', marginTop: '20px', lineHeight: '18px' }}>
                                Thank you for choosing us! <br></br> Let’s get started setting you up as a new customer.
                            </div>
                            <Button
                                variant="outlined"
                                style={{
                                    color: "#ED6453",
                                    borderWidth:'2px',
                                    borderColor: "#ED6453",
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textTransform: 'none',
                                    marginTop: '20px',
                                    width: '256px',
                                    height:'52px',
                                    
                                }}
                                onClick={handleApplyNowClick}
                            >
                                Apply Now
                            </Button>
                        </div>
                    )}
                </Stack>
            </div>
        </div>
    );
}

export default UserTypePage;
