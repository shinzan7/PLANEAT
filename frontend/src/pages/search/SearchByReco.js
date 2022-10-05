/*
영양제 검색 페이지 > 영양제 추천
@author 전상현
@since 2022.09.19
*/
import React, {useState, useEffect } from 'react';
import CardNutrient from 'components/common/CardNutrient';
import { Grid } from "@mui/material";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import './Reco.css'
import {Link} from 'react-router-dom';
import { http } from "api/http";
import { useRecoilValue } from 'recoil' 
import { myTag } from 'states/userState'
// import { myHistory } from 'states/userHistory'


function SearchByReco() {
  const name = localStorage.getItem('name')

  const tagdata = useRecoilValue(myTag)
  const tag = tagdata.categoriesList
  // const historyData = useRecoilValue(myHistory)
  // console.log('hdata', historyData)

  const [info, setInfo] = useState([])

  useEffect(() => {
      http.get(`/nutrient/tag/${tag[0]}`)
      .then(response => {
        setInfo(response.data.data)
      })
    }, [])






  const settings = {
    dots: true,
    infinite: true,
    arrows: true,

    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 4
        }
    },
      {
        breakpoint: 1440,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3
        }
    },
      {
          breakpoint: 1080,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      },
      {
          breakpoint: 900,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      },
  ]
    
  };

  const section1 = { textAlign:'left', fontSize:'3.3vh'}
  const bold = {fontWeight:'bold'}
  const card = {textDecoration:'none', color:'black'}


  return (
      <div>
        <Grid container>
          <Grid item xs={0.5}>

          </Grid>
          <Grid item xs={9.8}>
            <div style={section1}>
              {/* 유저 식단 기반 분석에서 부족한 영양소 성분 기반 추천 */}
              {/* <p><span style={bold}>{name}</span> 님을 위한 영양제 추천</p> */}
              <p>&nbsp;&nbsp;PLANEAT이 <span style={bold}>{name}</span> 님에게 추천해요</p>
            </div>

            <div>
              <Slider {...settings}>
                {/* <div>
                  <Link to="/searchdetail/10" style={{textDecoration:'none'}}>
                    <CardNutrient pill={data}/>
                  </Link>
                </div> */}
              </Slider>
            </div>
          </Grid>
          <Grid item xs={1.7}>

          </Grid>

          <Grid item xs={0.5}>

          </Grid>
          <Grid item xs={9.8}>
            <div style={section1}>
              {/* 유저가 설정한 건강 고민 태그 기반 추천 */}
              <p>&nbsp;&nbsp;<span style={bold}>{tag[0]}</span>에 좋아요</p>
            </div>

            <div>
              <Slider {...settings}>
                {info.slice(0, 12).map((data, i) => (
                  <Link to={`/searchdetail/${data.nutrientId}`} style={{ textDecoration:'none'}}>
                    <CardNutrient key={i} pill={data} />
                  </Link>
                ))}
              </Slider>
            </div>
          </Grid>
          <Grid item xs={1.7}>

          </Grid>
        </Grid>
        <br></br>
        <br></br>
      </div>
  );
}

export default SearchByReco;