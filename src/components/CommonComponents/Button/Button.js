import React from 'react'
import "./Button.css"

function Button() {
  return (
    <div>
        <div className="btn-wrapper row">
          <div className="col">
            <button className="manulife-btn btn-orange form-control">Yes</button>
          </div>
          <div className="col">
              <button className="manulife-btn btn-white form-control">No</button>
          </div>
        </div>
    </div>
  )
}

export default Button