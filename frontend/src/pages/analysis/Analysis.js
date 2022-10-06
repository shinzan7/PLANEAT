/*
내 영양분석 페이지
@author 조혜안
@since 2022.09.22
*/
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Grid, Container } from "@mui/material";

import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import TimelineStat from "./TimelineStat";
import WeightStat from "./WeightStat";
import FoodStat from "./FoodStat";
import PlaneatStat from "./PlaneatStat";
import FeedbackStat from "./FeedbackStat";
import NutrientStat from "./NutrientStat";

import { http } from "api/http";
import { userState } from "states/userState";
import { useRecoilState, useRecoilValue } from "recoil";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
function getDateStr(myDate) {
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();

  month = month < 10 ? "0" + String(month) : month;
  day = day < 10 ? "0" + String(day) : day;

  return year + "-" + month + "-" + day;
}
// 오늘로부터 beforedate 전 날짜 반환
function lastDay(beforedate) {
  var d = new Date();
  var dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - beforedate);
  return getDateStr(d);
}
// 오늘로부터 1개월 전 날짜 반환
function lastMonth() {
  var d = new Date();
  var monthOfYear = d.getMonth();
  d.setMonth(monthOfYear - 1);
  return getDateStr(d);
}

function Analysis() {
  // userState 유저정보
  const userInfo = useRecoilValue(userState);

  // 분석기록 (실제)
  const [analysisData, setAnalysisData] = useState([]);
  // 분석기록 (권장)
  const [recoData, setRecoData] = useState([]);
  // 분석기록 비율평균
  const [percentData, setPercentData] = useState([]);
  // 플래닛지수
  const [score, setScore] = useState([]);
  const [scoreBad, setScoreBad] = useState("");
  const [scoreGood, setScoreGood] = useState("");
  const [scoreSoso, setScoreSoso] = useState("");

  // 총칼로리, 탄단지 칼로리 배열
  const [calArr, setCalArr] = useState([]);
  const [allCal, setAllCal] = useState(0.0);

  // 0일 때 최근 7일, 1일 때 최근 30일, 2일 때 전체 기간
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getAnalysisData();
      getPercentData();
      getNutrientStat();
      getTimelineData();
    }
  }, [value]);

  // 타임라인 음식리스트 5개
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [list4, setList4] = useState([]);
  const [list5, setList5] = useState([]);

  async function getTimelineData() {
    const response1 = await http.get(
      `intake-histories/${userInfo.userId}/${lastDay(0)}`
    );
    console.log("이거야이거", response1.data.data);
    let arr1 = [...response1.data.data];
    let total1 = [];
    for (let i = 0; i < arr1.length; i++) {
      let foods1 = [...arr1[i].intakeFoodsList];
      for (let j = 0; j < foods1.length; j++) {
        total1.push(foods1[j].name);
      }
    }
    setList1(total1);

    const response2 = await http.get(
      `intake-histories/${userInfo.userId}/${lastDay(1)}`
    );
    console.log("이거야이거", response2.data.data);
    let arr2 = [...response2.data.data];
    let total2 = [];
    for (let i = 0; i < arr2.length; i++) {
      let foods2 = [...arr2[i].intakeFoodsList];
      for (let j = 0; j < foods2.length; j++) {
        total2.push(foods2[j].name);
      }
    }
    setList2(total2);

    const response3 = await http.get(
      `intake-histories/${userInfo.userId}/${lastDay(2)}`
    );
    console.log("이거야이거", response3.data.data);
    let arr3 = [...response3.data.data];
    let total3 = [];
    for (let i = 0; i < arr3.length; i++) {
      let foods3 = [...arr3[i].intakeFoodsList];
      for (let j = 0; j < foods3.length; j++) {
        total3.push(foods3[j].name);
      }
    }
    setList3(total3);

    const response4 = await http.get(
      `intake-histories/${userInfo.userId}/${lastDay(3)}`
    );
    console.log("이거야이거", response4.data.data);
    let arr4 = [...response4.data.data];
    let total4 = [];
    for (let i = 0; i < arr4.length; i++) {
      let foods4 = [...arr4[i].intakeFoodsList];
      for (let j = 0; j < foods4.length; j++) {
        total4.push(foods4[j].name);
      }
    }
    setList4(total4);

    const response5 = await http.get(
      `intake-histories/${userInfo.userId}/${lastDay(4)}`
    );
    console.log("이거야이거", response5.data.data);
    let arr5 = [...response5.data.data];
    let total5 = [];
    for (let i = 0; i < arr5.length; i++) {
      let foods5 = [...arr5[i].intakeFoodsList];
      for (let j = 0; j < foods5.length; j++) {
        total4.push(foods5[j].name);
      }
    }
    setList5(total5);

    // console.log(total1);
    // console.log(total2);
    // console.log(total3);
    // console.log(total4);
    // console.log(total5);
  }

  async function getAnalysisData() {
    // 분석기록 받아오기
    let getData = [];
    let getReco = [];
    if (value == 0) {
      // 최근 7일
      const response1 = await http.get(`analysis`, {
        params: {
          date: lastWeek(),
          userId: userInfo.userId,
        },
      });
      console.log(response1.data.data);

      for (let i = 0; i < response1.data.data.length; i++) {
        if (response1.data.data[i].analysisType == 0) {
          getData.push(response1.data.data[i]);
        } else if (response1.data.data[i].analysisType == 1) {
          getReco.push(response1.data.data[i]);
        }
      }
      setAnalysisData(getData);
      setRecoData(getReco);
      console.log("데이터1", getData);
    } else if (value == 1) {
      // 최근 30일
      const response2 = await http.get(`analysis`, {
        params: {
          date: lastMonth(),
          userId: userInfo.userId,
        },
      });
      console.log(response2.data.data);

      for (let i = 0; i < response2.data.data.length; i++) {
        if (response2.data.data[i].analysisType == 0) {
          getData.push(response2.data.data[i]);
        } else if (response2.data.data[i].analysisType == 1) {
          getReco.push(response2.data.data[i]);
        }
      }
      setAnalysisData(getData);
      setRecoData(getReco);
      console.log("데이터2", getData);
    } else if (value == 2) {
      // 전체 기간
      const response3 = await http.get(`analysis/all`, {
        params: {
          userId: userInfo.userId,
        },
      });
      console.log(response3.data.data);

      for (let i = 0; i < response3.data.data.length; i++) {
        if (response3.data.data[i].analysisType == 0) {
          getData.push(response3.data.data[i]);
        } else if (response3.data.data[i].analysisType == 1) {
          getReco.push(response3.data.data[i]);
        }
      }
      setAnalysisData(getData);
      setRecoData(getReco);
      console.log("데이터3", getData);
    }

    let carboCal = 0;
    let proteinCal = 0;
    let fatCal = 0;
    let allCal = 0;
    let arr = [];
    for (let i = 0; i < getData.length; i++) {
      carboCal += getData[i].carbohydrate;
      proteinCal += getData[i].protein;
      fatCal += getData[i].fat;
      allCal += getData[i].calorie;
    }
    arr.push(Number((carboCal * 4).toFixed(1)));
    arr.push(Number((proteinCal * 4).toFixed(1)));
    arr.push(Number((fatCal * 9).toFixed(1)));
    setCalArr(arr);
    setAllCal((allCal / getData.length).toFixed(1));
    console.log("didididididididi");
    console.log(arr);
    console.log(allCal);
  }

  async function getPercentData() {
    // 분석기록 평균비율 받아오기
    if (value == 0) {
      // 최근 7일
      const response1 = await http.get(`analysis/percent`, {
        params: {
          date: lastWeek(),
          userId: userInfo.userId,
        },
      });
      console.log(response1.data.data);

      // 영양소 비율 설정
      setPercentData(response1.data.data);

      // 플래닛지수 state 설정
      let arr2 = [];
      let bad = response1.data.data.badCount;
      let good = response1.data.data.goodCount;
      let soso = response1.data.data.normalCount;

      // console.log(bad);
      // console.log(good);
      // console.log(soso);

      let perBad = Math.round((100 * bad) / (bad + good + soso));
      if (isNaN(perBad)) {
        perBad = 0;
      }
      let perGood = Math.round((100 * good) / (bad + good + soso));
      if (isNaN(perGood)) {
        perGood = 0;
      }
      let perSoso = Math.round((100 * soso) / (bad + good + soso));
      if (isNaN(perSoso)) {
        perSoso = 0;
      }
      // console.log("분석에서", JSON.parse(JSON.stringify(arr2)));

      setScoreBad(perBad + "%");
      setScoreGood(perGood + "%");
      setScoreSoso(perSoso + "%");
    } else if (value == 1) {
      // 최근 30일
      const response2 = await http.get(`analysis/percent`, {
        params: {
          date: lastMonth(),
          userId: userInfo.userId,
        },
      });
      // console.log(response2.data.data);

      // 영양소 비율 설정
      setPercentData(response2.data.data);

      // 플래닛지수 state 설정
      let arr2 = [];
      let bad = response2.data.data.badCount;
      let good = response2.data.data.goodCount;
      let soso = response2.data.data.normalCount;

      let perBad = Math.round((100 * bad) / (bad + good + soso));
      if (isNaN(perBad)) {
        perBad = 0;
      }
      let perGood = Math.round((100 * good) / (bad + good + soso));
      if (isNaN(perGood)) {
        perGood = 0;
      }
      let perSoso = Math.round((100 * soso) / (bad + good + soso));
      if (isNaN(perSoso)) {
        perSoso = 0;
      }
      console.log("분석에서", JSON.parse(JSON.stringify(arr2)));

      setScoreBad(perBad + "%");
      setScoreGood(perGood + "%");
      setScoreSoso(perSoso + "%");
    } else if (value == 2) {
      // 전체 기간
      const response3 = await http.get(`analysis/percent`, {
        params: {
          date: "2000-01-01",
          userId: userInfo.userId,
        },
      });
      // console.log(response3.data.data);

      // 영양소 비율 설정
      setPercentData(response3.data.data);

      // 플래닛지수 state 설정
      let arr2 = [];
      let bad = response3.data.data.badCount;
      let good = response3.data.data.goodCount;
      let soso = response3.data.data.normalCount;
      let perBad = Math.round((100 * bad) / (bad + good + soso));
      if (isNaN(perBad)) {
        perBad = 0;
      }
      let perGood = Math.round((100 * good) / (bad + good + soso));
      if (isNaN(perGood)) {
        perGood = 0;
      }
      let perSoso = Math.round((100 * soso) / (bad + good + soso));
      if (isNaN(perSoso)) {
        perSoso = 0;
      }
      console.log("분석에서", JSON.parse(JSON.stringify(arr2)));

      setScoreBad(perBad + "%");
      setScoreGood(perGood + "%");
      setScoreSoso(perSoso + "%");
    }
  }

  ////////////////////////////영양제 스탯/////////////////////////////

  // 유저가 등록한 영양제
  const [userNutrientInfo, setUserNutrientInfo] = useState([]);

  // 영양제 이름
  const [nameDatas, setNameDatas] = useState([]);
  // 영양제 섭취 비율 (기간동안 섭취한 횟수 / (권장횟수*기간) * 100)
  const [perDatas, setPerDatas] = useState([]);

  // 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
  function getDateStr(myDate) {
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();

    month = month < 10 ? "0" + String(month) : month;
    day = day < 10 ? "0" + String(day) : day;

    return year + "-" + month + "-" + day;
  }
  // 오늘로부터 1주일 전 날짜 반환
  function lastWeek() {
    var d = new Date();
    var dayOfMonth = d.getDate();
    d.setDate(dayOfMonth - 7);
    return getDateStr(d);
  }
  // 오늘로부터 1개월 전 날짜 반환
  function lastMonth() {
    var d = new Date();
    var monthOfYear = d.getMonth();
    d.setMonth(monthOfYear - 1);
    return getDateStr(d);
  }

  // 영양제 분석 데이터 받아오기
  async function getNutrientStat() {
    // 최근 7일 데이터
    if (value == 0) {
      const response1 = await http.get(`nutrient/user/list/period`, {
        params: {
          endDate: getDateStr(new Date()),
          startDate: lastWeek(),
          userId: userInfo.userId,
        },
      });

      if (response1.data.message === "success") {
        let infoArr = [];
        infoArr.push(...response1.data.data);
        setUserNutrientInfo(infoArr);
        console.log("인포배열", infoArr);

        let list = [];
        let list2 = [];

        for (let i = 0; i < infoArr.length; i++) {
          // console.log(userNutrientInfo[i].nutrientName);
          list.push(infoArr[i].nutrientName);

          let intakes = 0; // 실제 섭취한 총 횟수
          for (let j = 0; j < infoArr[i].nutriHistoryList.length; j++) {
            intakes += infoArr[i].nutriHistoryList[j].intakeReal;
          }
          let per = (intakes * 100) / (infoArr[i].intakeRecommend * 7);
          list2.push(per.toFixed(1));
        }
        // console.log(nameDatas);
        setNameDatas(list);
        setPerDatas(list2);

        // console.log("영양제영양제!!!!");
        // console.log(list);
        // console.log(list2);
      }
    }
    // 최근 30일 데이터
    else if (value == 1) {
      const response2 = await http.get(`nutrient/user/list/period`, {
        params: {
          endDate: getDateStr(new Date()),
          startDate: lastMonth(),
          userId: userInfo.userId,
        },
      });

      if (response2.data.message === "success") {
        let infoArr = [];
        infoArr.push(...response2.data.data);
        setUserNutrientInfo(infoArr);
        console.log("인포배열", infoArr);

        let list = [];
        let list2 = [];
        if (infoArr.length != 0) {
          for (let i = 0; i < infoArr.length; i++) {
            // console.log(userNutrientInfo[i].nutrientName);
            list.push(infoArr[i].nutrientName);

            let intakes = 0; // 실제 섭취한 총 횟수
            for (let j = 0; j < infoArr[i].nutriHistoryList.length; j++) {
              intakes += infoArr[i].nutriHistoryList[j].intakeReal;
            }
            let per = (intakes * 100) / (infoArr[i].intakeRecommend * 30);
            list2.push(per.toFixed(1));

            // console.log(nameDatas);
            setNameDatas(list);
            setPerDatas(list2);

            // console.log("영양제영양제!!!!");
            // console.log(list);
            // console.log(list2);
          }
        }
      }
    }
    // 전체 데이터
    else if (value == 2) {
      const response3 = await http.get(`nutrient/user/list/period`, {
        params: {
          endDate: getDateStr(new Date()),
          startDate: "1900-01-01",
          userId: userInfo.userId,
        },
      });

      if (response3.data.message === "success") {
        let infoArr = [];
        infoArr.push(...response3.data.data);
        setUserNutrientInfo(infoArr);
        console.log("인포배열", infoArr);

        let list = [];
        let list2 = [];
        if (infoArr.length != 0) {
          for (let i = 0; i < infoArr.length; i++) {
            // console.log(userNutrientInfo[i].nutrientName);
            list.push(infoArr[i].nutrientName);

            if (infoArr[i].nutriHistoryList.length != 0) {
              // 처음 섭취한 날 부터 오늘까지의 날짜차이
              // console.log(userNutrientInfo[i].nutriHistoryList[0].intakeDate);
              let date = getDiff(
                getToday(),
                infoArr[i].nutriHistoryList[0].intakeDate
              );
            }
            // console.log(date);
            let intakes = 0; // 실제 섭취한 총 횟수
            for (let j = 0; j < infoArr[i].nutriHistoryList.length; j++) {
              intakes += infoArr[i].nutriHistoryList[j].intakeReal;
            }
            let per = (intakes * 100) / (infoArr[i].intakeRecommend * 7);
            list2.push(per.toFixed(1));

            // console.log(nameDatas);
            setNameDatas(list);
            setPerDatas(list2);

            // console.log("영양제영양제!!!!");
            // console.log(list);
            // console.log(list2);
          }
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

  // 날짜차이계산
  const getDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
  };

  return (
    <div>
      <Container
        sx={{ width: "100%", marginTop: "100px", marginBottom: "50px" }}
      >
        <Tabs
          sx={{ marginRight: "25px", marginLeft: "25px" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="최근 7일" {...a11yProps(0)} />
          <Tab label="최근 30일" {...a11yProps(1)} />
          <Tab label="전체 기간" {...a11yProps(2)} />
        </Tabs>

        {/* 최근 7일 */}
        <TabPanel value={value} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* 타임라인 */}
              <TimelineStat
                value={value}
                list1={list1}
                list2={list2}
                list3={list3}
                list4={list4}
                list5={list5}
              ></TimelineStat>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 플래닛지수 */}
              <PlaneatStat
                value={value}
                score={score}
                scoreBad={scoreBad}
                scoreGood={scoreGood}
                scoreSoso={scoreSoso}
              ></PlaneatStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 피드백*/}
              <FeedbackStat
                value={value}
                data={analysisData}
                percent={percentData}
                calArr={calArr}
                allCal={allCal}
              ></FeedbackStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 섭취량 */}
              <FoodStat
                value={value}
                data={analysisData}
                percent={percentData}
              ></FoodStat>
            </Grid>

            <Grid item xs={12} md={12}>
              {/* 영양제 */}
              <NutrientStat
                value={value}
                nameDatas={nameDatas}
                perDatas={perDatas}
              ></NutrientStat>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 최근 30일 */}
        <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* 변화기록 */}
              <WeightStat
                value={value}
                data={analysisData}
                reco={recoData}
              ></WeightStat>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 플래닛지수 */}
              <PlaneatStat
                value={value}
                score={score}
                scoreBad={scoreBad}
                scoreGood={scoreGood}
                scoreSoso={scoreSoso}
              ></PlaneatStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 피드백*/}
              <FeedbackStat
                value={value}
                data={analysisData}
                percent={percentData}
                calArr={calArr}
                allCal={allCal}
              ></FeedbackStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 섭취량 */}
              <FoodStat
                value={value}
                data={analysisData}
                percent={percentData}
              ></FoodStat>
            </Grid>

            <Grid item xs={12} md={12}>
              {/* 영양제 */}
              <NutrientStat
                value={value}
                nameDatas={nameDatas}
                perDatas={perDatas}
              ></NutrientStat>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 전체 기간 */}
        <TabPanel value={value} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* 변화기록 */}
              <WeightStat
                value={value}
                data={analysisData}
                reco={recoData}
              ></WeightStat>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 플래닛지수 */}
              <PlaneatStat
                value={value}
                score={score}
                scoreBad={scoreBad}
                scoreGood={scoreGood}
                scoreSoso={scoreSoso}
              ></PlaneatStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 피드백*/}
              <FeedbackStat
                value={value}
                data={analysisData}
                percent={percentData}
                calArr={calArr}
                allCal={allCal}
              ></FeedbackStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 섭취량 */}
              <FoodStat
                value={value}
                data={analysisData}
                percent={percentData}
              ></FoodStat>
            </Grid>

            <Grid item xs={12} md={12}>
              {/* 영양제 */}
              <NutrientStat
                value={value}
                nameDatas={nameDatas}
                perDatas={perDatas}
              ></NutrientStat>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </div>
  );
}

export default Analysis;
