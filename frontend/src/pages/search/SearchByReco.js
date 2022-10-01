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
import {Link} from 'react-router-dom';
import { http } from "api/http";

function SearchByReco() {
  const data = {
    img: "",
    nutrient_name: "락토핏 생유산균 화이버",
    company: "종근당",
    category_tag: ["장건강"],
    ingredient_name: ["차전자피식이섬유"],
  }

  // const [info, setInfo] = useState({
  //   imagePath: '',
  //   nutrientName: '',
  //   company: '',
  //   description: '',
  //   nutriIngredientList: [],
  // })

  // useEffect(() => {
  //   http.get('/nutrient/all')
  //   .then(response => {
  //     console.log('전체', response.data[0])
  //     // setInfo(response.data.data)
  //   })
  // }, [])

  const name = localStorage.getItem('name')

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
  const card = {textAlign:'left'}


  return (
      <div>
        <Grid container>
          <Grid item xs={0.5}>

          </Grid>
          <Grid item xs={9.8}>
            <div style={section1}>
              {/* 유저 식단 기반 분석에서 부족한 영양소 성분 기반 추천 */}
              <p><span style={bold}>{name}</span> 님을 위한 영양제 추천</p>
              <p>&nbsp;&nbsp;PLANEAT이 <span style={bold}>{name}</span> 님에게 추천해요</p>
            </div>

            <div style={card}>
              <Slider {...settings}>
                <div>
                  <Link to="/searchdetail/10" style={{textDecoration:'none'}}>
                    <CardNutrient pill={data}/>
                  </Link>
                </div>
                <div>
                  <Link to="/searchdetail/7" style={{textDecoration:'none'}}>
                    <CardNutrient pill={data}/>
                  </Link>
                </div>
                <div>
                  <Link to="/searchdetail/12" style={{textDecoration:'none'}}>
                    <CardNutrient pill={data}/>
                  </Link>
                </div>
                <div>
                  <Link to="/searchdetail/13" style={{textDecoration:'none'}}>
                    <CardNutrient pill={data}/>
                  </Link>
                </div>

                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>

                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
              </Slider>
            </div>
          </Grid>
          <Grid item xs={1.7}>

          </Grid>

          <Grid item xs={0.5}>

          </Grid>
          <Grid item xs={9.8}>
            <div style={section1}>
              {/* 유저 동일 성별/나이대에서 많이 등록된 영양소 순서 대로 추천 */}
              <p>&nbsp;&nbsp;<span style={bold}>20대 여성</span>이 많이 먹고 있어요</p>
            </div>

            <div style={card}>
              <Slider {...settings}>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>

                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>

                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
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
              <p>&nbsp;&nbsp;<span style={bold}>장건강</span>에 좋아요</p>
            </div>

            <div style={card}>
              <Slider {...settings}>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>

                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>

                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
                <div>
                  <CardNutrient pill={data}/>
                </div>
              </Slider>
            </div>
          </Grid>
          <Grid item xs={1.7}>

          </Grid>
        </Grid>
      </div>
  );
}

export default SearchByReco;