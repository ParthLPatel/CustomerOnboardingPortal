import React from 'react'
import './Header.css'

import manulife_logo from './manulife_logo.svg'

function Header() {
  return (
            <div className='row'>
                <div className='col-3 box1'>
                    <img src={manulife_logo} alt="Your SVG" className="manulifeLogo"/>
                </div>
                <div className='col-9 box2'>
                    {/* text and fr language */}
                        <p className="para">
                           <span className="para_text_1">Manulife</span>
                           <span className="para_text_2"> Bank</span>
                        </p>
                     
                        {/* <div className="fr_language ml-auto">
                            <div className='fr_language_inner'>
                                <p className="fr_text1">FR</p>
                            </div>
                       </div> */}
                    
                </div>
            </div>
    )
}

export default Header

