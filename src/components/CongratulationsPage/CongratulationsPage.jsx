import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './CongratulationsPage.css';
import VerticalStepper from '../VerticalStepper/VerticalStepper';
import cardFront from '../../assets/Visa_Infinite_EN.png'

// import FlipCard from '../CommonComponents/FlipCard/FlipCard'

function CongratulationsPage({ formData, setHoldFormData, setHoldCreditCrossSellData, setHoldFinancialInfoData, financialInfoData, creditCardCrossSell }) {
  

  return (
    <div className="container" >
      <div className="progressBarContainer1">
          {/* <p className="progressBarLabel1">Step 6 - Review and submit</p> */}
          <ProgressBar progress={6} /> {/* Pass the progress for this page */}
      </div>

      <div className='subContainer widthSubContainer'>
      <div className='cardMainContainer'> 
          {/* Vertical application tracker */}
          <div className='cardTracker my-0'>
            <p className='header_label py-1' style={{textAlign:'left', display: 'inline-block'}}>Tracking Details</p>
            <VerticalStepper />
          </div>

        <div className='row exceptTrackerContainer'>
          
          <div>
          {/* card header */}
          <div className='card-header'>
              <p style={{fontSize: '24px', textAlign:'left', fontWeight:'600', letterSpacing:'0.3px'}}>Welcome to Manulife Bank</p>
              <p className='stepLabel' style={{fontSize:'16px', fontWeight:'500', letterSpacing:'0.2px', textAlign:'left', paddingTop:"0em", paddingBottom:'0em'}}>
                <span>Congratulations! </span> 
                Your credit card has been approved.</p>
                <p>Your application tracking ID - <b>A001254367</b></p>
              
          </div>

          <div className='cardContainer'>

            {/* card section */}
            <div className='cardPhoto'>
                <img src={cardFront} alt='card-front' className='frontImg'/>
                {/* <FlipCard style={{height:'300px', width:'300px'}}/> */}
            </div>
            
            {/* card-featiures section */}
            <div className='cardDesc'>
              <p className='stepLabel' style={{fontSize:'18px'}}>Manulife Visa Infinite Credit Card</p>
              <ul className='stepLabel px-3' style={{letterSpacing:'0.4px', fontWeight:500}}>
                <li>Earn 2 points per $1 spent on gas, groceries and utilities</li>
                <li>1 point per dollar on all other purchases</li>
                <li>0% into APR for 6 months on Balance Transfers and Purchases.</li>
                <li>No Annual Fee</li>
                <li>Earn 2500 bonus points with first purchase or balance transfers</li>
              </ul>
            </div>
          </div>

          </div>
          <div className='signInBtnContainer'>
                <button className="manulife-btn btn-orange signInBtn">Sign in</button>
            </div>
</div>
            
          </div>
       
      </div>
    </div>
  );
}

export default CongratulationsPage;
