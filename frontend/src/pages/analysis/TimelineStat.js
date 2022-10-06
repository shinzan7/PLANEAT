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
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import TapasRoundedIcon from "@mui/icons-material/TapasRounded";
import NightlifeRoundedIcon from "@mui/icons-material/NightlifeRounded";

import Typography from "@mui/material/Typography";
import { Paper, Grid } from "@mui/material";
import { http } from "api/http";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

export default function TimelineStat({
  value,
  list1,
  list2,
  list3,
  list4,
  list5,
}) {
  const userInfo = useRecoilValue(userState);

  useEffect(() => {
    console.log(list1);
  });

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
    const response = await http.get(
      `intake-histories/${userInfo.userId}/${lastDay(1)}`
    );
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
        height: 480,
        overflow: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#F7BF87",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#FFB973",
        },
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
                {lastDay(0)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <CakeRoundedIcon sx={{ color: "#A9D5C7" }}></CakeRoundedIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Eat
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  {list1.length == 0
                    ? "기록한 음식이 없어요.🤔"
                    : list1.map(function (item, i) {
                        if (i == 0 && list1.length == 1) {
                          return item;
                        } else if (i == list1.length - 1) {
                          return item;
                        } else {
                          return item + ", ";
                        }
                      })}
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", fontWeight: "bold" }}
                variant="body2"
                color="text.secondary"
              >
                {lastDay(1)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <IcecreamRoundedIcon color="orange"></IcecreamRoundedIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Code
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  {" "}
                  {list2.length == 0
                    ? "기록한 음식이 없어요.🤔"
                    : list2.map(function (item, i) {
                        if (i == 0 && list2.length == 1) {
                          return item;
                        } else if (i == list2.length - 1) {
                          return item;
                        } else {
                          return item + ", ";
                        }
                      })}
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
                {lastDay(2)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <RestaurantRoundedIcon color="purple"></RestaurantRoundedIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Sleep
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  {list3.length == 0
                    ? "기록한 음식이 없어요.🤔"
                    : list3.map(function (item, i) {
                        if (i == 0 && list3.length == 1) {
                          return item;
                        } else if (i == list3.length - 1) {
                          return item;
                        } else {
                          return item + ", ";
                        }
                      })}
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
                  <TapasRoundedIcon
                    sx={{ color: "#FFB3B3" }}
                  ></TapasRoundedIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Repeat
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  {list4.length == 0
                    ? "기록한 음식이 없어요.🤔"
                    : list4.map(function (item, i) {
                        if (i == 0 && list4.length == 1) {
                          return item;
                        } else if (i == list4.length - 1) {
                          return item;
                        } else {
                          return item + ", ";
                        }
                      })}
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
                  <NightlifeRoundedIcon color="orange"></NightlifeRoundedIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {/* <Typography variant="h6" component="span">
                  Repeat
                </Typography> */}
                <Typography sx={{ fontSize: "13px" }}>
                  {" "}
                  {list5.length == 0
                    ? "기록한 음식이 없어요.🤔"
                    : list5.map(function (item, i) {
                        if (i == 0 && list5.length == 1) {
                          return item;
                        } else if (i == list5.length - 1) {
                          return item;
                        } else {
                          return item + ", ";
                        }
                      })}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
    </Paper>
  );
}
