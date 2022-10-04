/*
내 영양분석 페이지
@author 조혜안
@since 2022.09.22
*/
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Grid, Container, getTableBodyUtilityClass } from "@mui/material";

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

function Analysis() {
  // userState 유저정보
  const userInfo = useRecoilValue(userState);

  // 분석기록
  const [analysisData, setAnalysisData] = useState([]);
  // 분석기록 비율평균
  const [percentData, setPercentData] = useState([]);
  // 플래닛지수
  const [score, setScore] = useState([]);

  // 0일 때 최근 7일, 1일 때 최근 30일, 2일 때 전체 기간
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getAnalysisData() {
    // 분석기록 받아오기
    if (value == 0) {
      // 최근 7일
      const response1 = await http.get(`analysis`, {
        params: {
          date: lastWeek(),
          userId: userInfo.userId,
        },
      });
      console.log(response1.data.data);
      let getData = [];
      for (let i = 0; i < response1.data.data.length; i++) {
        if (response1.data.data[i].analysisType == 0) {
          getData.push(response1.data.data[i]);
        }
      }
      setAnalysisData(getData);
    } else if (value == 1) {
      // 최근 30일
      const response2 = await http.get(`analysis`, {
        params: {
          date: lastMonth(),
          userId: userInfo.userId,
        },
      });
      console.log(response2.data.data);
      let getData = [];
      for (let i = 0; i < response2.data.data.length; i++) {
        if (response2.data.data[i].analysisType == 0) {
          getData.push(response2.data.data[i]);
        }
      }
      setAnalysisData(getData);
    } else if (value == 2) {
      // 전체 기간
      const response3 = await http.get(`analysis/all`, {
        params: {
          userId: userInfo.userId,
        },
      });
      console.log(response3.data.data);
      let getData = [];
      for (let i = 0; i < response3.data.data.length; i++) {
        if (response3.data.data[i].analysisType == 0) {
          getData.push(response3.data.data[i]);
        }
      }
      setAnalysisData(getData);
    }
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
      // console.log(response1.data.data);

      // 영양소 비율 설정
      setPercentData(response1.data.data);

      // 플래닛지수 state 설정
      let arr2 = [];
      let bad = response1.data.data.badCount;
      let good = response1.data.data.goodCount;
      let soso = response1.data.data.normalCount;

      arr2.push(Math.round((100 * bad) / (bad + good + soso)) + "%");
      arr2.push(Math.round((100 * good) / (bad + good + soso)) + "%");
      arr2.push(Math.round((100 * soso) / (bad + good + soso)) + "%");
      setScore(arr2);
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

      arr2.push(Math.round((100 * bad) / (bad + good + soso)) + "%");
      arr2.push(Math.round((100 * good) / (bad + good + soso)) + "%");
      arr2.push(Math.round((100 * soso) / (bad + good + soso)) + "%");
      setScore(arr2);
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

      arr2.push(Math.round((100 * bad) / (bad + good + soso)) + "%");
      arr2.push(Math.round((100 * good) / (bad + good + soso)) + "%");
      arr2.push(Math.round((100 * soso) / (bad + good + soso)) + "%");
      setScore(arr2);
    }
  }

  useEffect(() => {
    getAnalysisData();
    getPercentData();
  }, [value]);

  return (
    <div>
      <Container sx={{ width: "100%", marginTop: "100px" }}>
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
              <TimelineStat value={value}></TimelineStat>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 플래닛지수 */}
              <PlaneatStat value={value} score={score}></PlaneatStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 섭취량 */}
              <FoodStat value={value} data={analysisData} percent={percentData}></FoodStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 피드백*/}
              <FeedbackStat value={value} percent={percentData}></FeedbackStat>
            </Grid>

            <Grid item xs={12} md={12}>
              {/* 영양제 */}
              <NutrientStat value={value}></NutrientStat>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 최근 30일 */}
        <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* 변화기록 */}
              <WeightStat value={value}></WeightStat>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 플래닛지수 */}
              <PlaneatStat value={value} score={score}></PlaneatStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 섭취량 */}
              <FoodStat value={value} data={analysisData} percent={percentData}></FoodStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 피드백*/}
              <FeedbackStat value={value} percent={percentData}></FeedbackStat>
            </Grid>

            <Grid item xs={12} md={12}>
              {/* 영양제 */}
              <NutrientStat value={value}></NutrientStat>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 전체 기간 */}
        <TabPanel value={value} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* 변화기록 */}
              <WeightStat value={value}></WeightStat>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 플래닛지수 */}
              <PlaneatStat value={value} score={score}></PlaneatStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 섭취량 */}
              <FoodStat value={value} data={analysisData} percent={percentData}></FoodStat>
            </Grid>
            <Grid item xs={12} md={12}>
              {/* 피드백*/}
              <FeedbackStat value={value} percent={percentData}></FeedbackStat>
            </Grid>

            <Grid item xs={12} md={12}>
              {/* 영양제 */}
              <NutrientStat value={value}></NutrientStat>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </div>
  );
}

export default Analysis;
