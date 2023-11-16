// ParentComponent.js
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import UserTypePage from '../UserTypePage/UserTypePage';

//page 1: Create Profile
import CreateProfile from '../CreateProfile/CreateProfile';

//page 2: Verify Identity

//page 3: Finantial Information
import FinancialInformation from '../FinancialInformation/FinancialInformation';
import FinancialInfo from '../../models/FinancialInfoModel';

const ParentContainer = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        homeAddress:"",
        emailAddress:"",
        phoneNumber: ""
        // Add other fields as needed
    });

    


    const [financialInfoData,setFinancialInfoData] = useState(null);

    const updateFormData = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            ...data,
        }));
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
                    element={<CreateProfile formData={formData} updateFormData={updateFormData} />}
                />
                <Route
                    path="/financial-info"
                    element={<FinancialInformation financialInfoData={financialInfoData} updateFinancialInfoData={updateFinancialInfoData} />}
                />
                {/* <Route
                    path="/page3"
                    render={(props) => <Page3 {...props} formData={formData} updateFormData={updateFormData} />}
                /> */}
                {/* /* Add routes for other pages*/}
                
            </Routes>
        </Router>
    );
};

export default ParentContainer;
