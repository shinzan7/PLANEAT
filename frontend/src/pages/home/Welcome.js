/*
로그인 후 추가정보 기입 페이지
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";

import styled from "styled-components";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import TermsOfService from "pages/home/TermsOfService";
import MoreInfoForm from "pages/home/MoreInfoForm";
import UserTagForm from "pages/home/UserTagForm";

import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import BtnMain from "components/common/BtnMain";
import TagMain from "components/common/TagMain";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
      return <TermsOfService></TermsOfService>; // 이용약관 화면
    case 1:
      return <MoreInfoForm />; // 추가정보 기입 화면
    case 2:
      return <UserTagForm />; // 건강고민 선택 화면
    default:
      throw new Error("Unknown step");
  }
}

function Welcome() {
  const [activeStep, setActiveStep] = useState(0);

  // 약관동의 컴포넌트 체크 여부
  const [checked, setChecked] = useState(false);

  // 약관동의 alert 모달
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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

  const StyledLink = styled(Link)`
    text-decoration: none;

    color: white;

    &:hover {
      color: #9da6f8;
    }
  `;

  return (
    <div>
      <CssBaseline />
      <Header />

      <Container component="main" maxWidth="md" sx={{ mb: 4, marginTop: "100px" }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <CelebrateLine></CelebrateLine>
          {/* Stepper */}
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
            {/* 완료버튼을 누른 후 마지막 */}
            {activeStep === steps.length ? (
              <React.Fragment>
                <div
                  style={{
                    marginTop: "50px",
                    color: "#a9a9a9",
                    fontSize: "30px",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  PLANEAT에 오신 것을 환영합니다!
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "40px",
                    color: "#a9a9a9",
                    fontSize: "30px",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  이제 PLANEAT을 마음껏 이용하실 수 있습니다.😀
                </div>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <BtnMain
                    width="200px"
                    onClick={goMain}
                    sx={{
                      mt: 3,
                      ml: 1,
                      "&:hover": {
                        color: "purple.main",
                      },
                    }}
                  >
                    <StyledLink to="/main">PLANEAT 가기</StyledLink>
                  </BtnMain>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* {getStepContent(activeStep)} */}
                {activeStep == 0 && (
                  <TermsOfService setChecked={setChecked} checked={checked}></TermsOfService>
                )}
                {activeStep == 1 && <MoreInfoForm></MoreInfoForm>}
                {activeStep == 2 && <UserTagForm></UserTagForm>}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* 이전버튼 */}
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
                  {/* 약관동의 컴포넌트의 다음 버튼 */}
                  {activeStep === 0 && (
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
                      다음
                    </BtnMain>
                  )}

                  {/* 추가정보 기입 컴포넌트의 다음 버튼 */}
                  {activeStep === 1 && (
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
                      다음
                    </BtnMain>
                  )}

                  {/* 건강고민선택 컴포넌트의 완료 버튼 */}
                  {activeStep === steps.length - 1 && (
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
                      완료
                    </BtnMain>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
      <Footer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }} id="alert-dialog-description">
            <img
              src="assets/planeat_logo_top.png"
              width="150"
              style={{ marginBottom: "15px" }}
            ></img>
            <br />
            이용약관에 동의해 주세요.😉 <br />
            이용약관에 동의하지 않으면 서비스를 이용하실 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BtnMain onClick={handleClose} autoFocus>
            확인
          </BtnMain>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Welcome;
