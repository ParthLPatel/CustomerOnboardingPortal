import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import visaInfiniteImage from '../../assets/Visa_Infinite_EN.png';
import visaPlatinum from '../../assets/Visa_Platinum_EN.png';
import banner from '../../assets/unsplashbanner1.jpg';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="container-landing-page">
      {/* Banner */}
      <div className="banner">
        <Typography variant="h5" className="banner-heading">Credit Card</Typography>
        <Typography variant="subtitle1" className="banner-subheading">Get cashback rewards on every purchase</Typography>
        <img src={banner} alt="Credit Card Banner" />
      </div>

      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Find the right cash back credit card for you
        </Typography>
        <Typography paragraph>
          Skip the bank machine, quickly pay at stores, and breeze through online checkouts with your ManulifeMONEY+™ Visa* Card.
          Both of our cards provide convenience, security, and valuable rewards on every purchase. Plus, you can use your smartphone,
          smartwatch, or tablet to make purchases with your card through Apple Pay®, Google Pay™, Samsung Pay, Fitbit Pay™, and Garmin Pay™.
        </Typography>
        <Typography paragraph>
          There’s only one thing left to decide: which card is right for you?
        </Typography>

        {/* Cards Container */}
        <div className="cards-container">
          {/* ManulifeMONEY+ Visa Infinite Card */}
          <div className="card">
            {/* Card Image and Title */}
            <img src={visaInfiniteImage} alt={"Manulife Visa Platinum Card"} />
            <Typography variant="h5">ManulifeMONEY+ Visa Infinite</Typography>

            {/* Card Content */}
            <Typography>
              Travel benefits, exclusive perks, and accelerated cash back rewards.
            </Typography>

            {/* Card Rates */}
            <div>
              <Typography style={{ color: '#008747' }}>1.99% for balance transfers for the first 6 months</Typography>
              <Typography style={{ color: '#008747' }}>3% cash back at grocery stores</Typography>
              <Typography style={{ color: '#008747' }}>2% cash back on travel</Typography>
              <Typography style={{ color: '#008747' }}>1% cash back on everything else</Typography>
              <Typography style={{ color: '#008747' }}>$139 annual fee waived for the first year</Typography>
              <Typography style={{ color: '#008747' }}>20.99% purchase rate</Typography>
              <Typography style={{ color: '#008747' }}>22.99% cash advance and balance transfer rate</Typography>
            </div>

            {/* Action Buttons */}
            <Button variant="contained" color="primary" href="/support/contact-us/credit-cards.html">
              Get this card
            </Button>
          </div>

          {/* ManulifeMONEY+ Visa Platinum Card */}
          <div className="card">
            {/* Card Image and Title */}
            <img src={visaPlatinum} alt="Manulife Visa Platinum Card" />
            <Typography variant="h5">ManulifeMONEY+ Visa Platinum</Typography>

            {/* Card Content */}
            <Typography>
              No annual fee, cash back rewards, and purchase protection.
            </Typography>

            {/* Card Rates */}
            <div>
              <Typography style={{ color: '#008747' }}>1.99% for balance transfers for the first 6 months</Typography>
              <Typography style={{ color: '#008747' }}>2% cash back at grocery stores</Typography>
              <Typography style={{ color: '#008747' }}>0.5% cash back on everything else</Typography>
              {/* Other items with no rate information */}
              <Typography>$0 annual fee</Typography>
              <Typography>20.99% purchase rate</Typography>
              <Typography>22.99% cash advance and balance transfer rate</Typography>
            </div>

            {/* Action Buttons */}
            <Button
                component={Link}
                to="/get-started"
                variant="contained"
                color="primary"
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Open Sans',
                }}
                >
                Get this card
                <IconButton
                    style={{
                    backgroundColor: '#008747',
                    borderRadius: '50%',
                    marginLeft: '8px', // Adjust as needed for spacing
                    }}
                >
                    <ArrowForwardIcon style={{ color: 'none solid rgb(53)' }} />
                </IconButton>
                </Button>


          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
