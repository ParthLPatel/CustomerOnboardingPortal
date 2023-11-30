import React from 'react';
import { Container, Typography } from '@mui/material';
import visaInfiniteImage from '../../assets/Visa_Infinite_EN.png';
import visaPlatinum from '../../assets/Visa_Platinum_EN.png';
import banner from '../../assets/unsplashbanner1.jpg';
import { Link } from 'react-router-dom';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="container-landing-page">
      {/* Banner */}
      <div className="banner">
        <Typography variant="h5" className="banner-heading"
        style={{
          fontFamily:'sans-serif',
          fontSize: '3rem',
          fontWeight: '500',
          lineHeight:'1.5',
          
        }}>Credit Cards</Typography>
        <Typography variant="subtitle1" className="banner-subheading"
        style={{
          fontFamily:'sans-serif',
          fontSize: '1.1em',
          fontWeight: '300',
          lineHeight:'1.5',
          marginTop: '2.4em',
          
        }}>Get cashback rewards on every purchase</Typography>
        <img src={banner} alt="Credit Card Banner"/>
      </div>

      <Container
        style={{
          // border: '5px solid orange',
          padding: "0 4em",
        }}>
        <Typography  align="center" gutterBottom
          style={
            {
              fontWeight:"400",
              fontSize: "1.6rem",
              lineHeight:'1.5',
              marginTop: "2em",
              marginBottom: "1em",
            }}
          >
          Find the right cash back credit card for you
        </Typography>
        <Typography paragraph
          style={
            {
              fontFamily:'sans-serif',
              fontSize: '0.9rem',
              lineHeight: '1.4rem',
              textAlign: 'justify',
            }}
          >
          Skip the bank machine, quickly pay at stores, and breeze through online checkouts with your Manulife MONEY+™ Visa* Card.
          Both of our cards provide convenience, security, and valuable rewards on every purchase. Plus, you can use your smartphone,
          smartwatch, or tablet to make purchases with your card through Apple Pay®, Google Pay™, Samsung Pay, Fitbit Pay™, and Garmin Pay™.
        </Typography>
        <Typography paragraph
          style={
            {
              fontFamily:'sans-serif',
              fontSize: '0.9rem',
              lineHeight: '1.4rem',
              textAlign: 'justify'   
            }}
        >
          There’s only one thing left to decide: which card is right for you?
        </Typography>

        {/* Cards Container */}
        <div className="cards-container">
          {/* ManulifeMONEY+ Visa Infinite Card */}
          <div className="card"
            style={{
              backgroundColor: '#fff',
            }}
          >
            {/* Card Image and Title */}
            <img src={visaInfiniteImage} alt={"Manulife Visa Platinum Card"} />
            <Typography variant="h5"
              style={
                {
                  color: 'black',
                  fontWeight: '500',
                  marginBottom: '1em',
                  fontSize: '1.4rem',
                  textAlign:'center',
                }
              }
            >ManulifeMONEY+ Visa Infinite</Typography>

            {/* Card Content */}
            <Typography
              style={{
                textAlign:'center',
                fontWeight: '500',
                margin:'0.1em 0',
                fontFamily:'sans-serif',
                fontSize: '0.9rem',
                lineHeight: '1.4rem',
              }}
            >
              Travel benefits, exclusive perks, and accelerated cash back rewards.
            </Typography>

            {/* Card Rates */}  
            <div>
            <Typography style={{ textAlign: 'center', marginTop:'1.4em', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600, color: '#09874E', fontSize:'1.4rem'}}>1.99%</span> <br />
                <span style={{fontSize:'0.9rem', fontWeight:'600'}}>for balance transfers</span> <br />
                <span style={{fontSize:'0.9rem'}}>for the first 6 months</span> <br />
              </Typography>
              
              <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>3%</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>cash back at grocery stores</span>
              </Typography>

              <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>2%</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>cash back on travel</span>
              </Typography>

              <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>1%</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>cash back on everything else</span>
              </Typography>

              <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>$139 annual fee</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>waived for the first year</span>
              </Typography>

              <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>20.99%</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>purchase rate</span>
              </Typography>

              <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>22.99%</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>cash advance and balance transfer rate</span>
              </Typography>

            </div>

            {/* Action Buttons */}
            <Link to="/get-started" className="text-decoration-none" 
              style={{
                display: 'flex',
                borderTop: '1px solid lightgray',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
                <ArrowCircleRightRoundedIcon style={{
                  color:'#ED6453',
                  marginTop: '0.6em',
                  marginRight: '0.2em',
                }}/>
                <span style={{
                  fontWeight:"400",
                  fontSize: "0.9rem",
                  lineHeight:'1.5',
                  marginTop: "2em",
                  marginBottom: "1em",
                  color:'#ED6453',
                }}>APPLY NOW</span>
            </Link>
          </div>

          {/* ManulifeMONEY+ Visa Platinum Card */}
          <div className="card" 
               style={{
                  backgroundColor: '#fff',
               }}
               >
            {/* Card Image and Title */}
            <img src={visaPlatinum} alt="Manulife Visa Platinum Card" />
            <Typography variant="h5"
              style={
                {
                  
                  color: 'black',
                  fontWeight: '500',
                  marginBottom: '1em',
                  fontSize: '1.4rem',
                  textAlign:'center',
                }
              }
            >ManulifeMONEY+ Visa Platinum</Typography>

            {/* Card Content */}
            <Typography
              style={{
                textAlign:'center',
                fontWeight: '500',
                margin:'0.1em 0',
                fontFamily:'sans-serif',
                fontSize: '0.9rem',
                lineHeight: '1.4rem',
              }}
            >
              No annual fee, cash back rewards, and purchase protection.
            </Typography>

            {/* Card Rates */}
            <div>
            <Typography style={{ textAlign: 'center', marginTop:'1.4em', marginBottom:'1.4em', fontWeight: '500',
              fontFamily:'sans-serif',
              lineHeight: '1.4rem',}}>
              <span style={{fontWeight:600, color: '#09874E', fontSize:'1.4rem'}}>1.99%</span> <br />
              <span style={{fontSize:'0.9rem', fontWeight:'600'}}>for balance transfers</span> <br />
              <span style={{fontSize:'0.9rem'}}>for the first 6 months</span> <br />
            </Typography>

            <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
              fontFamily:'sans-serif',
              lineHeight: '1.4rem',}}>
              <span style={{fontWeight:600}}>2%</span>
              <br />
              <span style={{fontSize:'0.9rem'}}>cash back at grocery stores</span>
            </Typography>

            <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
                fontFamily:'sans-serif',
                lineHeight: '1.4rem',}}
                >
                <span style={{fontWeight:600}}>0.5%</span>
                <br />
                <span style={{fontSize:'0.9rem'}}>cash back on travel</span>
              </Typography>

            <Typography style={{textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
              fontFamily:'sans-serif',
              lineHeight: '1.4rem',}}>
              <span style={{fontWeight:600}}>0.5%</span>
              <br />
              <span style={{fontSize:'0.9rem'}}>cash back on everything else</span>
            </Typography>

            {/* Other items with no rate information */}
            <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
              fontFamily:'sans-serif',
              lineHeight: '1.4rem',}}>
              <span style={{fontWeight:600}}>$0 annual fee</span>
              <br />
                <span style={{fontSize:'0.9rem', visibility:'hidden'}}>waived for the first year</span>
            </Typography>

            <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
              fontFamily:'sans-serif',
              lineHeight: '1.4rem',}}>
              <span style={{fontWeight:600}}>20.99%</span>
              <br />
              <span style={{fontSize:'0.9rem'}}>purchase rate</span>
            </Typography>

            <Typography style={{ textAlign: 'center', marginBottom:'1.4em', fontWeight: '500',
              fontFamily:'sans-serif',
              lineHeight: '1.4rem',}}>
              <span style={{fontWeight:600}}>22.99%</span>
              <br />
              <span style={{fontSize:'0.9rem'}}>cash advance and balance transfer rate</span>
            </Typography>
          </div>

            {/* Action Buttons */}
            <Link to="###" className="text-decoration-none" 
              style={{
                display: 'flex',
                borderTop: '1px solid lightgray',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
                <ArrowCircleRightRoundedIcon style={{
                  color:'#ED6453',
                  marginTop: '0.6em',
                  marginRight: '0.2em',
                }}/>
                <span style={{
                  fontWeight:"400",
                  fontSize: "0.9rem",
                  lineHeight:'1.5',
                  marginTop: "2em",
                  marginBottom: "1em",
                  color:'#ED6453',
                }}>APPLY NOW</span>
            </Link>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
