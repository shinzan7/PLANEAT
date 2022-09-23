/*
영양제 검색 페이지 > 성분으로 검색
@author 전상현
@since 2022.09.19
*/
import React from "react";
import TagNute from "components/common/TagNute";
import { Grid } from "@mui/material";
import Header from 'components/nav/Header';
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";
import {Link} from 'react-router-dom';

function SearchByNutrient() {

  const nuterientTags = [
    {
      id: "1",
      title: "오메가3",
    },
    {
      id: "2",
      title: "프로바이오틱스",
    },
    {
      id: "3",
      title: "비타민C",
    },
    {
      id: "4",
      title: "가르시니아캄보지아",
    },
    {
      id: "5",
      title: "레시틴",
    },
    {
      id: "6",
      title: "코엔자임Q10",
    },
    {
      id: "7",
      title: "비타민B1",
    },
    {
      id: "8",
      title: "비타민A",
    },
    {
      id: "9",
      title: "칼슘",
    },
    {
      id: "10",
      title: "루테인",
    },
    {
      id: "11",
      title: "바나나잎 추출물",
    },
    {
      id: "12",
      title: "비타민D",
    },
    {
      id: "13",
      title: "글루코사민",
    },
    {
      id: "14",
      title: "옥타코사놀",
    },
    {
      id: "15",
      title: "쏘팔메토",
    },
    {
      id: "16",
      title: "비타민B6",
    },
    {
      id: "17",
      title: "셀레늄",
    },
    {
      id: "18",
      title: "폴리코사놀",
    },
    {
      id: "19",
      title: "엽산",
    },
    {
      id: "20",
      title: "공액리놀레산",
    },
    {
      id: "21",
      title: "비타민K",
    },
    {
      id: "22",
      title: "글라브리딘",
    },
    {
      id: "23",
      title: "크롬",
    },
    {
      id: "24",
      title: "녹차추출물",
    },
    {
      id: "25",
      title: "비타민E",
    },
  ];

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh'}

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
                  <p>원하는 성분을 포함한 영양제를 확인해보세요</p>
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
                    {nuterientTags.map((data, i) => (  
                      <Link to="/nutrientresult" style={{textDecoration:'none', color:'black'}}>           
                        <TagNute
                        key={i}
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

export default SearchByNutrient;