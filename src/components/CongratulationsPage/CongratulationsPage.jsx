import React from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import './CongratulationsPage.css';
import checkMark from "../../assets/checkMark.png"
import FlipCard from "../CommonComponents/FlipCard/FlipCard"

function CongratulationsPage({ formData, updateFormData }) {




  return (
    <div className='container'>
      <div className="progressBarContainer1">
          <ProgressBar progress={6} />
        </div>
      <div className='subContainer'>
        
        <div className='row outerContainer'>

          <div>Tracker</div>
          <div>
            <div></div>
            <div></div>
          </div>


          
          </div>
       
      </div>
    </div>
  );
}

export default CongratulationsPage;
