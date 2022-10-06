/*
영양제 검색 페이지 > 영양제 상세정보
@author 전상현
@since 2022.09.22
*/

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "components/nav/Header";
import { Grid, Typography } from "@mui/material";
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";
import { http } from "api/http";
import { userState } from "states/userState";
import { useRecoilValue } from "recoil";
import ChipBlue from "components/common/ChipBlue";
import ChipOrange from "components/common/ChipOrange";
import CardNutrient from "components/common/CardNutrient";
import "./Detail.css";
import { useRef } from "react";
import BtnMain from "components/common/BtnMain";
import { TagCloud } from 'react-tagcloud';
import ReactWordcloud from 'react-wordcloud';


const words = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
]

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: false,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [7, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 500
};

function SimpleWordcloud(props) {
  return(
    <div style={{ height: 200, width: 400 }}>
      <ReactWordcloud options={options} words={props.word} />
    </div>
  );
}



function SearchDetail() {
  const { nutrientId } = useParams();
  // console.log('params', nutrientId)
  const userInfo = useRecoilValue(userState);
  // console.log(userInfo)


  const [info, setInfo] = useState({
    imagePath: "",
    nutrientName: "",
    company: "",
    description: "",
    nutriIngredientList: [],
    nutrientReviewList: [],
  });

  const [word, setWord] = useState([]);

  async function getInfo() {
    const response = await http.get("/nutrient", {
      params: {
        id: nutrientId,
      },
    });


    console.log(response.data.data);
    setInfo(response.data.data);

    let review = response.data.data.nutrientReviewList;
    let reviewData = [];
    for (let i = 0; i < review.length; i++){
      reviewData.push(
        {
          text: review[i].keyword,
          value: review[i].count
        }
      )
    }
    setWord(reviewData);
    console.log(reviewData);
  }

  async function registPill() { 
    const response = await http.post('/nutrient/user', {
      intakeRecommend: 1,
      nutrientId: nutrientId,
      userId: userInfo.userId
    });

    if (response.data.message == "success") { 
      alert("영양제 등록이 완료되었습니다.");
    } else {
      alert("영양제 등록에 실패하였습니다.")
    }
  }

  const mounted = useRef(null);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getInfo();
    }
  }, []);

  const tagArray = [];

  for (var i = 0; i < info.nutriIngredientList.length; i++) {
    for (var j = 0; j < info.nutriIngredientList[i].categoryTagList.length; j++) {
      tagArray.push(info.nutriIngredientList[i].categoryTagList[j]);
    }
  }

  const tagSet = new Set(tagArray);
  const tags = Array.from(tagSet);

  const des = info.description
    .replace(/\[/gi, "").replace(/\]/gi, "").replace(/\'/gi, "\n").replace(/,/gi, " ").replace(/-/gi, " ")
    .replace(/①/gi, "\n").replace(/②/gi, "\n").replace(/③/gi, "\n").replace(/④/gi, "\n").replace(/⑤/gi, "\n")
    .replace(/1\./gi, "\n").replace(/2\./gi, "\n").replace(/3\./gi, "\n").replace(/4\./gi, "\n").replace(/5\./gi, "\n")
    .replace(/1\)/gi, "\n").replace(/2\)/gi, "\n").replace(/3\)/gi, "\n").replace(/4\)/gi, "\n").replace(/5\)/gi, "\n")
    .replace(/\(가\)/gi, "\n").replace(/\(나\)/gi, "\n").replace(/\(다\)/gi, "\n").replace(/\(라\)/gi, "\n").replace(/\(마\)/gi, "\n")


  return (
    <div id="wrap">
      <Grid container>
        {/* 상단 문구 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          style={{
            margin: "20px",
            padding: "10px",
          }}
        >
          {/* 검색창 */}
          <Grid item xs={5}>
            <SearchBar />
          </Grid>
        </Grid>
        {/* 좌측 사이드바 */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>

        <Grid item xs={10} style={{ padding: "20px" }}>
          {/* 영양제 정보 */}
          <Grid
            container
            xs={12}
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              margin: "20px",
              fontWeight: "bold",
            }}
          >
            영양제 정보
          </Grid>
          <Grid
            container
            xs={10}
            style={{
              boxShadow: "1px 1px 6px #e6e8fd",
              background: "none",
              borderRadius: "20px",
              padding: "5px",
              border: "2px solid #e6e8fd",
              margin: "20px"
            }}
          >
            {/* 이미지  */}
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <img src={info.imagePath} style={{ width: "200px", height: "200px" }} />
            </Grid>
            {/* 회사, 이름 */}
            <Grid container xs={7} alignItems="center">
              <Grid xs={12} container alignItems="center">
                <Grid item xs={6}>
                  <Grid item xs={12} style={{ fontSize: "15px", margin: "10px" }}>
                    [{info.company}]
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      fontSize: "20px",
                      margin: "10px",
                      fontWeight: "bold",
                      marginBottom: "30px",
                    }}
                  >
                    {info.nutrientName}
                  </Grid>
                  <Grid style={{ fontSize: "15px", margin: "10px" }}>
                    <BtnMain onClick={()=>{registPill()}}>내 영양제로 등록하기</BtnMain>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <SimpleWordcloud word={ word} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* 효과 */}
          <Grid container style={{ marginTop: "20px" }}>
            <Grid
              item
              xs={12}
              style={{ margin: "10px", marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}
            >
              효과
            </Grid>
          </Grid>

          <Grid
            container
            xs={10}
            style={{
              boxShadow: "1px 1px 6px #e6e8fd",
              background: "none",
              borderRadius: "20px",
              padding: "5px",
              border: "2px solid #e6e8fd",
              margin: "20px"
            }}
          >
            <Grid item xs={12} style={{ fontSize: "15px", margin: "10px" }}>
              주요 기능
            </Grid>
            <Grid item xs={12} style={{ margin: "10px" }}>
              {tags.map((data, i) => (
                <Link to={"/tagresult/" + data} style={{ textDecoration: "none" }}>
                  <ChipOrange
                    key={i}
                    label={data}
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                  />
                </Link>
              ))}
            </Grid>
            <Grid item xs={12} style={{ fontSize: "15px", margin: "10px" }}>
              성분
            </Grid>
            <Grid item xs={12} style={{ margin: "10px" }}>
              {info.nutriIngredientList.map((data, i) => (
                <ChipBlue
                  key={i}
                  label={data.ingredientName}
                  style={{ marginRight: "5px", marginBottom: "5px" }}
                />
              ))}
            </Grid>
          </Grid>
          {/* 상세정보 */}
          <Grid container style={{ marginTop: "20px" }}>
            <Grid
              item
              xs={12}
              style={{ margin: "10px", marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}
            >
              상세 정보
            </Grid>
          </Grid>
          <Grid
            container
            // justifyContent="center"
            xs={10}
            style={{
              boxShadow: "1px 1px 6px #e6e8fd",
              background: "none",
              borderRadius: "20px",
              padding: "5px",
              border: "2px solid #e6e8fd",
              margin: "20px",
              whiteSpace: 'pre-line'
            }}
          >
            {des}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchDetail;
