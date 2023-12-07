import React from 'react';
import './Header.css';

import ABC_logo from "../../../assets/CGI_logo.svg.png";

function Header() {
  return (
    <div className='header-container'>
      <div className='row'>
        <div className='col-3 box1'>
          {/* <img src={ABC_logo} alt="Your SVG" className="ABCLogo"/> */}
        </div>
        <div className='col-9 box2'>
          {/* text */}
          <p className="para">
            <span className="para_text_1">ABC</span>
            <span className="para_text_2"> Bank</span>
          </p>
          {/* FR language */}
          <div className="fr_language ml-auto">
            <div className='fr_language_inner'>
              <p className="fr_text1">FR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
