import React from 'react';
import './ProgressBar.css'

const ProgressBar = ({ progress }) => {
    const progressBarStyle = {
        width: `${(progress / 6) * 100}%`, // Assuming you have 3 pages in total
    };

    return (
        <div className="progressContainer">
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={progressBarStyle}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="6" // Adjust based on the total number of pages
                />
            </div>
        </div>
    );
};

export default ProgressBar;

