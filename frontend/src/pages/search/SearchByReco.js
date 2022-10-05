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




function SearchByReco() {
  const name = localStorage.getItem('name')

  // window.onload = function() {
  //   if(window.location === 'http://localhost:3000/search') {
  //       window.location = window.location + '#loaded';
  //       window.location.reload();
  //   }
  // }

  // const tagdata = useRecoilValue(myTag)
  // console.log('td', tagdata)
  // const tag = tagdata.categoriesList
  // console.log('tag', tag)
  const [tag, setTag] = useState([])
  const [info, setInfo] = useState([])
  // const [history, setHistory] = useState([])
  // console.log('h', history)

  // const today = new Date()
  // const year = today.getFullYear().toString()
  // const tmpMonth = today.getMonth() + 1
  // const month = tmpMonth + 1 < 10 ? "0" + tmpMonth : "" + tmpMonth
  // const tmpDay = today.getDate()
  // const day = tmpDay < 10 ? "0" + tmpDay : "" + tmpDay

  console.log(tag)
  useEffect(() => {
      http.get('/user-infos/8')
      .then(response => {
        // console.log(response.data.data)
        setTag(response.data.data.categoriesList)
      })

      if (tag) {
        http.get(`/nutrient/tag/${tag[0]}`)
        .then(response => {
          setInfo('info', response.data.data)
        })
      }
      // http.get(`/nutrient/tag/${tag[0]}`)
      // .then(response => {
      //   setInfo(response.data.data)
      // })
      // console.log('td', tagdata)

      // http.get(`/analysis/percent?date=${year}-${month}-${day}&userId=${userId}`)
      // http.get('/analysis/percent?date=2022-09-26&userId=8')
      // .then(response => {
      //   setHistory(response.data.data)
      // })
    }, [])


    console.log(info)
    // const history2 = Object.entries(history)
    // console.log(history2)
  
    // const history3 = [history2[10], history2[17], history2[9], history2[23], history2[11], history2[12],
    //                   history2[14], history2[18], history2[5], history2[19], history2[20], history2[31], 
    //                   history2[32], history2[22], history2[25], history2[24], history2[21], history2[16]]
    
    // console.log(history3)
    // const history4 = []
  
    // for (var i=0; i<history3.length; i++) {
    //   history4.push(history3[i][1])
    // }

    // console.log(history4)

    // const history5 = []
    // for (var j=0; j<history4.length; j++) {
    //   if ( history4[j] === Math.min.apply(null, history4) ) {
    //     history5.push(j)
    //   }
    // }
    // console.log(history5)

    // const numbers = [7, 14, 6, 22, 8, 9, 15, 11, 2, 16, 17, 19, 20, 21, 23, 24, 18, 13]
    // const num = numbers[history5[0]]

    // console.log('n', num)



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
              {/* <Link to={`/nutrientresult/${num}`} style={{ textDecoration:'none' }}> */}
                <p>&nbsp;&nbsp;PLANEAT이 <span style={bold}>{name}</span> 님에게 추천하는 영양제 보러가기</p>
              {/* </Link> */}
            </div>
          </Grid>
          <Grid item xs={1.7}>

          </Grid>

          <Grid item xs={0.5}>

          </Grid>
          <Grid item xs={9.8}>
            <div style={section1}>
              {/* 유저가 설정한 건강 고민 태그 기반 추천 */}
              {/* <p>&nbsp;&nbsp;<span style={bold}>{tag[0]}</span>에 좋아요</p> */}
            </div>

            <div>
              {/* <Slider {...settings}>
                {info.slice(0, 12).map((data, i) => (
                  <Link to={`/searchdetail/${data.nutrientId}`} style={{ textDecoration:'none'}}>
                    <CardNutrient key={i} pill={data} />
                  </Link>
                ))}
              </Slider> */}
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