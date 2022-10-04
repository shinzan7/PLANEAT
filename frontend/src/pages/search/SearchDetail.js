/*
영양제 검색 페이지 > 영양제 상세정보
@author 전상현
@since 2022.09.22
*/

import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import Header from 'components/nav/Header';
import { Grid } from "@mui/material";
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";
import { http } from "api/http";
import { userState } from 'states/userState'
import { useRecoilValue } from 'recoil'
import ChipBlue from "components/common/ChipBlue";
import ChipOrange from "components/common/ChipOrange";
import CardNutrient from "components/common/CardNutrient";

function SearchDetail() {

  const { nutrientId }  = useParams();
  // console.log('params', nutrientId)
  const userInfo = useRecoilValue(userState)
  console.log(userInfo)


  const section = {marginTop:'80px'}
  const bold = {fontWeight:'bold'}
  const text = {textAlign:'left'}
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh'}

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

  const tagArray = []

  for (var i = 0; i < info.nutriIngredientList.length; i++) {
    for (var j = 0; j < info.nutriIngredientList[i].categoryTagList.length; j++) {
      tagArray.push(info.nutriIngredientList[i].categoryTagList[j])
    }
  }

  const tagSet = new Set(tagArray)
  const tags = Array.from(tagSet)
  
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
                {/* 영양제 이미지 */}
                <grid item xs={8} style={text}>
                  <Grid container>
                    <Grid item xs={2.5} style={{textAlign:'center'}}>
                      {/* <img src={info.imagePath} alt='' style={{ width:'15vw', height: '15vh'}}/>
                      <br></br>
                      <br></br>
                      <p>{info.company}</p>
                      <p style={bold}>{info.nutrientName} </p>  */}
                      <CardNutrient pill={info}/>
                    </Grid>
                    <Grid item xs={0.2}>

                    </Grid>
                    <Grid item xs={7.3}>
                      <p>주요기능</p>
                      {tags.map((data, i) => (
                        <Link to={'/tagresult/'+ data} style={{textDecoration:'none'}}>
                          <ChipOrange key={i} label={data} />
                        </Link>
                      ))}
                      <p>성분</p>
                      {info.nutriIngredientList.map((data, i) => (
                          <ChipBlue key={i} label={data.ingredientName} /> 
                      ))}
                      <p>상세정보</p>
                      <p>{info.description}</p>
                    </Grid>
                    <Grid item xs={2}>
                      
                    </Grid>
                  </Grid>
                </grid>
              <div style={section3}>
                
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}

export default SearchDetail;