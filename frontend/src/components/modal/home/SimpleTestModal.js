/*
간단 설문 모달 // 폐기
@author 전상현
@since 2022.09.19
*/

import React from "react";
import "./SimpleTestModal.css";
import { Box, Stepper, Step, StepLabel, Button, Typography, StepContent, Paper } from '@mui/material';

const SimpleTestModal = (props) => {
  const { open, close } = props;

  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={open ? 'openModal modal': 'modal'}>
      {open ? (
        <section>

          <main>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    끝
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    { activeStep === steps.length-3 
                      ? <p>1단계</p>
                      : ( activeStep === steps.length-2
                          ? <p>2단계</p>
                          : <p>3단계</p>
                        )
                    
                    } 
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </main>
          
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>

        </section>
      ) : null}
    </div>
  )
}
export default SimpleTestModal;