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

export default function DailyMeal(props) {
  const userInfo = useRecoilValue(userState);

  // 달력에서 클릭한 날짜 가공 함수
  let date = new Date(props.clickDate);
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const [clickDateMeal, setClickDateMeal] = useState([]); // 선택된 날짜 식사기록
  const [clickDateAnalysis, setClickDateAnalysis] = useState([]); //선택된 날짜 식사기록 분석

  const [breakfast, setBreakfast] = useState(null);
  const [lunch, setLunch] = useState(null);
  const [dinner, setDinner] = useState(null);
  const [snack, setSnack] = useState(null);

  const [score, setScore] = useState(""); // 플래닛 지수
  const [real, setReal] = useState([]); // 실제 섭취 영양성분
  const [rec, setRec] = useState([]); // 권장 섭취 영양성분

  // 날짜 클릭시 해당 날짜 식사 기록 가져오는 함수
  async function getClickDayRecord() {
    const response = await http.get(
      `/intake-histories/${userInfo.userId}/${props.clickDate}`
    );
    if (response.data.message == "success") {
      // 정보가 없는 경우 식사 기록을 비운다.
      if (response.data.data.length == 0) {
        setClickDateMeal([]);
      }
      // 정보가 있는 경우 아침, 점심, 저녁, 간식으로 데이터를 나눈다
      else {
        setClickDateMeal(response.data.data);
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].mealType == "아침") {
            setBreakfast(response.data.data[i]);
          } else if (response.data.data[i].mealType == "점심") {
            setLunch(response.data.data[i]);
          } else if (response.data.data[i].mealType == "저녁") {
            setDinner(response.data.data[i]);
          } else {
            setSnack(response.data.data[i]);
          }
        }
      }
    } else {
      setClickDateMeal([]);
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
        setClickDateMeal([]);
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

  // todo: data를 아,점,저,간 으로 분류하기

  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    & .MuiTooltip-tooltip {
      background: #969696;
    }
  `;

  return (
    <StyledWrapper>
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
              sx={{ marginBottom: "10px" }}
            >
              <Grid
                container
                xs={12}
                id="title"
                justifyContent="flex-start"
                sx={{ marginBottom: "10px" }}
              >
                {JSON.stringify(breakfast)}
                {JSON.stringify(lunch)}
                {JSON.stringify(dinner)}
                {JSON.stringify(snack)}
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
              <Grid item xs={3}>
                {score == "나쁨" ? (
                  <img
                    src="assets/score/score_bad.png"
                    style={{ width: 70, height: 70 }}
                  />
                ) : null}
                {score == "좋음" ? (
                  <img
                    src="assets/score/score_good.png"
                    style={{ width: 70, height: 70 }}
                  />
                ) : null}
                {score == "보통" ? (
                  <img
                    src="assets/score/score_soso.png"
                    style={{ width: 70, height: 70 }}
                  />
                ) : null}
              </Grid>
              <Grid item xs={9} sx={{ background: "white" }}>
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                  {score == "나쁨" ? `플래닛 지수: 나쁨` : null}
                  {score == "좋음" ? `플래닛 지수: 좋음` : null}
                  {score == "보통" ? `플래닛 지수: 보통` : null}
                </Grid>
                <Grid item xs={12} sx={{ fontSize: "18px" }}>
                  총 &nbsp;
                  <b style={{ color: "#f7bf87", fontSize: "20px" }}>
                    {real.calorie} kcal &nbsp;
                  </b>
                  를 섭취했어요!
                </Grid>
              </Grid>
            </Grid>
            {/* 섭취량 권고 */}
            <Grid container xs={12} sx={{ marginBottom: "10px" }}>
              <Grid item id="title" xs={12}>
                섭취량 권고
              </Grid>
              <Grid item xs={12}>
                섭취량 권고 내용
              </Grid>
            </Grid>
            {/* 식사요약 */}
            <Grid container xs={12} sx={{ marginBottom: "10px" }}>
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
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                            }}
                          >
                            아침
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
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                            }}
                          >
                            점심
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
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                            }}
                          >
                            저녁
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
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: "#9DA6F8",
                            }}
                          >
                            간식
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
            <Grid
              container
              xs={12}
              sx={{ background: "skyblue", marginBottom: "10px" }}
            >
              <Grid item id="title" xs={12}>
                식사 요약
              </Grid>
              <Grid item id="title" xs={12}>
                현재 섭취량, 권장 섭취량 차트
              </Grid>
            </Grid>
            {/* 영양 상세정보 */}
            <Grid container xs={12} sx={{ background: "purple" }}>
              <Grid item id="title" xs={12}>
                영양 상세정보
              </Grid>
              <Grid item id="title" xs={12}>
                각 영양소별 차트
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
