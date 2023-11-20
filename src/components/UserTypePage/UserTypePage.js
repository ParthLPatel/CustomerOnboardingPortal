import React from "react";
import "./UserTypePage.css";
import { Link } from 'react-router-dom';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

function UserTypePage(){
    return (
        <div className='main-area-wrapper'>
            <div className="main-area">
                <div className="section-header">Great Choice!</div>
                <div className="usertype-disclaimer">
                    <p>A recap text of product description and highlight, make the client be more confident in their decision. </p>
                    <p>Applying for a Personal Credit Card can take between 5-15 minutes. You’ll want to have these things ready:</p>
                    <div>
                        <ul>
                            <li>A government issued photo ID</li>
                            <li>Your Social Insurance Number (SIN)</li>
                            <li>Your mobile device or computer camera to confirm your identity</li>
                        </ul>
                    </div>
                    <p>You must be 18 years of age or older to apply</p>
                </div>
                <div className="usertype-q">Do you already have an account and bank with us online?</div>
                <div className="btn-wrapper">
                    <Link to="###" className="manulife-btn btn-orange text-decoration-none">
                        Yes
                    </Link>
                    <Link to="create-profile" className="manulife-btn btn-white text-decoration-none">
                        No
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default UserTypePage