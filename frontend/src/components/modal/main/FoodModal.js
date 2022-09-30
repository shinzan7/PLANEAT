/*
내 음식 추가 모달
@author 여예원
@since 2022.09.28
*/

import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Grid,
  Dialog,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import BtnMain from "components/common/BtnMain";
import { http } from "api/http";

export default function FoodModal(props) {
  //todo: foodUser에 로그인한 유저 아이디로 변경 필요
  const myFood = {
    foodUser: 10, // 유저 아이디
    name: "", // 음식이름
    calorie: 0, // 1인분당 칼로리
    serving_size: 0, //1회 제공량
    serving_unit: "g", //내용량 단위 g, mL
    carbohydrate: 0, //탄수화물
    fat: 0, // 지방
    protein: 0, // 단백질
    cholesterol: 0, //콜레스테롤
    sodium: 0, // 나트륨
    potassium: 0, //칼륨
    dietary_fiber: 0, // 총 식이섬유
    sugar: 0, // 총 당류
    vitaminA: 0,
    vitaminC: 0,
    calcium: 0, // 칼슘
    iron: 0, //철
  };

  const [fullWidth, setFullWidth] = useState(true);
  const [foodInfo, setFoodInfo] = useState(myFood);
  // const [showMoreFoodModal, setShowMoreFoodModal] = useState(false);

  // 모달창 업데이트시, foodInfo 비우기
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setFoodInfo(myFood);
      props.setShowMoreFoodModal(false);
    }
  }, []);

  // 내 음식에 추가함수
  async function registMyFood() {
    console.log("regist");
    setFoodInfo(myFood);

    if (foodInfo.name == "") {
      alert("음식 이름을 입력해주세요");
    } else {
      //todo: 로그인한 유저 아이디로 변경 필요
      const response = await http.post(`/food-infos/10`, {
        foodUser: 10, // 유저 아이디
        name: foodInfo.name, // 음식이름
        calorie: foodInfo.calorie, // 1인분당 칼로리
        servingSize: foodInfo.serving_size, //1회 제공량
        servingUnit: foodInfo.serving_unit, //내용량 단위 g, mL
        carbohydrate: foodInfo.carbohydrate, //탄수화물
        fat: foodInfo.fat, // 지방
        protein: foodInfo.protein, // 단백질
        cholesterol: foodInfo.cholesterol, //콜레스테롤
        sodium: foodInfo.sodium, // 나트륨
        potassium: foodInfo.potassium, //칼륨
        dietary_fiber: foodInfo.dietary_fiber, // 총 식이섬유
        sugar: foodInfo.sugar, // 총 당류
        vitaminA: foodInfo.vitaminA,
        vitaminC: foodInfo.vitaminC,
        calcium: foodInfo.calcium, // 칼슘
        iron: foodInfo.iron, //철
      });

      //todo: 모달 css 변경하기
      if (response.data.message == "success") {
        alert("성공");
        props.close();
        setFoodInfo(myFood);
        props.setIsChange(true); // 내음식 새로 추가하기 위한 변수
      } else {
        alert("입력 값을 확인해주세요.");
        setFoodInfo(myFood);
      }
    }
  }

  // 1회 제공량 단위 설정 함수
  const [unit, setUnit] = useState("g");
  const unitChange = (e) => {
    setUnit(e.target.value);
    let copy = { ...foodInfo };
    copy.serving_unit = e.target.value;
    setFoodInfo(copy);
  };

  return (
    <Dialog
      style={{ zIndex: 1800 }}
      keepMounted
      fullWidth={fullWidth}
      maxWidth="xs"
      open={props.open}
      onClose={props.close}
    >
      <Grid
        container
        direction="row"
        style={{ padding: "2vw", fontSize: "16px" }}
        alignItems="center"
      >
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            items
            xs={7}
            style={{
              padding: "2vw",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            내 음식 추가
          </Grid>
          <Grid items xs={5}>
            <BtnMain
              width="90%"
              onClick={() => {
                registMyFood();
              }}
            >
              새 음식 등록
            </BtnMain>
          </Grid>
        </Grid>
        {/* 음식이름 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid items xs={11}>
            <TextField
              fullWidth
              size="small"
              placeholder="음식이름을 입력하세요"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.name = e.target.value;
                setFoodInfo(copy);
              }}
              value={foodInfo.name}
            />
          </Grid>
        </Grid>
        {/* 분량 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={6} style={{ textAlign: "center" }}>
            분량
          </Grid>
          <Grid items xs={4}>
            <FormControl>
              <RadioGroup
                row
                value={foodInfo.serving_unit}
                onChange={unitChange}
              >
                <FormControlLabel
                  value="g"
                  control={<Radio size="small" />}
                  label="g"
                />
                <FormControlLabel
                  value="mL"
                  control={<Radio size="small" />}
                  label="mL"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {/* 1회 제공량 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            1회 제공량
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.serving_size = Number(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.serving_size}
            />
          </Grid>
        </Grid>
        {/* 1인분당 칼로리 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            칼로리
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.calorie = parseFloat(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.calorie}
            />
            kcal
          </Grid>
        </Grid>
        {/* 탄수화물 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            탄수화물
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.carbohydrate = parseFloat(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.carbohydrate}
            />
            g
          </Grid>
        </Grid>
        {/* 지방*/}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            지방
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.fat = parseFloat(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.fat}
            />
            g
          </Grid>
        </Grid>
        {/* 단백질 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            단백질
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.protein = parseFloat(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.protein}
            />
            g
          </Grid>
        </Grid>
        {/* 콜레스테롤 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            콜레스테롤
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.cholesterol = parseFloat(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.cholesterol}
            />{" "}
            mg
          </Grid>
        </Grid>
        {/* 나트륨 */}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid items xs={4} style={{ textAlign: "center" }}>
            나트륨
          </Grid>
          <Grid items xs={3}>
            <TextField
              style={{ width: "60%", textAlign: "center" }}
              size="small"
              variant="standard"
              onChange={(e) => {
                let copy = { ...foodInfo };
                copy.sodium = parseFloat(e.target.value);
                setFoodInfo(copy);
              }}
              value={foodInfo.sodium}
            />
            mg
          </Grid>
        </Grid>
        {/* 추가 정보 */}
        {props.showMoreFoodModal == true ? (
          <>
            {/*칼륨*/}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "2vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                칼륨
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.potassium = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.potassium}
                />
                mg
              </Grid>
            </Grid>
            {/* 총식이섬유 */}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "2vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                총 식이섬유
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.dietary_fiber = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.dietary_fiber}
                />
                g
              </Grid>
            </Grid>
            {/* 총 당류 */}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "2vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                총 당류
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.sugar = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.sugar}
                />
                g
              </Grid>
            </Grid>
            {/* 비타민A */}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "2vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                비타민A
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.vitaminA = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.vitaminA}
                />
                μg
              </Grid>
            </Grid>
            {/* 비타민C */}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "2vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                비타민C
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.vitaminC = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.vitaminC}
                />
                mg
              </Grid>
            </Grid>
            {/* 칼슘 */}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "2vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                칼슘
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.calcium = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.calcium}
                />
                mg
              </Grid>
            </Grid>
            {/* 철 */}
            <Grid
              container
              xs={12}
              style={{ marginBottom: "3vw" }}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid items xs={4} style={{ textAlign: "center" }}>
                철
              </Grid>
              <Grid items xs={3}>
                <TextField
                  style={{
                    width: "60%",
                    textAlign: "center",
                  }}
                  size="small"
                  variant="standard"
                  onChange={(e) => {
                    let copy = { ...foodInfo };
                    copy.iron = parseFloat(e.target.value);
                    setFoodInfo(copy);
                  }}
                  value={foodInfo.iron}
                />
                mg
              </Grid>
            </Grid>
            {/* 새 음식 등록 버튼 */}
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              style={{ marginTop: "2vw" }}
            >
              <Grid items xs={4}>
                <BtnMain
                  width="90%"
                  onClick={() => {
                    registMyFood();
                  }}
                >
                  새 음식 등록
                </BtnMain>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            xs={12}
            style={{ marginTop: "2vw" }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid items xs={5}>
              <BtnMain
                width="90%"
                onClick={() => {
                  props.setShowMoreFoodModal(true);
                }}
              >
                영양 정보 추가하기
              </BtnMain>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
}
