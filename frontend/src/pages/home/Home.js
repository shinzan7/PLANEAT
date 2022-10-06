/*
메인 페이지
@author 전상현, 조혜안(애니메이션 추가, 디자인 일부 수정)
@since 2022.09.15
*/

import React, { useState, useEffect } from "react";
import "./Home.css";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import BtnMain from "components/common/BtnMain";
import SimpleTestModal from "components/modal/home/SimpleTestModal";
import Google from "./Google";
import Kakao from "./Kakao";
import Naver from "./Naver";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Fab from "@mui/material/Fab";

import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import longlogo from "assets/longlogo.png";
import home1 from "assets/home1.png";

import {
  Paper,
  Container,
  CardHeader,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home() {
  const monitordiv = { width: "35vw", height: "45vh", marginTop: "20vh" };
  const logo = { width: "40vw", marginTop: "30vh", marginBottom: "5vh" };
  const card = {
    height: "50vh",
    backgroundColor: "transparent",
    fontSize: "1.5vw",
    color: "white",
  };
  const textcard = {
    height: "50vh",
    backgroundColor: "transparent",
    border: "none",
  };
  const chip = { marginLeft: "20%" };

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const handleScroll = (e) => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bgColor">
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ marginTop: "10vh", textAlign: "center" }}
            >
              <div>
                <img
                  // className="floating"
                  src="assets/slogan.png"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  alt=""
                  style={{
                    width: "45%",

                    marginBottom: "5vh",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>
                <img
                  className="floating"
                  src="assets/shadow_logo.png"
                  data-aos="fade-right"
                  data-aos-duration="3000"
                  data-aos-offset="30"
                  data-aos-delay="500"
                  alt=""
                  style={{ width: "30%" }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ marginTop: "6vh", textAlign: "center" }}
            >
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                href="#"
                style={{
                  display: "inline-block",
                  padding: "20px",
                  // backgroundColor: "#190730",
                  opacity: "1",
                  borderRadius: "24px",
                }}
              >
                <div style={{ marginBottom: "30px", fontSize: "2.5vh" }}>
                  간편 로그인
                </div>
                <Google />
                <Naver />
                <Kakao />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ marginTop: "7vh", textAlign: "center" }}
            >
              <img
                className="floating"
                src="assets/arrow.png"
                style={{ margin: "0px" }}
                width="5%"
              ></img>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      <div className="section2" style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-block",
            marginBottom: "50px",
            borderRadius: "4px",
            backgroundColor: "#9DA6F8",
            width: "8%",
            height: "5px",
          }}
        ></div>
        <div style={{ fontSize: "30px", marginBottom: "80px" }}>
          수십만개의 데이터를 활용한 정확한 식단 피드백
        </div>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid
              item
              sx={{ textAlign: "center" }}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-offset="50"
              data-aos-delay="400"
              xs={12}
              sm={12}
              md={4}
            >
              <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                음식 데이터
              </p>
              <CountUp
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "30px",
                }}
                start={0}
                end={89962}
                duration={3}
                redraw={true}
                useEasing={true}
                useGrouping={true}
                suffix="개"
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <span style={{ fontSize: "30px" }} ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              <div style={{ marginTop: "20px", lineHeight: "1.5" }}>
                등록한 식사 정보로 정확한
                <br /> 영양 분석을 받을 수 있습니다.
              </div>
            </Grid>
            <Grid
              item
              sx={{ textAlign: "center" }}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-offset="50"
              data-aos-delay="600"
              xs={12}
              sm={12}
              md={4}
            >
              <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                영양제 데이터
              </p>
              <CountUp
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "30px",
                }}
                start={0}
                end={5421}
                duration={3}
                useEasing={true}
                useGrouping={true}
                suffix="개"
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <span style={{ fontSize: "30px" }} ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              <div style={{ marginTop: "20px", lineHeight: "1.5" }}>
                고민별, 성분별 검색과
                <br />
                영양제 추천을 받을 수 있습니다.
              </div>
            </Grid>
            <Grid
              item
              sx={{ textAlign: "center" }}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-offset="50"
              data-aos-delay="800"
              xs={12}
              sm={12}
              md={4}
            >
              <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                리뷰 데이터
              </p>
              <CountUp
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "30px",
                }}
                start={0}
                end={979551}
                duration={3}
                useEasing={true}
                useGrouping={true}
                suffix="개"
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <span style={{ fontSize: "30px" }} ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              <div style={{ marginTop: "20px", lineHeight: "1.5" }}>
                사용자의 리뷰 키워드를
                <br /> 시각화하여 볼 수 있습니다.
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div
        style={{
          marginTop: "10%",
          marginLeft: "10%",
          marginRight: "10%",
          textAlign: "end",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ display: "table" }}>
            <div
              style={{
                paddingRight: "20%",
                display: "table-cell",
                verticalAlign: "middle",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginTop: "20%",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  backgroundColor: "#9DA6F8",
                  width: "90px",
                  height: "5px",
                }}
              ></div>
              <p className="p" style={{ lineHeight: "1.8", fontSize: "22px" }}>
                영양분석 통계를 통해<br></br>
                식단을 점검해보세요
              </p>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              src="assets/home2.png"
              width="600vh"
              data-aos="fade-down-left"
              data-aos-offset="500"
              data-aos-duration="1000"
              style={{ marginRight: "30%" }}
            />
          </Grid>
        </Grid>
      </div>

      <div
        style={{ marginLeft: "10%", marginRight: "10%", textAlign: "start" }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <img
              src="assets/home3.png"
              width="600vh"
              data-aos="fade-down-right"
              data-aos-offset="500"
              data-aos-duration="1000"
              style={{ marginLeft: "25%" }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "table" }}>
            <div
              style={{
                paddingLeft: "20%",
                display: "table-cell",
                verticalAlign: "middle",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginTop: "20%",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  backgroundColor: "#9DA6F8",
                  width: "90px",
                  height: "5px",
                }}
              ></div>
              <p className="p" style={{ lineHeight: "1.8", fontSize: "22px" }}>
                나에게 필요한 영양제를<br></br>
                쉽고 빠르게 찾아보세요
              </p>
            </div>
          </Grid>
        </Grid>
      </div>

      <div style={{ marginLeft: "10%", marginRight: "10%", textAlign: "end" }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ display: "table" }}>
            <div
              style={{
                paddingRight: "20%",
                display: "table-cell",
                verticalAlign: "middle",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginTop: "20%",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  backgroundColor: "#9DA6F8",
                  width: "90px",
                  height: "5px",
                }}
              ></div>
              <p className="p" style={{ lineHeight: "1.8", fontSize: "22px" }}>
                식사기록을 통해
                <br />
                부족한 영양분을 찾아보세요<br></br>
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="assets/home1.png"
              width="600vh"
              data-aos="fade-down-left"
              data-aos-offset="500"
              data-aos-duration="1000"
              style={{ marginRight: "30%" }}
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ paddingTop: "10%", paddingBottom: "3%" }}>
        <Fab
          sx={{ float: "right", marginRight: "3%" }}
          color="primary"
          onClick={handleScroll}
        >
          <KeyboardArrowUpRoundedIcon />
        </Fab>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Home;
