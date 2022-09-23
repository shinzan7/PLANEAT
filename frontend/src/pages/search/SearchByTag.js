/*
영양제 검색 페이지 > 건강고민으로 검색
@author 전상현
@since 2022.09.22
*/
import React from "react";
import Header from 'components/nav/Header';
import TagMain from "components/common/TagMain";
import { Grid } from "@mui/material";
import {Link} from 'react-router-dom';
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";


function SearchByTag() {
  const userTags = [
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
      title: "노화",
    },
    {
      id: "8",
      src: "assets/concerns/눈건강.png",
      title: "눈 건강",
    },
    {
      id: "9",
      src: "assets/concerns/두뇌활동.png",
      title: "두뇌 활동",
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
      title: "운동능력 개선",
    },
    {
      id: "15",
      src: "assets/concerns/위건강&소화.png",
      title: "위건강 & 소화기능",
    },
    {
      id: "16",
      src: "assets/concerns/장건강.png",
      title: "장 건강",
    },
    {
      id: "17",
      src: "assets/concerns/체액농도밸런스.png",
      title: "체액 농도 밸런스",
    },
    {
      id: "18",
      src: "assets/concerns/체지방감소.png",
      title: "체지방 감소",
    },
    {
      id: "19",
      src: "assets/concerns/칼슘흡수촉진.png",
      title: "칼슘 흡수 촉진",
    },
    {
      id: "20",
      src: "assets/concerns/피로감.png",
      title: "피로감",
    },
    {
      id: "21",
      src: "assets/concerns/피부건강.png",
      title: "피부 건강",
    },
    {
      id: "22",
      src: "assets/concerns/항산화.png",
      title: "항산화",
    },
    {
      id: "23",
      src: "assets/concerns/혈관&혈액순환.png",
      title: "혈관 & 혈액순환",
    },
    {
      id: "24",
      src: "assets/concerns/혈당.png",
      title: "혈당",
    },
    {
      id: "25",
      src: "assets/concerns/혈압.png",
      title: "혈압",
    },
    {
      id: "26",
      src: "assets/concerns/혈중콜레스테롤.png",
      title: "혈중 콜레스테롤",
    },
  ];

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh' }

  return (
      <div style={section}>
        <Header />
        <Grid container> 
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                
                <Grid item xs={4}>
                  <SearchBar />
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
            </Grid>

            <div style={section3}>
                
            </div>
              
            <Grid container>
              <Grid item xs={2}>

              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  
                    {userTags.map((data, i) => (   
                      <Link to="/searchresult" style={{textDecoration:'none', color:'black'}}>          
                        <TagMain
                        key={i}
                        src={data.src}
                        tag={data.title}
                      />
                      </Link>
                    ))}
                  
                </Grid>
              </Grid>
              <Grid item xs={2}>

              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}

export default SearchByTag;