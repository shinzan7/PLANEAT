/*
영양제 검색 페이지 > 건강고민으로 검색
@author 전상현
@since 2022.09.22
*/
import React from "react";
import TagMain from "components/common/TagMain";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SideBar from "components/common/SideBar";

function SearchByTag() {
  const userTags = [
    // 유저 카테고리 태그 id: 1 2 4 5 6 7 9 11 14 15 20 25 26 : 데이터 없음
    {
      id: "1",
      src: "assets/concerns/간건강.png",
      title: "간 건강",
    },
    {
      id: "2",
      src: "assets/concerns/갑상선건강.png",
      title: "갑상선 건강",
    },
    {
      id: "3",
      src: "assets/concerns/관절&뼈건강.png",
      title: "관절 & 뼈 건강",
    },
    {
      id: "4",
      src: "assets/concerns/기억력개선.png",
      title: "기억력 개선",
    },
    {
      id: "5",
      src: "assets/concerns/긴장완화.png",
      title: "긴장 완화",
    },
    {
      id: "6",
      src: "assets/concerns/남성건강.png",
      title: "남성 건강",
    },
    {
      id: "7",
      src: "assets/concerns/노화&항산화.png",
      title: "노화 & 항산화",
    },
    {
      id: "8",
      src: "assets/concerns/눈건강.png",
      title: "눈 건강",
    },
    {
      id: "9",
      src: "assets/concerns/두뇌활동.png",
      title: "두뇌활동",
    },
    {
      id: "10",
      src: "assets/concerns/면역기능.png",
      title: "면역 기능",
    },
    {
      id: "11",
      src: "assets/concerns/모발&손톱건강.png",
      title: "모발 & 손톱건강",
    },
    {
      id: "12",
      src: "assets/concerns/스트레스&수면.png",
      title: "스트레스 & 수면",
    },
    {
      id: "13",
      src: "assets/concerns/여성건강.png",
      title: "여성 건강",
    },
    {
      id: "14",
      src: "assets/concerns/운동능력개선.png",
      title: "운동 능력 개선",
    },
    {
      id: "15",
      src: "assets/concerns/위건강&소화.png",
      title: "위 건강 & 소화기능",
    },
    {
      id: "16",
      src: "assets/concerns/장건강.png",
      title: "장 건강",
    },
    // {
    //   id: "18",
    //   src: "assets/concerns/체액농도밸런스.png",
    //   title: "체액 농도 밸런스",
    // },
    {
      id: "19",
      src: "assets/concerns/체지방감소.png",
      title: "체지방 감소",
    },
    {
      id: "20",
      src: "assets/concerns/칼슘흡수촉진.png",
      title: "칼슘 흡수 촉진",
    },
    {
      id: "21",
      src: "assets/concerns/피로감.png",
      title: "피로 개선",
    },
    {
      id: "22",
      src: "assets/concerns/피부건강.png",
      title: "피부 건강",
    },
    {
      id: "23",
      src: "assets/concerns/항산화.png",
      title: "항산화",
    },
    {
      id: "24",
      src: "assets/concerns/혈관&혈액순환.png",
      title: "혈관 & 혈액순환",
    },
    {
      id: "25",
      src: "assets/concerns/혈당.png",
      title: "혈당조절",
    },
    {
      id: "26",
      src: "assets/concerns/혈압.png",
      title: "혈압 조절",
    },
    {
      id: "27",
      src: "assets/concerns/혈중콜레스테롤.png",
      title: "혈중 콜레스테롤 개선",
    },
  ];

  return (
    <div id="wrap">
      <Grid container>
        {/* 상단 문구 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{
            background: "#E6E8FD",
            borderRadius: "25px",
            margin: "20px",
            padding: "10px",
            boxShadow: "1px 2px 6px #c7c7c7",
          }}
        >
          {/* 약 이미지 */}
          <Grid item xs={3.5} style={{ textAlign: "right" }}>
            <img
              src="assets/capsules.png"
              style={{ width: "90px", height: "90px" }}
            />
          </Grid>
          {/* 문구 */}
          <Grid item xs={5} style={{ marginLeft: "30px" }}>
            <Typography
              variant="h5"
              style={{ marginBottom: "10px", fontWeight: "bold" }}
            >
              어떤 건강 고민이 있으신가요?
            </Typography>
            <Typography variant="subtitle1">
              건강 고민별 영양제를 확인하세요!
            </Typography>
          </Grid>
        </Grid>
        {/* 사이드 바 */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        {/* 태그 */}
        <Grid item xs={9} style={{ marginTop: "30px", marginBottom: "50px" }}>
          <Grid container justifyContent="center">
            <Grid item xs={9}>
              <Grid container justifyContent="center">
                {userTags.map((data, i) => (
                  <Link
                    to={`/tagresult/${data.title}`}
                    style={{ textDecoration: "none", color: "black" }}
                    key={i}
                  >
                    <TagMain key={i} src={data.src} tag={data.title} />
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchByTag;
