/*
마이페이지 > 회원 정보 수정
@author 조혜안
@since 2022.09.27
*/
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import BtnMain from "components/common/BtnMain";

import { http } from "api/http";

import { userState } from "states/userState";
import { userRecIntake } from "states/userRecIntake";
import { useRecoilState } from "recoil";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [userRecIntakeInfo, setUserRecIntakeInfo] = useRecoilState(userRecIntake);

  const [name, setName] = useState(userInfo.name);
  const [gender, setGender] = useState(userInfo.gender); // 성별
  const [age, setAge] = useState(userInfo.age); // 나이
  const [height, setHeight] = useState(userInfo.height); // 키
  const [weight, setWeight] = useState(userInfo.weight); // 몸무게
  const [active, setActive] = useState(""); // 활동량
  const [bmi, setBMI] = useState(userInfo.bmi); // bmi
  const [recoIntake, setRecoIntake] = useState(userRecIntakeInfo.kcal); // 권장섭취량
  const [activeAmount, setActiveAmount] = useState(userInfo.active); // 기준별 활동지수
  const [birthyear, setBirthYear] = useState(userInfo.birthYear); // 출생년도
  const [carbo, setCarbo] = useState(userRecIntakeInfo.carbohydrate); // 탄수화물 권장섭취량
  const [protein, setProtein] = useState(userRecIntakeInfo.protein); // 단백질 권장섭취량
  const [fat, setFat] = useState(userRecIntakeInfo.fat); // 지방 권장섭취량

  // 수정 완료 모달
  const [open, setOpen] = useState(false);

  // 이름
  const handleName = (event) => {
    setName(event.target.value);
  };
  // 성별
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  // 나이
  const handleAge = (event) => {
    setAge(event.target.value);
  };
  // 키
  const handleHeight = (event) => {
    setHeight(event.target.value);
  };
  // 몸무게
  const handleWeight = (event) => {
    setWeight(event.target.value);
  };
  // 활동량
  const handleActive = (event) => {
    setActive(event.target.value);
  };

  // 유저 건강고민 카테고리 (userId와 카테고리id를 포함한 api연동에 쓰일 데이터)
  const [userCategory, setUserCategory] = useState(userInfo.categories);
  // 유저 건강고민 카테고리 (카테고리id와 카테고리name을 포함한 전역상태에 넣어둘 데이터)
  const [categories, setCategories] = useState([]);

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

  // 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  useEffect(() => {
    // 정보 갱신
    changeMoreInfo();
    changeRecoIntake();
    changeCarbProFat();
  });

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  async function updateUserInfo() {
    // 건강고민 카테고리 변경
    let output = localStorage.getItem("categories");
    let list = JSON.parse(output);
    let arr = [];
    console.log(list);
    for (let i = 0; i < list.length; i++) {
      arr.push({
        userId: userInfo.userId,
        userCategoryInfoId: list[i].categoryId,
      });
    }
    setUserCategory(list);

    // console.log(userCategory);

    // 정보 수정 api 연동
    const response = await http.put(`user-infos/${userInfo.userId}`, {
      userId: userInfo.userId,
      birthyear: birthyear,
      gender: gender,
      name: name,
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
      categoriesList: arr,
    });

    // console.log(response.data);

    if (response.data.message === "success") {
      localStorage.setItem("name", name);
      localStorage.setItem("birthYear", birthyear);
      localStorage.setItem("gender", gender);
      localStorage.setItem("age", age);
      localStorage.setItem("height", height);
      localStorage.setItem("weight", weight);
      localStorage.setItem("active", activeAmount);
      localStorage.setItem("bmi", bmi);

      localStorage.setItem("recoIntake", Number(recoIntake));
      localStorage.setItem("carbo", Number(carbo));
      localStorage.setItem("protein", Number(protein));
      localStorage.setItem("fat", Number(fat));

      // 유저정보 전역상태 수정
      setUserInfo((user) => {
        const copyUser = { ...user };
        copyUser.name = name;
        copyUser.age = age;
        copyUser.birthYear = birthyear;
        copyUser.gender = gender;
        copyUser.height = height;
        copyUser.weight = weight;
        copyUser.active = activeAmount;
        copyUser.bmi = bmi;
        return { ...copyUser };
      });

      // 유저 권장섭취량 정보 전역상태 수정
      setUserRecIntakeInfo((userRI) => {
        const copyUserRI = { ...userRI };
        copyUserRI.kcal = Number(recoIntake);
        copyUserRI.carbohydrate = Number(carbo);
        copyUserRI.protein = Number(protein);
        copyUserRI.fat = Number(fat);
        return { ...copyUserRI };
      });

      // 수정완료 모달 열기
      setOpen(true);
    }
  }

  // useEffect(() => {
  //   // 유저 정보 불러오기
  //   const response = http.get(``);
  // }, []);

  // 숫자만 입력받게 하는 validation
  const validationNumber = (val) => {
    let check = /^[0-9]+$/;
    // 숫자면 true, 그 외는 false 반환
    return !val || check.test(val);
  };

  // 이름 validation
  const validationName = (val) => {
    let check = /^[가-힣]+$/;
    return !val || check.test(val);
  };

  return (
    <Container component="main" sx={{ mb: 4, width: "650px", height: "700px" }}>
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          회원정보 수정
        </Typography>
        <Typography variant="subtitle">
          회원 정보를 수정하고, BMI 및 권장섭취량을 확인할 수 있습니다!
        </Typography>
        {/* 이름 */}
        <Grid
          container
          sx={{ mt: 3, mb: 2 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={3}>
            이름
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="userName"
              autoComplete="cc-exp"
              variant="standard"
              color="purple"
              defaultValue={userInfo.name}
              onChange={handleName}
              error={!validationName(name)}
              helperText={!validationName(name) ? "이름은 한글 2글자~5글자로 만들어주세요!" : ""}
            />
          </Grid>
        </Grid>

        {/* 이메일 */}
        {/* <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            이메일
          </Grid>
          <Grid item xs={9}>
            <TextField
              disabled
              fullWidth
              id="userEmail"
              autoComplete="cc-exp"
              variant="standard"
              color="purple"
            />
          </Grid>
        </Grid> */}

        {/* 성별 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <div style={{ marginTop: "8px" }}>성별</div>
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={userInfo.gender}
                name="radio-buttons-group"
                onChange={handleGender}
              >
                <FormControlLabel
                  value="M"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="남"
                />
                <FormControlLabel
                  value="F"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="여"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* 나이 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            나이
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="userAge"
              required
              autoComplete="cc-number"
              variant="standard"
              color="purple"
              defaultValue={userInfo.age}
              onChange={handleAge}
            />
          </Grid>
        </Grid>

        {/* 키 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            키
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="userHeight"
              autoComplete="cc-exp"
              variant="standard"
              color="purple"
              required
              defaultValue={userInfo.height}
              onChange={handleHeight}
            />
          </Grid>
        </Grid>

        {/* 몸무게 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            몸무게
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="userWeight"
              autoComplete="cc-csc"
              variant="standard"
              required
              color="purple"
              defaultValue={userInfo.weight}
              onChange={handleWeight}
            />
          </Grid>
        </Grid>

        {/* 활동량 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <div style={{ marginTop: "8px" }}>활동량</div>
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={
                  userInfo.active == "1.0"
                    ? "notactive"
                    : userInfo.active == "1.11" || userInfo.active == "1.12"
                    ? "lessactive"
                    : userInfo.active == "1.25" || userInfo.active == "1.27"
                    ? "active"
                    : "veryactive"
                }
                name="radio-buttons-group"
                onChange={handleActive}
              >
                <FormControlLabel
                  value="notactive"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="비활동적"
                />
                <FormControlLabel
                  value="lessactive"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="저활동적"
                />
                <FormControlLabel
                  value="active"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="활동적"
                />
                <FormControlLabel
                  value="veryactive"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="매우 활동적"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* BMI */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs>
            <b>{userInfo.name}</b>님의 현재 BMI지수는{" "}
            <b style={{ color: "orange" }}>{userInfo.bmi}</b>
            입니다.
          </Grid>
        </Grid>

        {/* 권장섭취량 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs>
            <b>{userInfo.name}</b>님의 현재 권장섭취량은{" "}
            <b style={{ color: "orange" }}>{userRecIntakeInfo.kcal}kcal</b>
            입니다.
          </Grid>
        </Grid>

        {/* BMI */}
        {/* <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            BMI
          </Grid>
          <Grid item xs={9}>
            <TextField
              disabled
              id="userBMI"
              autoComplete="cc-name"
              variant="standard"
              value={userInfo.bmi}
            />
          </Grid>
        </Grid> */}

        {/* 권장섭취량 */}
        {/* <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            권장섭취량
          </Grid>
          <Grid item xs={9}>
            <TextField
              disabled
              id="userRecoIntake"
              autoComplete="cc-name"
              variant="standard"
              value={userRecIntakeInfo.kcal}
            />
            kcal
          </Grid>
        </Grid> */}

        <Grid style={{ mt: 6, textAlign: "end" }}>
          <BtnMain width="100px" onClick={updateUserInfo}>
            수정하기
          </BtnMain>
        </Grid>
      </React.Fragment>
      {/* 수정 완료 모달 */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }} id="alert-dialog-description">
            <img src="assets/planet.png" style={{ marginBottom: "5px" }}></img>
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
              회원정보가 정상적으로 수정되었습니다! 😀
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <BtnMain onClick={handleClose} width="100px" autoFocus>
            확인
          </BtnMain>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
