/*
영양제 검색 페이지 > 성분으로 검색
@author 전상현
@since 2022.09.19
*/
import React from "react";
import TagNute from "components/common/TagNute";
import { Grid, Typography } from "@mui/material";
import SideBar from "components/common/SideBar";
import { Link } from "react-router-dom";

function SearchByNutrient() {
  const nuterientTags = [
    // {
    //   id: "1",
    //   title: "에너지",
    // },
    {
      id: "2",
      title: "단백질",
    },
    // {
    //   id: "3",
    //   title: "지방",
    // },
    // {
    //   id: "4",
    //   title: "탄수화물",
    // },
    // {
    //   id: "5",
    //   title: "총당류",
    // },
    {
      id: "6",
      title: "식이섬유",
    },
    {
      id: "7",
      title: "칼슘",
    },
    {
      id: "8",
      title: "철",
    },
    {
      id: "9",
      title: "마그네슘",
    },
    // {
    //   id: "10",
    //   title: "인",
    // },
    {
      id: "11",
      title: "칼륨",
    },
    // {
    //   id: "12",
    //   title: "나트륨",
    // },
    {
      id: "13",
      title: "아연",
    },
    {
      id: "14",
      title: "구리",
    },
    {
      id: "15",
      title: "망간",
    },
    {
      id: "16",
      title: "셀레늄",
    },
    {
      id: "17",
      title: "비타민A",
    },
    {
      id: "18",
      title: "비타민D",
    },
    {
      id: "19",
      title: "비타민B1",
    },
    {
      id: "20",
      title: "비타민B2",
    },
    {
      id: "21",
      title: "비타민B6",
    },
    {
      id: "22",
      title: "엽산",
    },
    {
      id: "23",
      title: "비타민B12",
    },
    {
      id: "24",
      title: "비타민C",
    },
    // {
    //   id: "25",
    //   title: "콜레스테롤",
    // },
    // {
    //   id: "26",
    //   title: "총 포화 지방산",
    // },
    {
      id: "27",
      title: "오메가6",
    },
    {
      id: "28",
      title: "오메가3",
    },
    // {
    //   id: "29",
    //   title: "트랜스 지방산",
    // },
    // {
    //   id: "30",
    //   title: "비타민E",
    // },
    // {
    //   id: "31",
    //   title: "프로바이오틱스",
    // },
    // {
    //   id: "32",
    //   title: "판토텐산",
    // },
    // {
    //   id: "33",
    //   title: "진세노이드",
    // },
    // {
    //   id: "34",
    //   title: "나이아신",
    // },
    // {
    //   id: "35",
    //   title: "비오틴",
    // },
    // {
    //   id: "36",
    //   title: "루테인",
    // },
    // {
    //   id: "37",
    //   title: "기르시니아캄보지아 추출물",
    // },
    // {
    //   id: "38",
    //   title: "실리마린",
    // },
    // {
    //   id: "39",
    //   title: "프락토올리고당",
    // },
    // {
    //   id: "40",
    //   title: "총플라보노이드",
    // },
    // {
    //   id: "41",
    //   title: "무수바바로인",
    // },
    // {
    //   id: "42",
    //   title: "카테킨",
    // },
    // {
    //   id: "43",
    //   title: "MSM",
    // },
    // {
    //   id: "44",
    //   title: "옥타코사놀",
    // },
    // {
    //   id: "45",
    //   title: "베타카로틴",
    // },
    // {
    //   id: "46",
    //   title: "비타민K",
    // },
    // {
    //   id: "47",
    //   title: "코엔자임Q10",
    // },
    // {
    //   id: "48",
    //   title: "로르산",
    // },
    // {
    //   id: "49",
    //   title: "아스타잔틴",
    // },
    // {
    //   id: "50",
    //   title: "플라보놀배당체",
    // },
    // {
    //   id: "51",
    //   title: "몰리브덴",
    // },
    // {
    //   id: "52",
    //   title: "요오드",
    // },
    // {
    //   id: "53",
    //   title: "L-테아닌",
    // },
    // {
    //   id: "54",
    //   title: "지아잔틴",
    // },
    // {
    //   id: "55",
    //   title: "히알루론산",
    // },
    // {
    //   id: "56",
    //   title: "총엽록소",
    // },
    // {
    //   id: "57",
    //   title: "HCA",
    // },
    // {
    //   id: "58",
    //   title: "N-아세틸글루코사민",
    // },
    // {
    //   id: "59",
    //   title: "로사빈",
    // },
    // {
    //   id: "60",
    //   title: "프로바이오틱스균수",
    // },
    // {
    //   id: "61",
    //   title: "키토산",
    // },
    // {
    //   id: "62",
    //   title: "코로솔산",
    // },
    // {
    //   id: "63",
    //   title: "총안토시아노사이드",
    // },
    // {
    //   id: "64",
    //   title: "총모나콜린K",
    // },
    // {
    //   id: "65",
    //   title: "글루코사민염산염",
    // },
    // {
    //   id: "66",
    //   title: "폴리감마글루탐산",
    // },
    // {
    //   id: "67",
    //   title: "감초 추출물",
    // },
    // {
    //   id: "68",
    //   title: "피브린용해효소활성",
    // },
    // {
    //   id: "69",
    //   title: "포스파티딜세린",
    // },
    // {
    //   id: "70",
    //   title: "글루코사민황산염",
    // },
    // {
    //   id: "71",
    //   title: "대두이소플라본",
    // },
    // {
    //   id: "72",
    //   title: "테아닌",
    // },
    // {
    //   id: "73",
    //   title: "노다케닌",
    // },
    // {
    //   id: "74",
    //   title: "자일로올리고당",
    // },
    // {
    //   id: "75",
    //   title: "퀘르세틴",
    // },
  ];

  const section = { marginTop: "80px" };
  const section1 = { marginTop: "25vh", textAlign: "center" };
  const section2 = { marginTop: "5vh", textAlign: "center" };
  const section3 = { marginTop: "10vh" };

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
            background: "#FFEFC9",
            borderRadius: "25px",
            margin: "20px",
            padding: "10px",
            boxShadow: "1px 2px 6px #c7c7c7",
          }}
        >
          {/* 약 이미지 */}
          <Grid item xs={3.5} style={{ textAlign: "right" }}>
            <img
              src="assets/drug.png"
              style={{ width: "90px", height: "90px" }}
            />
          </Grid>
          {/* 문구 */}
          <Grid item xs={5} style={{ marginLeft: "30px" }}>
            <Typography
              variant="h5"
              style={{ marginBottom: "10px", fontWeight: "bold" }}
            >
              어떤 성분을 찾으시나요?
            </Typography>
            <Typography variant="subtitle1">
              성분별로 영양제를 확인하세요!
            </Typography>
          </Grid>
        </Grid>
        {/* 사이드 바 */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        {/* 태그 */}
        <Grid item xs={10} style={{ marginTop: "30px", marginBottom: "50px" }}>
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              <Grid container justifyContent="center">
                {nuterientTags.map((data, i) => (
                  <Link
                    to={`/nutrientresult/${data.id}`}
                    state={{ data: data }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <TagNute key={i} tag={data.title} index={i + 1} />
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

export default SearchByNutrient;
