import React, { useState } from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import './CongratulationsPage.css';

function CongratulationsPage({ formData, updateFormData }) {




  return (
    <div className='container'>
      <div className="progressBarContainer1">
          <ProgressBar progress={6} />
        </div>
      <div className='subContainer'>
        

        <div className="header_label">Your ID looks good!</div>
       
      </div>
    </div>
  );
}

export default CongratulationsPage;
