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
import { userState } from 'states/userState'
import { useRecoilValue } from 'recoil'

function SearchDetail() {

  const { nutrientId }  = useParams();
  // console.log('params', nutrientId)
  const userInfo = useRecoilValue(userState)
  console.log('userInfo', userInfo[8])

  const section = {marginTop:'80px'}
  const bold = {fontWeight:'bold'}
  const text = {textAlign:'left'}
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh'}
  const section4 = { marginTop:'5vh'}

  const [info, setInfo] = useState({
    imagePath: '',
    nutrientName: '',
    company: '',
    description: '',
    nutriIngredientList: [],
  })


  useEffect(() => {
    // const url = `https://j7a701.p.ssafy.io/api/nutrient?id=1` 
    http.get(`/nutrient?id=${nutrientId}`)
    // http.get('/nutrient?id=1')
    .then(response => {
      console.log(response.data.data)
      setInfo(response.data.data)
    })
  }, [])
  
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
                {/* 영양제 정보 카드 */}
                <Grid item xs={8} style={text}>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardNutrient pill={info} />
                    </Grid>
                    <Grid item xs={0.5}>
                      
                    </Grid>
                    {/* 상세 정보 */}
                    <Grid item xs={7.5}>
                      <div>
                        <div style={section4}>
                          <p style={bold}>상세정보</p>
                          <p>{info.description}</p> 
                          <p>{info.nutriIngredientList.ingredientName}</p>
                          <p>{info.nutriIngredientList.categoryTagList}</p>        
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  
                </Grid>
              </Grid>
              <div style={section3}>
                
              </div>
            </Grid>
          </Grid>
          
      </div>
  );
}

export default SearchDetail;