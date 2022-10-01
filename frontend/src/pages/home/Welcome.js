/*
로그인 후 추가정보 기입 페이지
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";
import { useEffect } from "react";

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
import { Link, Navigate, useNavigate } from "react-router-dom";

import TermsOfService from "pages/home/TermsOfService";
import MoreInfoForm from "pages/home/MoreInfoForm";
import UserTagForm from "pages/home/UserTagForm";

import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import BtnMain from "components/common/BtnMain";
import TagMain from "components/common/TagMain";

import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { http } from "api/http";

const steps = ["이용약관 동의", "개인정보 입력", "건강고민 선택"];

// const name = localStorage.getItem("name");

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

// 모달 transition 적용
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Welcome() {
  const [activeStep, setActiveStep] = useState(0);

  // 약관동의 컴포넌트 체크 여부
  const [checked, setChecked] = useState(false);
  // 약관동의 alert 모달
  const [openDialogTOS, setOpenDialogTOS] = useState(false);

  // 추가정보 기입
  const [gender, setGender] = useState("M"); // 성별
  const [age, setAge] = useState(""); // 나이
  const [height, setHeight] = useState(""); // 키
  const [weight, setWeight] = useState(""); // 몸무게
  const [active, setActive] = useState("notactive"); // 활동량
  const [bmi, setBMI] = useState(0); // bmi
  const [recoIntake, setRecoIntake] = useState(0.0); // 권장섭취량
  const [activeAmount, setActiveAmount] = useState(0.0); // 기준별 활동지수
  const [birthyear, setBirthYear] = useState(0); // 출생년도
  const [carbo, setCarbo] = useState(0); // 탄수화물 권장섭취량
  const [protein, setProtein] = useState(0); // 단백질 권장섭취량
  const [fat, setFat] = useState(0); // 지방 권장섭취량

  // 유저 건강고민 카테고리
  const [userCategory, setUserCategory] = useState([]);

  // 플래닛가기 모달
  const [openDialogGoMain, setOpenDialogGoMain] = useState(false);

  // 추가정보 설정
  function changeMoreInfo() {
    // BMI 설정
    let calc = weight / (height * 0.01 * height * 0.01);
    setBMI(calc.toFixed(1));

    // 남자일 때, 활동량 설정
    if (gender === "M") {
      if (active === "notactive") {
        setActiveAmount(1.0);
      } else if (active === "lessactive") {
        setActiveAmount(1.11);
      } else if (active === "active") {
        setActiveAmount(1.25);
      } else if (active === "veryactive") {
        setActiveAmount(1.48);
      }
    }
    // 여자일 때, 활동량 설정
    else if (gender === "F") {
      if (active === "notactive") {
        setActiveAmount(1.0);
      } else if (active === "lessactive") {
        setActiveAmount(1.12);
      } else if (active === "active") {
        setActiveAmount(1.27);
      } else if (active === "veryactive") {
        setActiveAmount(1.45);
      }
    }

    // 출생년도 설정
    let birth = new Date().getFullYear() - age + 1;
    setBirthYear(birth);
  }

  // 권장섭취량 설정
  function changeRecoIntake() {
    // 남자일 때
    if (gender === "M") {
      let score =
        622 -
        9.53 * parseFloat(age) +
        parseFloat(activeAmount) * (15.91 * parseFloat(weight) + 539.6 * parseFloat(height) * 0.01);
      setRecoIntake(score.toFixed(1));
    }
    // 여자일 때
    else if (gender === "F") {
      let score =
        354 -
        6.91 * parseFloat(age) +
        parseFloat(activeAmount) * (9.36 * parseFloat(weight) + 726 * parseFloat(height) * 0.01);
      setRecoIntake(score.toFixed(1));
    }
  }

  // 탄단지 권장섭취량 설정
  function changeCarbProFat() {
    let carboAmount = recoIntake * 0.6;
    let proteinAmount = recoIntake * 0.13;
    let fatAmount = recoIntake * 0.22;
    setCarbo(carboAmount.toFixed(1));
    setProtein(proteinAmount.toFixed(1));
    setFat(fatAmount.toFixed(1));
  }

  useEffect(() => {
    // 추가기입 정보 갱신
    changeMoreInfo();
    changeRecoIntake();
    changeCarbProFat();
  });

  async function handleNext() {
    // 약관동의 화면
    if (activeStep == 0) {
      // 약관동의 체크 되어있으면 다음 스텝으로 이동, 체크 안되어있으면 alert
      if (checked) {
        setActiveStep(activeStep + 1);
      } else {
        setOpenDialogTOS(true);
      }
    }
    // 추가정보 기입 화면
    else if (activeStep == 1) {
      // 나이, 키, 몸무게 값을 기입하지 않았을 때
      if (!age || !height || !weight) {
        alert("모든 정보를 기입해주세요!");
      } else {
        // 유저의 추가정보 등록 -> 유저아이디 변경 필요!!!!!!!!!!
        const response = await http.post(`/user-infos/8`, {
          userId: 8,
          birthyear: birthyear,
          gender: gender,
          recInfo: {
            updateDate: getToday(),
            height: height,
            weight: weight,
            bmi: bmi,
            active: activeAmount,
            calorie: recoIntake,
            carbohydrate: carbo,
            protein: protein,
            fat: fat,
          },
          categoriesList: [],
        });

        if (response.data.message === "success") {
          setActiveStep(activeStep + 1);
        }
      }
    } else if (activeStep == 2) {
      // 선택한 건강고민이 없을 시 alert 띄우기
      if (userCategory.length == 0) {
        alert("최소 1개를 선택해주세요!");
      } else {
        // 건강고민 포함한 추가정보 등록 -> 유저아이디 변경 필요!!!!!!!!!!
        const response = await http.post(`/user-infos/8`, {
          userId: 8,
          birthyear: birthyear,
          gender: gender,
          recInfo: {
            updateDate: getToday(),
            height: height,
            weight: weight,
            bmi: bmi,
            active: activeAmount,
            calorie: recoIntake,
            carbohydrate: carbo,
            protein: protein,
            fat: fat,
          },
          categoriesList: userCategory,
        });

        if (response.data.message === "success") {
          // setActiveStep(activeStep + 1);
          setOpenDialogGoMain(true);
        }
      }
    }
  }

  // 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  // 모달 닫기
  const handleClose = () => {
    setOpenDialogTOS(false);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // 플랜잇 시작하기
  const navigate = useNavigate();
  const goMain = () => {
    navigate(`/main`);
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
  `;

  return (
    <div>
      <CssBaseline />

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
              <React.Fragment></React.Fragment>
            ) : (
              <React.Fragment>
                {/* {getStepContent(activeStep)} */}
                {activeStep == 0 && (
                  <TermsOfService setChecked={setChecked} checked={checked}></TermsOfService>
                )}
                {activeStep == 1 && (
                  <MoreInfoForm
                    setGender={setGender}
                    setAge={setAge}
                    age={age}
                    setHeight={setHeight}
                    height={height}
                    setWeight={setWeight}
                    weight={weight}
                    setActive={setActive}
                  ></MoreInfoForm>
                )}
                {activeStep == 2 && (
                  <UserTagForm
                    userCategory={userCategory}
                    setUserCategory={setUserCategory}
                  ></UserTagForm>
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* 이전버튼 */}
                  {activeStep !== 0 && (
                    <BtnMain
                      width="100px"
                      onClick={handleBack}
                      sx={{
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
                      width="100px"
                      onClick={handleNext}
                      sx={{
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
                      width="100px"
                      onClick={handleNext}
                      sx={{
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
                      width="100px"
                      onClick={handleNext}
                      sx={{
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
      {/* 약관동의 모달 */}
      <Dialog
        open={openDialogTOS}
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
        <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <BtnMain onClick={handleClose} width="100px" autoFocus>
            확인
          </BtnMain>
        </DialogActions>
      </Dialog>

      {/* 플래닛 가기 모달 */}
      <Dialog
        open={openDialogGoMain}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid Container sx={{ justifyContent: "center" }}>
          <Grid items sx={{ textAlign: "center" }} xs={12} md={12} lg={12}>
            <img
              style={{
                marginTop: "50px",
                textAlign: "center",
              }}
              src="assets/planet.png"
            ></img>
          </Grid>
          <Grid items xs={12} md={12} lg={12}>
            <div
              style={{
                margin: "20px 20px 0px 20px",
                color: "#747373",
                fontSize: "20px",
                // fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1.7",
              }}
            >
              PLANEAT의 회원이 되신 것을 환영합니다. 😀
              <br />
              쉽고 간편하게 영양관리를 시작해보세요!
            </div>
          </Grid>

          <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <BtnMain
              width="200px"
              onClick={goMain}
              autoFocus
              sx={{
                mt: 3,
                ml: 1,
              }}
            >
              <StyledLink to="/main">PLANEAT 시작하기</StyledLink>
            </BtnMain>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}

export default Welcome;
