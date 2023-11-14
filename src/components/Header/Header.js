import React from 'react'
import './Header.css'

function Header() {
  return (
            <div className='row'>
                <div className='col-3 box1'>
                    {/* placeholder - green box */}
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

