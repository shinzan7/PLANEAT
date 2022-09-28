/*
영양제 검색 페이지 > 영양제 상세정보
@author 전상현
@since 2022.09.22
*/

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import CardNutrient from "components/common/CardNutrient";
import Header from 'components/nav/Header';
import { Grid } from "@mui/material";
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";
import { http } from "api/http";



function SearchDetail() {

  const { nutrientId }  = useParams();
  console.log('params', nutrientId)

  const section = {marginTop:'80px'}
  const bold = {fontWeight:'bold'}
  const text = {textAlign:'left'}
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh'}
  const section4 = { marginTop:'5vh'}

  const [info, setInfo] = useState()

  useEffect(() => {
    // const url = `https://j7a701.p.ssafy.io/api/nutrient?id=1` 
    http.get(`/nutrient?id=${nutrientId}`)
    // http.get('/nutrient?id=1')
    .then(response => {
      console.log(response.data.data)
      setInfo(response.data.data)
    })
  }, [])

  // const data = {
  //   img: info.imagePath,
  //   nutrient_name: info.nutrientName,
  //   company: info.company ,
  //   category_tag: [info.nutriIngredientList[0].categoryTagList[0]],
  //   ingredient_name: [info.nutriIngredientList[0].ingredientName],
  // }

  const data = {
    img: "",
    nutrient_name: "락토핏 생유산균 화이버",
    company: "종근당",
    category_tag: ["장건강"],
    ingredient_name: ["차전자피식이섬유"],
  }
  
  return (
      <div style={section}>
        <Header />
          <Grid container> 
            {/* 좌측 사이드바 */}
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                {/* 검색창 */}
                <Grid item xs={4}>
                  <SearchBar />
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
              </Grid>
              
              <div style={section3}>
                
              </div>

              <Grid container>
                <Grid item xs={1}>
          
                </Grid>
                <Grid item xs={8} style={text}>
                  <CardNutrient pill={data} />
                  <div>
                    <div style={section4}>
                      <p style={bold}>상세정보</p>
                      <p>상세정보</p>
                      {/* <p>{info.nutriIngredientList[0].ingredientName}</p>  
                      <p>{info.nutriIngredientList[0].categoryTagList}</p>        */}
                    </div>
                    <div style={section4}>
                      <p style={bold}>섭취방법</p>
                      <p>1일 2회</p>
                      {/* <p>{info.description}</p>  */}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  
                </Grid>
              </Grid>
              
            </Grid>
          </Grid>


      
      </div>
  );
}

export default SearchDetail;