// ProgressBar.js
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  const steps = [
    { label: 'Create Profile', icon: <PersonIcon /> },
    { label: 'Verify Phone', icon: <PhoneIcon /> },
    { label: 'Verify Identity', icon: <HowToRegIcon /> },
    { label: 'Financial Information', icon: <AccountBoxIcon /> },
    { label: 'Review and Submit', icon: <CreditCardIcon /> },
  ];

  return (
    <div className="progress-position">
<div className="progressContainer">
      <div className="iconsContainer">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`icon ${progress === index + 1 ? 'active' : ''}`}
            style={{ width: `${100 / steps.length}%` }}
          >
            {progress > index + 1 ? <CheckIcon /> : step.icon}
            <span className="icon-label">{step.label}</span>
          </div>
        ))}
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${((progress ) / steps.length) * 100}%` }}
          aria-valuenow={progress}
          aria-valuemin="1"
          aria-valuemax={steps.length}
        />
      </div>
    </div>
    </div>
    
  );
};

export default ProgressBar;
