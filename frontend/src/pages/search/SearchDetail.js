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
import './Detail.css'
import { indigo } from "@mui/material/colors";

function SearchDetail() {

  const { nutrientId }  = useParams();
  // console.log('params', nutrientId)
  const userInfo = useRecoilValue(userState)
  // console.log(userInfo)


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
    http.get(`/nutrient?id=${nutrientId}`)
    .then(response => {
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

  const des = info.description.replace(/\[/gi, '').replace(/\]/gi, '').replace(/\'/gi, '\n').replace(/,/gi, ' ')
              .replace(/①/gi, '\n').replace(/②/gi, '\n').replace(/③/gi, '\n').replace(/④/gi, '\n').replace(/⑤/gi, '\n')
              .replace(/1\)/gi, '\n').replace(/2\)/gi, '\n').replace(/3\)/gi, '\n').replace(/4\)/gi, '\n').replace(/5\)/gi, '\n')
              .replace(/1\./gi, '\n').replace(/2\./gi, '\n').replace(/3\./gi, '\n').replace(/4\./gi, '\n').replace(/5\./gi, '\n')
              .replace(/-/gi, '\n')
              .replace(/\(가\)/gi, '\n').replace(/\(나\)/gi, '\n').replace(/\(다\)/gi, '\n').replace(/\(라\)/gi, '\n').replace(/\(마\)/gi, '\n')

  
  // const ingredients = []
  // for (var k=0; k<info.nutriIngredientList.length; k++) {
  //   ingredients.push(info.nutriIngredientList[k].ingredientName)
  // }


  // const ingredientNames = ['단백질', '식이섬유', '칼슘', '철', '마그네슘', '칼륨', '아연', '구리', '망간',
  //                         '셀레늄', '비타민A', '비타민D', '비타민B1', '비타민B2', '비타민B6', '엽산',
  //                         '비타민B12', '비타민C', '오메가6', '오메가3']
  // const ingredientNumbers= [2, 6, 7, 8, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28]
  // const nums = []

  // for (var x=0; x<ingredientNames.length; x++) {
  //   for (var y=0; y<ingredients.length; y++) {
  //     if (ingredients[y] === ingredientNames[x]) {
  //       nums.push(ingredientNumbers[x])
  //     }
  //   }
  // }
  
  


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
                {/* 영양제 이미지 */}
                <grid item xs={9} style={text}>
                  <Grid container>
                    <Grid item xs={12} md={2.5} style={{textAlign:'center'}}>
                      <CardNutrient pill={info}/>
                    </Grid>
                    <Grid item xs={0.5}>

                    </Grid>
                    <Grid item xs={7}>
                      <p style={{ fontWeight:'bold', fontSize:'20px'}}>주요기능</p>
                      {tags.map((data, i) => (
                        <Link to={'/tagresult/'+ data} style={{textDecoration:'none'}}>
                          <ChipOrange key={i} label={data} style={{marginRight:'5px', marginBottom:'5px'}}/>
                        </Link>
                      ))}
                      <p style={{ fontWeight:'bold', fontSize:'20px'}}>성분</p>
                      {info.nutriIngredientList.map((data, i) => (
                        <ChipBlue key={i} label={data.ingredientName} style={{marginRight:'5px', marginBottom:'5px'}}/>               
                      ))}
                      <p style={{ fontWeight:'bold', fontSize:'20px'}}>상세정보</p>
                      <p className="description">{des}</p>
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