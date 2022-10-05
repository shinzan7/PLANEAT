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

import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import longlogo from "assets/longlogo.png";
import home1 from 'assets/home1.png'

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
  const textcard = { height: "50vh", backgroundColor: "transparent", border: "none" };
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

  return (
    <div className="bgColor">
      <Grid container>
        <Grid item lg={6} xs={12}>
          <Grid container>
            <Grid item xs={2}></Grid>

            <Grid item xs={8}>
              <img
                src={longlogo}
                data-aos="fade-right"
                data-aos-duration="3000"
                alt=""
                style={logo}
              />
              <div
                data-aos="fade-right"
                data-aos-duration="3000"
                style={{ marginLeft: "50%", fontSize: "16px" }}
              >
                간편 로그인
              </div>
              <div href="#" className="login" data-aos="fade-right" data-aos-duration="3000">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Google />
                <Naver />
                <Kakao />
              </div>
            </Grid>

            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={1}></Grid>

            <Grid item xs={7}>
              {/* <img src="assets/longlogo.png" alt="" style={logo} /> */}
            </Grid>

            <Grid item xs={4}></Grid>

            {/* <div style={chip}>
              <BtnMain onClick={openModal} width="23vw" height="5vh">
                PLANEAT 체험하기
              </BtnMain>
              <SimpleTestModal open={modalOpen} close={closeModal} />
            </div> */}
          </Grid>
        </Grid>
      </Grid>

      <div className="section2" style={{ marginBottom: "50px" }}>
        <div
          style={{
            display: "inline-block",
            marginBottom: "50px",
            borderRadius: "4px",
            backgroundColor: "#9DA6F8",
            width: "90px",
            height: "5px",
          }}
        ></div>
        <div style={{ fontSize: "40px", marginBottom: "80px" }}>
          수만개의 데이터를 활용한 정확한 식단 피드백
        </div>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid
              item
              sx={{ textAlign: "center" }}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-offset="30"
              data-aos-delay="500"
              xs={12}
              sm={12}
              md={4}
            >
              <p style={{ fontSize: "20px", fontWeight: "bolder" }}>음식 데이터</p>
              <CountUp
                style={{ textAlign: "center", color: "white", fontSize: "30px" }}
                start={0}
                end={89962}
                duration={5}
                redraw={true}
                useEasing={true}
                useGrouping={true}
                suffix="개"
              ></CountUp>
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
              data-aos-offset="30"
              data-aos-delay="600"
              xs={12}
              sm={12}
              md={4}
            >
              <p style={{ fontSize: "20px", fontWeight: "bolder" }}>영양제 데이터</p>
              <CountUp
                style={{ textAlign: "center", color: "white", fontSize: "30px" }}
                start={0}
                end={5421}
                duration={5}
                useEasing={true}
                useGrouping={true}
                suffix="개"
              ></CountUp>
              <div style={{ marginTop: "20px", lineHeight: "1.5" }}>
                영양제를 추천받고
                <br />
                고민별, 성분별로 검색이 가능합니다.
              </div>
            </Grid>
            <Grid
              item
              sx={{ textAlign: "center" }}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-offset="30"
              data-aos-delay="700"
              xs={12}
              sm={12}
              md={4}
            >
              <p style={{ fontSize: "20px", fontWeight: "bolder" }}>리뷰 데이터</p>
              <CountUp
                style={{ textAlign: "center", color: "white", fontSize: "30px" }}
                start={0}
                end={979551}
                duration={5}
                useEasing={true}
                useGrouping={true}
                suffix="개"
              ></CountUp>
              <div style={{ marginTop: "20px", lineHeight: "1.5" }}>
                사용자의 리뷰 키워드를
                <br /> 시각화하여 볼 수 있습니다.
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="section3">
        <Grid container>
          <Grid item lg={0.9} xs={3}></Grid>
          <Grid item lg={4.8} xs={6}>
            <Card variant="outlined" style={textcard}>
              <p className="p">
                내가 필요한 영양제를<br></br>
                쉽고 빠르게 찾아보세요
              </p>
            </Card>
          </Grid>
          <Grid item lg={0.3} xs={3}></Grid>
          <Grid item lg={0.3} xs={3}></Grid>
          <Grid item lg={4.8} xs={6}>
            <Card variant="outlined" style={card}>
              <img src={home1} style={{ width:'100%', height:'100%'}} />
            </Card>
          </Grid>
          <Grid item lg={0.9} xs={3}></Grid>
        </Grid>
      </div>

      <div className="section4">
        <Grid container>
          <Grid item lg={0.9} xs={3}></Grid>
          <Grid item lg={4.8} xs={6}>
            <Card variant="outlined" style={card}>
              식단 분석 화면
            </Card>
          </Grid>
          <Grid item lg={0.3} xs={3}></Grid>
          <Grid item lg={0.3} xs={3}></Grid>
          <Grid item lg={4.8} xs={6}>
            <Card variant="outlined" style={textcard}>
              <p className="p">
                월간 통계를 통해<br></br>
                식단을 점검해보세요
              </p>
            </Card>
          </Grid>
          <Grid item lg={0.9} xs={3}></Grid>
        </Grid>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Home;
