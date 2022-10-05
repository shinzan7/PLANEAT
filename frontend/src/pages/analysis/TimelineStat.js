/*
타임라인 스탯
@author 조혜안
@since 2022.10.01
*/
import * as React from "react";
import { useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { Paper, Grid } from "@mui/material";
import { getFormControlUnstyledUtilityClass } from "@mui/base";
import { http } from "api/http";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

export default function TimelineStat({ value }) {
  const userInfo = useRecoilValue(userState);

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

  // 1일전, 2일전, 3일전, 4일전, 5일전 음식 받아오기
  async function getFoodData() {
    const response = await http.get(`intake-histories/${userInfo.userId}/${lastDay(1)}`);
    console.log(response.data);
  }

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        borderWidth: "3px",
        borderColor: "orange.main",
        color: "#747373",
        overflow: "auto",
        height: "470px",
      }}
    >
      {/* 최근 7일이면 0, 최근 30일이면 1, 전체 기간이면 2 */}
      {/* {value} */}
      <Grid Container style={{ margin: 20 }}>
        <Grid item>
          <h3>최근 타임라인</h3>
        </Grid>
        <Grid item sx={{ textAlign: "center" }}>
          <Timeline position="alternate">
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontWeight: "bold" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {lastDay(1)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <img
                    width="20"
                    height="20"
                    src="assets/score/score_bad.png"
                  ></img>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Eat
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  양념치킨, 순대곱창, 수제버거, 깐풍기, 김치찌개
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontWeight: "bold" }}
                variant="body2"
                color="text.secondary"
              >
                {lastDay(2)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <img
                    width="20"
                    height="20"
                    src="assets/score/score_good.png"
                  ></img>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Code
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  떡볶이, 피자, 보쌈, 닭발
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontWeight: "bold" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {lastDay(3)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <img
                    width="20"
                    height="20"
                    src="assets/score/score_soso.png"
                  ></img>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Sleep
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  햄버거, 바나나우유, 자장면, 제육덮밥
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontWeight: "bold" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {lastDay(4)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <img
                    width="20"
                    height="20"
                    src="assets/score/score_soso.png"
                  ></img>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Repeat
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  콩나물국밥, 닭갈비, 후라이드치킨, 순대
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontWeight: "bold" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {lastDay(5)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <img
                    width="20"
                    height="20"
                    src="assets/score/score_good.png"
                  ></img>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Repeat
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  돈까스, 탕수육, 보쌈, 스테이크
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
    </Paper>
  );
}
