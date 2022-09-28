/*
영양제 검색 페이지 > 검색 결과(건강고민)
@author 전상현
@since 2022.09.22
*/
import React from "react";
import CardNutrient from "components/common/CardNutrient";
import { Grid } from "@mui/material";
import SideBar from "components/common/SideBar";
import {Link} from 'react-router-dom';


function TagResult() {
  const data = {
    img: "",
    nutrient_name: "락토핏 생유산균 화이버",
    company: "종근당",
    category_tag: ["장건강"],
    ingredient_name: ["차전자피식이섬유"],
  }

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh' }
  const card = { textAlign:'left' }

  return (
      <div style={section}>
          <Grid container> 
            {/* 좌측 사이드바 */}
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                {/* 중앙 상단 문구 */}
                <Grid item xs={4}>
                  <p>(건강 고민)개선에 도움이 되는 영양제들이에요.</p>
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
              </Grid>
              
              <div style={section3}>
                
              </div>
              
              <Grid container> 
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={8}>
                  <Grid container style={card}>
                    <Link to='/searchdetail/10' style={{textDecoration:'none'}}>
                      <CardNutrient pill={data}/>
                    </Link>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                    <CardNutrient pill={data}/>
                  </Grid>
                </Grid>
                <Grid item xs={3}>

                </Grid>  
              </Grid>

            </Grid>
          </Grid>
      </div>
  );
}

export default TagResult;