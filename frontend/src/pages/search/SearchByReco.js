/*
영양제 검색 페이지 > 영양제 추천
@author 전상현
@since 2022.09.19
*/
import React, { useState, useEffect } from "react";
import CardNutrient from "components/common/CardNutrient";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import "./Reco.css";
import { Link } from "react-router-dom";
import { http } from "api/http";

function SearchByReco() {
  const name = localStorage.getItem("name");

  const [tag, setTag] = useState([]);
  const [info, setInfo] = useState([]);
  const [history, setHistory] = useState([]);

  // const today = new Date()
  // const year = today.getFullYear().toString()
  // const tmpMonth = today.getMonth() + 1
  // const month = tmpMonth + 1 < 10 ? "0" + tmpMonth : "" + tmpMonth
  // const tmpDay = today.getDate()
  // const day = tmpDay < 10 ? "0" + tmpDay : "" + tmpDay
  // const userId = localStorage.getItem('userId')

  // console.log('tag', tag)
  // console.log('info', info)
  // console.log('history', history)

  useEffect(() => {
    // http.get(`/user-infos/${userId}`)
    http.get("/user-infos/8").then((response) => {
      const data = response.data.data.categoriesList;
      const ran = Math.floor(Math.random() * (data.length + 1));

      http.get(`/nutrient/tag/${data[ran]}`).then((response) => {
        setInfo(response.data.data);
      });
      setTag(data);
    });

    // http.get(`/analysis/percent?date=${year}-${month}-${day}&userId=${userId}`)
    http.get("/analysis/percent?date=2022-09-26&userId=8").then((response) => {
      const data2 = Object.entries(response.data.data);
      const data3 = [
        data2[10],
        data2[17],
        data2[9],
        data2[23],
        data2[11],
        data2[12],
        data2[18],
        data2[19],
        data2[20],
        data2[31],
        data2[32],
        data2[22],
        data2[25],
        data2[24],
        data2[21],
        data2[16],
      ];
      const data4 = [];
      for (var i = 0; i < data3.length; i++) {
        data4.push(data3[i][1]);
      }

      const data5 = [];
      for (var j = 0; j < data4.length; j++) {
        if (data4[j] === Math.min.apply(null, data4)) {
          data5.push(j);
        }
      }

      const numbers = [
        7, 14, 6, 22, 8, 9, 15, 16, 17, 19, 20, 21, 23, 24, 18, 13,
      ];
      const ran2 = Math.floor(Math.random() * (data5.length + 1));
      const num = numbers[data5[ran2]];

      http.get(`/nutrient/ingredient/${num}`).then((response) => {
        setHistory(response.data.data);
      });
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,

    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const section1 = { textAlign: "left", fontSize: "3.3vh" };
  const bold = { fontWeight: "bold" };
  const section3 = { marginTop: "10vh" };

  return (
    <div>
      <Grid container>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={9.8}>
          <div style={section1}>
            {/* 유저 식단 기반 분석에서 부족한 영양소 성분 기반 추천 */}
            <p>
              &nbsp;&nbsp;PLANEAT이 <span style={bold}>{name}</span> 님에게
              추천해요
            </p>
          </div>
          <div>
            <Slider {...settings}>
              {history.slice(0, 20).map((data, i) => (
                <Link
                  to={`/searchdetail/${data.nutrientId}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardNutrient key={i} pill={data} />
                </Link>
              ))}
            </Slider>
          </div>
        </Grid>
        <Grid item xs={1.7}></Grid>

        <Grid item xs={0.5}></Grid>
        <Grid item xs={9.8}>
          <div style={section1}>
            {/* 유저가 설정한 건강 고민 태그 기반 추천 */}
            <p>
              &nbsp;&nbsp;<span style={bold}>{tag[0]}</span>에 좋아요
            </p>
          </div>

          <div>
            <Slider {...settings}>
              {info.slice(0, 20).map((data, i) => (
                <Link
                  key={i}
                  to={`/searchdetail/${data.nutrientId}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardNutrient key={i} pill={data} />
                </Link>
              ))}
            </Slider>
          </div>
        </Grid>
        <Grid item xs={1.7}></Grid>
      </Grid>
      <div style={section3}></div>
    </div>
  );
}

export default SearchByReco;
