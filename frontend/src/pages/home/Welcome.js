/*
로그인 후 추가정보 기입 페이지
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";

import styled from "styled-components";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import TermsOfService from "pages/home/TermsOfService";
import MoreInfoForm from "pages/home/MoreInfoForm";
import UserTagForm from "pages/home/UserTagForm";

import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import BtnMain from "components/common/BtnMain";

const steps = ["이용약관 동의", "개인정보 입력", "건강고민 선택"];

const userInfo = {
  name: "김싸피",
};

// 가입축하문구
function CelebrateLine() {
  const Line = styled.div`
    margin-top: 3px;
    text-align: center;
  `;
  return (
    <div>
      <Line>{userInfo.name} 님의 가입을 축하합니다!</Line>
      <Line>더 나은 서비스 이용을 위해 약관동의 및 추가 정보를 기입해주세요.😊</Line>
    </div>
  );
}

// stepper 단계별 화면
function getStepContent(step) {
  switch (step) {
    case 0:
      return <TermsOfService />;
    case 1:
      return <MoreInfoForm />;
    case 2:
      return <UserTagForm />;
    default:
      throw new Error("Unknown step");
  }
}

// const theme = createTheme({
//   typography: {
//     fontFamily: "'Nanum Gothic', sans-serif",
//   },
//   palette: {
//     purple: {
//       main: "#9DA6F8",
//     },
//     orange: {
//       main: "#F7BF87",
//     },
//   },
// });

function Welcome() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    // 약관동의 화면일 때 동의 체크 되어있으면 다음 스텝으로 이동, 체크 안되어있으면 alert
    if (activeStep == 0) {
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const goMain = () => {
    console.log("메인페이지(식사기록페이지) 이동");
  };

  const BeforeButton = styled(Button)`
    &:hover {
      background-color: #a9a9a9;
    }
    &:focus {
      background-color: green;
    }
  `;
  return (
    <div>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="md" sx={{ mb: 4, marginTop: "80px" }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <CelebrateLine></CelebrateLine>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "purple.main", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                    color: "purple.main", // Just text label (COMPLETED)
                  },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "purple.main", // circle color (ACTIVE)
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                    color: "purple.main", // Just text label (ACTIVE)
                  },
                  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                    fill: "purple.main", // circle's number (ACTIVE)
                  },
                }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h7" gutterBottom>
                  플랜잇에 오신 것을 환영합니다!
                  <br />
                  이제 플랜잇을 마음껏 이용하실 수 있습니다.😀
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="contained" onClick={goMain} sx={{ mt: 3, ml: 1 }}>
                    PLANEAT 가기
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <BtnMain
                      onClick={handleBack}
                      sx={{
                        "&:hover": {
                          color: "purple.main",
                        },
                        mt: 3,
                        ml: 1,
                      }}
                    >
                      이전
                    </BtnMain>
                  )}

                  <BtnMain
                    width="120px"
                    onClick={handleNext}
                    sx={{
                      "&:hover": {
                        color: "purple.main",
                      },
                      mt: 3,
                      ml: 1,
                    }}
                  >
                    {activeStep === steps.length - 1 ? "완료" : "다음"}
                  </BtnMain>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Welcome;
