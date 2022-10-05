/*
식사 기록 페이지 > 해당 날짜의 식사 기록 통계
@author 여예원
@since 2022.10.05
*/

import * as React from "react";
import styled from "styled-components";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";
import { http } from "api/http";
import { useRecoilValue } from "recoil";
import { userState } from "states/userState";
import { useRef } from "react";
import { useEffect } from "react";

import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MealTypeModal from "components/modal/main/MealTypeModal";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import Chart from "react-apexcharts";
import { Start } from "@mui/icons-material";
export default function DailyMeal(props) {
  const userInfo = useRecoilValue(userState);

  // 달력에서 클릭한 날짜 가공 함수
  let date = new Date(props.clickDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const [clickDateMeal, setClickDateMeal] = useState([]); // 선택된 날짜 식사기록
  const [clickDateAnalysis, setClickDateAnalysis] = useState([]); //선택된 날짜 식사기록 분석

  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const [snack, setSnack] = useState(null);
  const [mealAmount, setMealAmount] = useState([0, 0, 0, 0]); // 각 식사별 칼로리

  const [score, setScore] = useState(""); // 플래닛 지수
  const [real, setReal] = useState([]); // 실제 섭취 영양성분
  const [rec, setRec] = useState([]); // 권장 섭취 영양성분

  const [mealTypeModalOpen, setMealTypeModalOpen] = useState(false); // 식사 상세 정보 모달
  const [mealType, setMealType] = useState(); // 클릭한 식사 타입 변수

  // 날짜 클릭시 해당 날짜 식사 기록 가져오는 함수
  async function getClickDayRecord() {
    const response = await http.get(
      `/intake-histories/${userInfo.userId}/${props.clickDate}`
    );
    let list = [0, 0, 0, 0];
    if (response.data.message == "success") {
      // 정보가 없는 경우 식사 기록을 비운다.
      if (response.data.data.length == 0) {
        setClickDateMeal([]);
        setBreakfast(null);
        setLunch(null);
        setDinner(null);
        setSnack(null);
      }
      // 정보가 있는 경우 아침, 점심, 저녁, 간식으로 데이터를 나눈다
      else {
        setClickDateMeal([]);
        setBreakfast(null);
        setLunch(null);
        setDinner(null);
        setSnack(null);
        setClickDateMeal(response.data.data);
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].mealType == "아침") {
            setBreakfast(response.data.data[i]);
            let breakfast = response.data.data[i].intakeFoodsList;
            for (let j = 0; j < breakfast.length; j++) {
              list[0] += breakfast[j].calorie * breakfast[j].amount;
            }
            list[0] = parseFloat(list[0]);
          } else if (response.data.data[i].mealType == "점심") {
            setLunch(response.data.data[i]);
            let lunch = response.data.data[i].intakeFoodsList;
            for (let j = 0; j < lunch.length; j++) {
              list[1] += lunch[j].calorie * lunch[j].amount;
            }
            list[1] = parseFloat(list[1]);
          } else if (response.data.data[i].mealType == "저녁") {
            setDinner(response.data.data[i]);
            let dinner = response.data.data[i].intakeFoodsList;
            for (let j = 0; j < dinner.length; j++) {
              list[2] += dinner[j].calorie * dinner[j].amount;
            }
            list[2] = parseFloat(list[2]);
          } else {
            setSnack(response.data.data[i]);
            let snack = response.data.data[i].intakeFoodsList;
            for (let j = 0; j < snack.length; j++) {
              list[3] += snack[j].calorie * snack[j].amount;
            }
            list[3] = parseFloat(list[3]);
          }
        }
        setMealAmount(list);
      }
    } else {
      setClickDateMeal([]);
      setBreakfast(null);
      setLunch(null);
      setDinner(null);
      setSnack(null);
      setMealAmount([0, 0, 0, 0]);
    }
  }

  // 날짜 클릭시 해당 날짜 식사 기록 분석 가져오는 함수
  async function getClickDayAnalysis() {
    const response = await http.get(`/analysis/${props.clickDate}`, {
      params: {
        userId: userInfo.userId,
      },
    });
    if (response.data.message == "success") {
      if (response.data.data.length != 0) {
        setClickDateAnalysis(response.data.data);
        setReal(response.data.data[0]);
        setRec(response.data.data[1]);
        setScore(response.data.data[0].analysisScore);
      } else {
        setClickDateAnalysis([]);
        setReal([]);
        setRec([]);
        setScore([]);
      }
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getClickDayRecord();
      getClickDayAnalysis();
    }
  }, [props.clickDate]);

  const mounted1 = useRef(false);
  useEffect(() => {
    if (!mounted1.current) {
      mounted1.current = true;
    } else {
      getClickDayRecord();
      getClickDayAnalysis();
    }
  }, []);

  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) {
      mounted2.current = true;
    } else {
      getClickDayRecord();
      getClickDayAnalysis();
    }
  }, [props.isChange]);

  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    & .MuiTooltip-tooltip {
      background: #969696;
    }
  `;

  // 탄단지 요약 차트
  function NutriChart() {
    const series = [
      {
        name: "탄수화물(g)",
        data: [real.carbohydrate, rec.carbohydrate],
      },
      {
        name: "단백질(g)",
        data: [real.protein, rec.protein],
      },
      {
        name: "지방(g)",
        data: [real.fat, rec.fat],
      },
    ];
    const options = {
      colors: ["#FFEFC9", "#FFB3B3", "#A9D5C7"],
      chart: {
        type: "bar",
        stacked: true,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#666666"],
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: ["실제 섭취량", "권장 섭취량"],
        labels: {
          formatter: function (val) {
            return val + "%";
          },
        },
        // x축 없애는 옵션
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " g";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 0,
      },
    };

    return (
      <div id="chart">
        <Chart options={options} series={series} type="bar" height={200} />
      </div>
    );
  }

  // 영양 상세정보 차트
  function NutriDetailChart(props) {
    const series = [
      {
        name: "실제 섭취량",
        data: [
          {
            x: "당(g)",
            y: parseFloat(props.real.sugar),
            goals: [
              {
                name: "권장 섭취량",
                value: 50,
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "식이섬유(g)",
            y: parseFloat(props.real.dietaryFiber),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.dietaryFiber),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "칼슘(mg)",
            y: parseFloat(props.real.calcium),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.calcium),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "철(mg)",
            y: parseFloat(props.real.iron),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.iron),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "아연(mg)",
            y: parseFloat(props.real.zinc),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.zinc),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "마그네슘(mg)",
            y: parseFloat(props.real.magnesium),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.magnesium),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "비타민C(mg)",
            y: parseFloat(props.real.vitaminC),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.vitaminC),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
          {
            x: "비타민D(mcg)",
            y: parseFloat(props.real.vitaminD),
            goals: [
              {
                name: "권장 섭취량",
                value: parseFloat(props.rec.vitaminD),
                strokeWidth: 5,
                strokeHeight: 17,
                strokeColor: "#959595",
              },
            ],
          },
        ],
      },
    ];

    const options = {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "70%", // 차트 bar의 높이
          dataLabels: {
            position: "center",
            maxItems: 100,
            hideOverflowingLabels: true,
          },
        },
      },
      colors: ["#9DA6F8"],
      dataLabels: {
        enabled: false,
      },
      dataLabels: {
        enabled: true,
        position: "bottom",
        textAnchor: "start",
        style: {
          colors: ["#666666"],
        },
        formatter: function (val, opt) {
          const goals =
            opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;

          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`;
          }
          return val;
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["실제 섭취량", "권장 섭취량"],
        markers: {
          fillColors: ["#E6E8FD", "#959595"],
        },
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
    };

    return (
      <div id="chart">
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
    );
  }

  return (
    <StyledWrapper>
      {/* 식사 정보 모달 */}
      {mealTypeModalOpen == true ? (
        <MealTypeModal
          mealTypeModalOpen={mealTypeModalOpen}
          setMealTypeModalOpen={setMealTypeModalOpen}
          mealType={mealType}
          year={year}
          month={month}
          day={day}
          breakfast={breakfast}
          lunch={lunch}
          dinner={dinner}
          snack={snack}
          close={() => setMealTypeModalOpen(false)}
          recIntakeAmount={props.recIntakeAmount}
        />
      ) : null}
      <Grid container id="container" direction="row" alignItems="center">
        {clickDateMeal.length == 0 ? (
          // 기록이 없는 경우
          <Grid item id="noRecord" xs={12}>
            {month}월 {day}일의 식사기록이 없어요😥
            <br />
            식사를 등록해주세요!
          </Grid>
        ) : (
          // 기록이 있는 경우
          <>
            {/* 플래닛 평가 */}
            <Grid
              container
              xs={12}
              alignItems="center"
              justifyContent="flex-start"
              sx={{ marginBottom: "30px" }}
            >
              <Grid
                container
                xs={12}
                id="title"
                justifyContent="flex-start"
                sx={{ marginBottom: "15px" }}
              >
                {month}월 {day}일 플래닛 평가
                <StyledTooltip
                  arrow
                  placement="right"
                  title={
                    <React.Fragment>
                      <Typography variant="subtitle2">
                        (* 총 칼로리, 탄수화물, 단백질, 지방, 당 기준)
                      </Typography>
                      <Typography variant="subtitle1">좋음</Typography>
                      <Typography variant="subtitle2">
                        : 권장섭취량의 +-30%를 만족
                      </Typography>
                      <Typography variant="subtitle1">보통</Typography>
                      <Typography variant="subtitle2">
                        : 권장섭취량의 +-60%를 만족
                      </Typography>
                      <Typography variant="subtitle1">나쁨</Typography>
                      <Typography variant="subtitle2">
                        : 권장섭취량의 +-60%를 벗어남
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon
                    fontSize="midium"
                    sx={{ color: "gray", marginLeft: "5px" }}
                  />
                </StyledTooltip>
              </Grid>
              {/* 플래닛 사진 */}
              <Grid
                item
                xs={5}
                sx={{ textAlign: "right", paddingRight: "20px" }}
              >
                {score == "나쁨" ? (
                  <img
                    src="assets/score/score_bad.png"
                    style={{ width: 80, height: 80 }}
                  />
                ) : null}
                {score == "좋음" ? (
                  <img
                    src="assets/score/score_good.png"
                    style={{ width: 80, height: 80 }}
                  />
                ) : null}
                {score == "보통" ? (
                  <img
                    src="assets/score/score_soso.png"
                    style={{ width: 80, height: 80 }}
                  />
                ) : null}
              </Grid>
              <Grid item xs={7} sx={{ background: "white" }}>
                <Grid
                  item
                  xs={12}
                  sx={{ marginBottom: "10px", textAlign: "left" }}
                >
                  {score == "나쁨" ? (
                    <>
                      플래닛 지수: &nbsp;
                      <b style={{ color: "#FF7070", fontSize: "20px" }}>나쁨</b>
                    </>
                  ) : null}
                  {score == "좋음" ? (
                    <>
                      플래닛 지수: &nbsp;
                      <b style={{ color: "#01CC8B", fontSize: "20px" }}>좋음</b>
                    </>
                  ) : null}
                  {score == "보통" ? (
                    <>
                      플래닛 지수: &nbsp;
                      <b style={{ color: "#F7BF87", fontSize: "20px" }}>보통</b>
                    </>
                  ) : null}
                </Grid>
                <Grid item xs={12} sx={{ fontSize: "18px", textAlign: "left" }}>
                  총 &nbsp;
                  <b style={{ color: "#f7bf87", fontSize: "20px" }}>
                    {real.calorie} kcal &nbsp;
                  </b>
                  를 섭취했어요!
                </Grid>
              </Grid>
            </Grid>
            {/* 섭취량 권고 */}
            <Grid container id="title" xs={12} sx={{ marginBottom: "20px" }}>
              섭취량 권고
              <StyledTooltip
                arrow
                placement="right"
                title={
                  <React.Fragment>
                    <Typography variant="subtitle2">
                      * 나트륨, 트랜스지방, 콜레스테롤을 권장섭취량보다 많이
                      먹은 경우, 섭취량 권고가 나타납니다.
                    </Typography>
                  </React.Fragment>
                }
              >
                <PriorityHighIcon
                  fontSize="midium"
                  sx={{ color: "red", marginLeft: "5px" }}
                />
              </StyledTooltip>
            </Grid>

            <Grid item xs={12} sx={{ margin: "20px" }}>
              {real.sodium - rec.sodium > 0 ? (
                <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                  나트륨을 &nbsp;
                  <b style={{ color: "#f7bf87", fontSize: "20px" }}>
                    {parseFloat((real.sodium - rec.sodium).toFixed(1))}mg
                  </b>
                  &nbsp; 더 섭취했어요
                </Grid>
              ) : null}
              {real.transFattyAcid - rec.transFattyAcid > 0 ? (
                <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                  트랜스지방산을&nbsp;
                  <b style={{ color: "#f7bf87", fontSize: "20px" }}>
                    {parseFloat(
                      (real.transFatty_acid - rec.transFattyAcid).toFixed(1)
                    )}
                    g
                  </b>
                  &nbsp;더 섭취했어요
                </Grid>
              ) : null}
              {real.cholesterol - rec.cholesterol > 0 ? (
                <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                  콜레스테롤을&nbsp;
                  <b style={{ color: "#f7bf87", fontSize: "20px" }}>
                    {parseFloat(
                      (real.transFatty_acid - rec.transFattyAcid).toFixed(1)
                    )}
                    g
                  </b>
                  &nbsp; 더 섭취했어요
                </Grid>
              ) : null}
              {real.transFattyAcid - rec.transFattyAcid <= 0 &&
              real.sodium - rec.sodium <= 0 &&
              real.cholesterol - rec.cholesterol <= 0 ? (
                <Grid item xs={12} sx={{ marginBottom: "15px" }}>
                  나트륨, 콜레스테롤, 트랜스지방산을 적정량 섭취했어요 :)
                </Grid>
              ) : null}
            </Grid>
            {/* 식사요약 */}
            <Grid container xs={12} sx={{ marginBottom: "20px" }}>
              <Grid item id="title" xs={12}>
                식사 요약
              </Grid>
              <Grid item xs={12}>
                <List
                  sx={{
                    width: "100%",
                  }}
                >
                  <Divider />
                  {/* 아침 */}
                  {breakfast != null ? (
                    <>
                      <ListItemButton
                        onClick={() => {
                          setMealType("아침");
                          setMealTypeModalOpen(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {mealAmount[0]}
                            <br />
                            kcal
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          id="mealList"
                          primary="아침"
                          secondary={breakfast.intakeFoodsList.map(function (
                            item,
                            i
                          ) {
                            if (
                              i == 0 &&
                              breakfast.intakeFoodsList.length == 1
                            ) {
                              return item.name;
                            } else if (
                              i ==
                              breakfast.intakeFoodsList.length - 1
                            ) {
                              return item.name;
                            } else {
                              return item.name + ", ";
                            }
                          })}
                        />
                      </ListItemButton>
                      <Divider />
                    </>
                  ) : null}
                  {/* 점심 */}
                  {lunch != null ? (
                    <>
                      <ListItemButton
                        onClick={() => {
                          setMealType("점심");
                          setMealTypeModalOpen(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {mealAmount[1]}
                            <br />
                            kcal
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          id="mealList"
                          primary="점심"
                          secondary={lunch.intakeFoodsList.map(function (
                            item,
                            i
                          ) {
                            if (i == 0 && lunch.intakeFoodsList.length == 1) {
                              return item.name;
                            } else if (i == lunch.intakeFoodsList.length - 1) {
                              return item.name;
                            } else {
                              return item.name + ", ";
                            }
                          })}
                        />
                      </ListItemButton>
                      <Divider />
                    </>
                  ) : null}
                  {/* 저녁 */}
                  {dinner != null ? (
                    <>
                      <ListItemButton
                        onClick={() => {
                          setMealType("저녁");
                          setMealTypeModalOpen(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {mealAmount[2]}
                            <br />
                            kcal
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          id="mealList"
                          primary="저녁"
                          secondary={dinner.intakeFoodsList.map(function (
                            item,
                            i
                          ) {
                            if (i == 0 && dinner.intakeFoodsList.length == 1) {
                              return item.name;
                            } else if (i == dinner.intakeFoodsList.length - 1) {
                              return item.name;
                            } else {
                              return item.name + ", ";
                            }
                          })}
                        />
                      </ListItemButton>
                      <Divider />
                    </>
                  ) : null}
                  {/* 간식 */}
                  {snack != null ? (
                    <>
                      <ListItemButton
                        onClick={() => {
                          setMealType("간식");
                          setMealTypeModalOpen(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                              fontSize: "15px",
                              textAlign: "center",
                            }}
                          >
                            {mealAmount[3]}
                            <br />
                            kcal
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          id="mealList"
                          primary="간식"
                          secondary={snack.intakeFoodsList.map(function (
                            item,
                            i
                          ) {
                            if (i == 0 && snack.intakeFoodsList.length == 1) {
                              return item.name;
                            } else if (i == snack.intakeFoodsList.length - 1) {
                              return item.name;
                            } else {
                              return item.name + ", ";
                            }
                          })}
                        />
                      </ListItemButton>
                    </>
                  ) : null}
                  <Divider />
                </List>
              </Grid>
            </Grid>
            {/* 탄단지 요약 */}
            <Grid container xs={12} sx={{ marginBottom: "10px" }}>
              <Grid item id="title" xs={12}>
                탄단지 요약
              </Grid>
              <Grid item id="title" xs={12}>
                <NutriChart />
              </Grid>
            </Grid>
            {/* 영양 상세정보 */}
            <Grid container xs={12}>
              <Grid item id="title" xs={12}>
                영양 상세정보
              </Grid>
              <Grid item id="title" xs={12}>
                <NutriDetailChart rec={rec} real={real} />
              </Grid>
            </Grid>
          </>
        )}
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
    margin-bottom: 2vw;
    height: 55vh;
    overflow: auto;
    scrollbar-width: thin;
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

  #noRecord {
    color: #9da6f8;
    font-size: 20px;
  }

  #title {
    color: black;
    font-weight: bold;
    text-align: left;
    font-size: 18px;
  }

  #mealList {
    margin-left: 10px;
  }
`;
