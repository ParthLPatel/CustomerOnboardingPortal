// ParentComponent.js
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import UserTypePage from '../UserTypePage/UserTypePage';

//page 1: Create Profile
import CreateProfile from '../CreateProfile/CreateProfile';

//page 2: Verify Identity

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

    const updateFormData = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

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
                {/* <Route
                    path="/page2"
                    render={(props) => <Page2 {...props} formData={formData} updateFormData={updateFormData} />}
                />
                <Route
                    path="/page3"
                    render={(props) => <Page3 {...props} formData={formData} updateFormData={updateFormData} />}
                /> */}
                {/* Add routes for other pages */}
            </Routes>
        </Router>
    );
};

export default ParentContainer;
