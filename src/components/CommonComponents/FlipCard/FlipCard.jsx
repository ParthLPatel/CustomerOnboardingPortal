// FlipCard.jsx

import React, { useState } from 'react';
import "../../CommonComponents/FlipCard/FlipCard.css";
import "./FlipCard.css";
import frontImage from '../../../Visa_Infinite_EN.png';
import backImage from '../../../credit-card-cvv.png';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={frontImage} alt="Front" />
        </div>
        <div className="flip-card-back">
          <img src={backImage} alt="Back" />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
