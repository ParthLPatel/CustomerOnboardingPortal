// ParentComponent.js
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import UserTypePage from '../UserTypePage/UserTypePage';

//page 1: Create Profile
import CreateProfile from '../CreateProfile/CreateProfile';

//page 2: Verify Identity
import VerifyIdentity from '../VerifyIdentity/VerifyIdentity';

//Page 3: confirm identity
import VerifyIdentity2 from '../VerifyIdentity2/VerifyIdentity2';

//page 4: financial information
import FinancialInformation from '../FinancialInformation/FinancialInformation';
import FinancialInfo from '../../models/FinancialInfoModel';

//page 5: Review and Submit
import ReviewInfo from '../ReviewPage/ReviewInfo';


const ParentContainer = () => {
    const [formData, setFormData] = useState({

        //page 1: create profile fields
        firstName: "",
        lastName: "",
        birthDate: "",
        homeAddress:"",
        emailAddress:"",
        phoneNumber: "",
        
        //page 2: verify identity fields
        IDtype: "",
        selectedIDFile: "",
        selectedSelfieFile: "",
        verificationOption: "",


    });

    const [progress, setProgress] = useState(0); // Track the progress

    const [financialInfoData,setFinancialInfoData] = useState(null);

    const updateFormData = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            ...data,
        }));
        setProgress((prevProgress) => prevProgress + 1); // Update progress on each page change
    };


    const updateFinancialInfoData = data =>{
        setFinancialInfoData((prevData) => ({
            ...prevData,
            ...data,
        }));

    }

    return (
        <Router>
            <Routes>

                <Route
                    path="/"
                    element={<UserTypePage />}
                />
                <Route
                    path="create-profile"
                    element={<CreateProfile formData={formData} updateFormData={updateFormData} progress={progress}/>}
                />
                <Route
                    path="verify-identity"
                    element={<VerifyIdentity formData={formData} updateFormData={updateFormData} progress={progress}/>}
                />
                <Route
                    path="/confirm-identity"
                    element={<VerifyIdentity2 formData={formData} updateFormData={updateFormData} progress={progress}/>}
                />
                <Route
                    path="/financial-info"
                    element={<FinancialInformation financialInfoData={financialInfoData} updateFinancialInfoData={updateFinancialInfoData} progress={progress}/>}
                />
                <Route
                    path="/review-info"
                    element={<ReviewInfo formData={formData}  financialInfoData={financialInfoData} progress={progress}/>}
                />
                {/* Add routes for other pages */}
            </Routes>
        </Router>
    );
};

export default ParentContainer;
