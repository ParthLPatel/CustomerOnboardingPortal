import React from 'react'
import "./Button.css"

function Button() {
  return (
    <div>
        <div className="btn-wrapper">
            <button className="manulife-btn btn-orange">Yes</button>
            <button className="manulife-btn btn-white">No</button>
        </div>
    </div>
  )
}

export default Button