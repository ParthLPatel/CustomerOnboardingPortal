import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import the CheckCircle icon
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './VerticalStepper.css'
const steps = [
  {
    label: 'Credit card application submitted',
    description: 'Your credit card application has been completed',
  },
  {
    label: 'Credit card approved',
    description: 'Your credit card application has been approved. We have sent you a confirmation email, and soon we will be sending your credit card through the mail.',
  },
  {
    label: 'Credit card shipped',
    description: 'Your approved credit card has been shipped. You can track the shipment using the provided tracking ID.',
  },
  {
    label: 'Credit card out for delivery',
    description: 'Your credit card is currently out for delivery. Please ensure someone is available to receive the package.',
  },
  {
    label: 'Credit card delivered',
    description: 'Congratulations! Your credit card has been successfully delivered to the provided address.',
  },
];

// You can use the 'steps' array in your application as needed


// Customize the theme with a new primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#03BF66', // Replace with your desired color
    },
  },
});

export default function VerticalStepper() {
  const [activeStep, setActiveStep] = React.useState(1);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
                StepIconComponent={() => (
                  <CheckCircleIcon color={index <= activeStep ? 'primary' : 'disabled'}/>
                )}
              >
                {<span className='stepLabel'>{step.label}</span>}
              </StepLabel>
              <StepContent>
                <Typography>
                    <span className='stepLabel' style={{fontWeight: 500}}>{step.description}</span>
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {/* <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1, color: 'white', fontWeight:'600' }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0 || activeStep === 1}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div> */}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  );
}
