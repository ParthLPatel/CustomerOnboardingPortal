import React from "react";
import "./UserTypePage.css";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import ABC_Logo from "../../assets/CGI_logo.svg.png";

function UserTypePage() {
    // const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    // const handleNoClick = () => {
    //     setShowThankYou(true);
    // };

    const handleApplyNowClick = () => {
        // Navigate to the next page or perform other actions
        navigate('/create-profile');
    };

    const handleYesClick = () => {
        // Perform any actions needed for "Yes"
        // ...

        // Hide the "Thank you" message and "Apply Now" button
        // setShowThankYou(false);

        window.location.href = 'https://www.cgi.com/en';
    };

    return (
        <div className='container'>
            <div className="subContainer mx-1 subBox">
                <div>
                    <div className="section-header">
                        {/* <img src={ABC_Logo} alt="Your SVG" className="ABCLogo" /> */}
                    </div>
                    <div className="usertype-q" style={{ width: "100%", marginTop: '45px' }}>
                        Do you already have an account and bank with us online?
                    </div>
                </div>

                {/* <Stack direction="column" spacing={2} 
                // style={{ width: "100%", marginTop: '45px'}}
                className="yesNoContainer">
                    <a href="https://www.manulifebank.ca/personal-banking.html"><Button
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
                            textTransform: 'none',
                            width: '100%',
                        }}
                        onClick={handleYesClick}
                    >
                        Yes
                    </Button></a>
                    
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
                                textTransform: 'none',
                                width: '100%',
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
                                Thank you for choosing us! 
                                
                                <p style={{
                                    margin:'0.5em 0'
                                }}>Let’s get started setting you up as a new customer</p>
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
                </Stack> */}
                <div direction="column" spacing={2}
                    // style={{ width: "100%", marginTop: '45px'}}
                    className="yesNoContainer">
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
                            textTransform: 'none',
                            width: '100%',
                        }}
                        onClick={handleYesClick}
                    >
                        Yes
                    </Button>
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
                                textTransform: 'none',
                                width: '100%',
                                marginTop:"20px"
                            }}
                            onClick={handleApplyNowClick}
                        >
                            No
                        </Button>
                </div>
            </div>
        </div>
    );
}

export default UserTypePage;
