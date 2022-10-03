/*
식사 기록 등록 컴포넌트
@author 여예원
@since 2022.09.22
*/

import * as React from "react";
import { IconButton, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BtnCircle from "components/common/BtnCircle";
import styled from "styled-components";
import { useState } from "react";
import MealModal from "components/modal/main/MealModal";
import NutrientModal from "components/modal/main/NutrientModal";

export default function RegistMeal(props) {
  let date = new Date(props.clickDate); // 달력에서 클릭된 날짜
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const [mealModalOpen, setMealModalOpen] = useState(false); // 식사 등록 모달
  const [nutrientModalOpen, setNutrientModalOpen] = useState(false); // 영양제 등록 모달 관리 변수
  const [mealType, setMealType] = useState("아침"); // 모달 상단 타이틀(아,점,저,간,영) 관리 변수

  return (
    <StyledWrapper>
      {/* 영양제 추가 모달  */}
      {nutrientModalOpen == true ? (
        <NutrientModal
          open={nutrientModalOpen}
          close={() => setNutrientModalOpen(false)}
          year={year}
          month={month}
          day={day}
          mealType={mealType}
        />
      ) : null}
      {/* 식사 추가 모달 */}
      {mealModalOpen == true ? (
        <MealModal
          mealModalOpen={mealModalOpen}
          setMealModalOpen={setMealModalOpen}
          year={year}
          month={month}
          day={day}
          mealType={mealType}
          close={() => setMealModalOpen(false)}
        />
      ) : null}
      <Grid container id="container" xs={12} direction="row">
        <Grid container id="mealDate" xs={12}>
          {" "}
          {month}월 {day}일 식사 등록하기
        </Grid>
        <Grid
          container
          id="btnGroup"
          xs={12}
          zeroMinWidth
          direction="row"
          justifyContent="space-evenly"
        >
          <BtnCircle
            type="아침"
            amount={props.breakfastAmount}
            setMealModalOpen={setMealModalOpen}
            setMealType={setMealType}
          ></BtnCircle>
          <BtnCircle
            type="점심"
            amount={props.lunchAmount}
            setMealModalOpen={setMealModalOpen}
            setMealType={setMealType}
          ></BtnCircle>
          <BtnCircle
            type="저녁"
            amount={props.dinnerAmount}
            setMealModalOpen={setMealModalOpen}
            setMealType={setMealType}
          ></BtnCircle>
          <BtnCircle
            type="간식"
            amount={props.snackAmount}
            setMealModalOpen={setMealModalOpen}
            setMealType={setMealType}
          ></BtnCircle>
          <BtnCircle
            type="영양제"
            setNutrientModalOpen={setNutrientModalOpen}
            setMealType={setMealType}
          ></BtnCircle>
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #container {
    background-color: white;
    box-shadow: 1px 2px 5px #c7c7c7;
    padding: 2vw;
    border-radius: 15px;
    width: 90%;
    margin: auto;
    margin-top: 2vw;
  }

  #mealDate {
    text-align: left !important;
    margin-left: 5px;
    color: black;
    font-weight: bold;
  }

  #btnGroup {
    margin-top: 3vw;
  }
`;
