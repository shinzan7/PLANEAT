/*
식사 요약 정보에서 해당 식사 상세 내용 보여주는 모달
@author 여예원
@since 2022.10.05
*/

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
// recoil 사용
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";

import {
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function MealTypeModal(props) {
  const [fullWidth, setFullWidth] = useState(true);

  const [totalCalorie, setTotalCalorie] = useState(0);
  const [meal, setMeal] = useState({
    intakeFoodsList: [],
  });
  const [clickFood, setClickFood] = useState([]);
  const [intakeAmount, setIntakeAmount] = useState([0, 0, 0, 0, 0]);

  // 음식 클릭 함수
  function clickOneFood(index) {
    let food = meal.intakeFoodsList[index];

    setClickFood(food);
    // 탄, 단, 지, 당, 나 함량 변경
    let nutri = [0, 0, 0, 0, 0];
    nutri[0] = food.carbohydrate;
    nutri[1] = food.protein;
    nutri[2] = food.fat;
    nutri[3] = food.sugar;
    nutri[4] = food.sodium;

    setIntakeAmount(nutri);
  }

  // 식사 클릭 함수
  function myDietClick() {
    let mealList = meal.intakeFoodsList;
    let myDietIntakes = [0, 0, 0, 0, 0];
    let food = { name: props.mealType };
    setClickFood(food);

    for (let i = 0; i < mealList.length; i++) {
      myDietIntakes[0] = myDietIntakes[0] + mealList[i].carbohydrate;
      myDietIntakes[1] = myDietIntakes[1] + mealList[i].protein;
      myDietIntakes[2] = myDietIntakes[2] + mealList[i].fat;
      myDietIntakes[3] = myDietIntakes[3] + mealList[i].sugar;
      myDietIntakes[4] = myDietIntakes[4] + mealList[i].sodium;
    }

    console.log(myDietIntakes);
    setIntakeAmount(myDietIntakes);
  }

  function getTotalCalorie() {
    let amount = 0;

    if (props.mealType == "아침") {
      setMeal(props.breakfast);
      for (let i = 0; i < props.breakfast.intakeFoodsList.length; i++) {
        amount += props.breakfast.intakeFoodsList[i].calorie;
      }
    } else if (props.mealType == "점심") {
      setMeal(props.lunch);
      for (let i = 0; i < props.lunch.intakeFoodsList.length; i++) {
        amount += props.lunch.intakeFoodsList[i].calorie;
      }
    } else if (props.mealType == "저녁") {
      setMeal(props.dinner);
      for (let i = 0; i < props.dinner.intakeFoodsList.length; i++) {
        amount += props.dinner.intakeFoodsList[i].calorie;
      }
    } else {
      setMeal(props.snack);
      for (let i = 0; i < props.snack.intakeFoodsList.length; i++) {
        amount += props.snack.intakeFoodsList[i].calorie;
      }
    }

    setTotalCalorie(amount);
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getTotalCalorie();
    }
  }, []);

  let month = props.month;
  if (month < 10) {
    month = "0" + props.month;
  }
  let day = props.day;
  if (day < 10) {
    day = "0" + props.day;
  }
  let curDate = props.year + "-" + month + "-" + day;

  // 식단 영양정보 (탄,단,지,당,나) 차트
  function DietInfoChart() {
    let series = [];
    if (
      typeof intakeAmount[0] == "number" &&
      typeof intakeAmount[1] == "number" &&
      typeof intakeAmount[2] == "number" &&
      typeof intakeAmount[3] == "number" &&
      typeof intakeAmount[4] == "number"
    ) {
      series = [
        {
          data: [
            (
              (intakeAmount[0] / props.recIntakeAmount.carbohydrate) *
              100
            ).toFixed(1),
            ((intakeAmount[1] / props.recIntakeAmount.protein) * 100).toFixed(
              1
            ),
            ((intakeAmount[2] / props.recIntakeAmount.fat) * 100).toFixed(1),
            ((intakeAmount[3] / 50) * 100).toFixed(1),
            (
              (intakeAmount[4] /
                props.recIntakeAmount.nutritionsList[17].intake_rec) *
              100
            ).toFixed(1),
          ], // 음식의 (영양분/권장)*100
        },
      ];
    } else {
      series = [
        {
          data: [
            (intakeAmount[0] / props.recIntakeAmount.carbohydrate) * 100,
            (intakeAmount[1] / props.recIntakeAmount.protein) * 100,
            (intakeAmount[2] / props.recIntakeAmount.fat) * 100,
            (intakeAmount[3] / 50) * 100,
            (intakeAmount[4] /
              props.recIntakeAmount.nutritionsList[17].intake_rec) *
              100,
          ], // 음식의 (영양분/권장)*100
        },
      ];
    }

    const options = {
      colors: ["#FFEFC9", "#FFB3B3", "#A9D5C7", "#9DA6F8", "#E6E8FD"],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          distributed: true, // 막대바 마다 색 바꿔 주기 위해서 사용하는 옵션
          borderRadius: 4,
          horizontal: true,
          barHeight: "50%",
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#666666"],
        },
        formatter: function (val, opt) {
          return intakeAmount[opt.dataPointIndex] + " (" + val + "%" + ")";
        },
        offsetX: -10,
      },
      xaxis: {
        categories: [
          "탄수화물(g)",
          "단백질(g)",
          "지방(g)",
          "당류(g)",
          "나트륨(mg)",
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      legend: {
        show: false,
      },
    };

    return (
      <div className="app">
        <div id="chart">
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      </div>
    );
  }

  return (
    <Dialog
      style={{ zIndex: 1700 }}
      keepMounted
      fullWidth={fullWidth}
      maxWidth="md"
      open={props.mealTypeModalOpen}
      onClose={props.close}
      id="container"
    >
      {/* 모달 타이틀 */}
      <Grid
        container
        direction="row"
        style={{
          padding: "2vw",
          fontSize: "20px",
          color: "#9DA6F8",
          fontWeight: "bold",
        }}
        alignItems="center"
      >
        <Grid item xs={11}>
          {props.month}월 {props.day}일 {props.mealType}{" "}
          {props.mealType == "간식" ? null : "식사"}
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "right" }}>
          {/* 모달 닫기 버튼 */}
          <IconButton
            onClick={() => {
              props.close();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      {/* 음식 선택 영역 */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {/* 음식 선택 영역: 왼쪽 */}
        <Grid item xs={6}>
          <StyledWrapper>
            <Grid container xs={12} id="container">
              <List
                sx={{ width: "100%" }}
                subheader={
                  <ListItemButton
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => {
                      myDietClick();
                    }}
                  >
                    총 칼로리 {totalCalorie} kcal
                  </ListItemButton>
                }
              >
                {meal.intakeFoodsList.map(function (food, i) {
                  return (
                    <ListItemButton key={i} onClick={() => clickOneFood(i)}>
                      <ListItemText
                        primary={food.name}
                        secondary={`${food.calorie}kcal, ${food.servingSize}${food.servingUnit}, (1회 제공량)`}
                        id={i}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Grid>
          </StyledWrapper>
        </Grid>
        {/* 음식 선택 영역: 오른쪽 */}
        <Grid item xs={6}>
          <StyledWrapper>
            <Grid
              xs={12}
              container
              id="container"
              justifyContent="center"
              alignItems="center"
            >
              <Grid container xs={12}>
                {clickFood.length == 0 ? (
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    id="noClickedFood"
                  >
                    <Grid item sx={{ marginBottom: "15px" }}>
                      <img src="assets/planet.png" id="planet" />
                    </Grid>
                    음식을 클릭하면 영양성분을 확인할 수 있어요
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <ListItemText primary={clickFood.name} />
                    </Grid>
                    <Grid item xs={12}>
                      <DietInfoChart />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ color: "#666666", fontSize: "12px" }}
                    >
                      * (%)하루 권장섭취량에 대한 비율
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </StyledWrapper>
        </Grid>
      </Grid>
    </Dialog>
  );
}

const StyledWrapper = styled.div`
  && #container {
    background-color: white;
    margin: 1vw;
    border: 2px solid #e6e8fd;
    border-radius: 15px;
    width: 90%;
    height: 350px;
    overflow: auto;
    scrollbar-width: thin;
    padding: 2vw;
  }
  && #container::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 100px;
  }

  /* 스크롤바 뒷 배경 */
  && #container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 100px;
  }

  /* 스크롤바 막대 */
  && #container::-webkit-scrollbar-thumb {
    background-color: #bababa;
    border-radius: 100px;
  }

  && #noClickedFood {
    font-weight: bold;
    text-align: center;
  }

  && #planet:hover {
    transform: scale(1.1);
  }
`;
