/*
메인 페이지
@author 전상현
@since 2022.09.15
*/

import React, { useState, useEffect } from 'react';
import './Home.css'
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
import BtnMain from 'components/common/BtnMain';
import SimpleTestModal from 'components/modal/home/SimpleTestModal';
import Google from './Google';
import Kakao from './Kakao';
import { Link } from "react-router-dom";


function Home() {
  const monitordiv = { width:'35vw', height:'45vh', marginTop:'20vh'}
  const logo = { width:'30vw', height:'12.5vh' , marginTop:'20vh'}
  const card = { height:'50vh', backgroundColor:'transparent', fontSize:'1.5vw', color:'white'}
  const textcard = { height:'50vh', backgroundColor:'transparent', border:'none'}
  const chip = { marginLeft: '20%'}

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => { setModalOpen(true);};
  const closeModal = () => {setModalOpen(false);};


  return (
    <div className="bgColor">
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={2}>

            </Grid>
          
            <Grid item xs={8}>
              <img src='assets/monitor.png' alt='' style={monitordiv}/>    
            </Grid>

            <Grid item xs={2}>

            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={1}>
              
            </Grid>

            <Grid item xs={7}>
              <img src="assets/longlogo.png" alt='' style={logo}/>
            </Grid>

            <Grid item xs={4}>

            </Grid>

            <div href="#" className='login'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

                    {/* &nbsp;&nbsp;&nbsp;
                  
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={button}>
                      <circle cx="42" cy="42.1411" r="41.2258" fill="#1BE43B"/>
                      <path d="M23.9636 25.8225V58.4596H36.5206V42.131L47.4476 58.4596H60.0247V25.8225H47.4476V42.131L36.5206 25.8225H23.9636Z" fill="white"/>
                    </svg>
                    &nbsp;&nbsp;&nbsp;
                    
                    {/* <Google /> */}
              <Google />
              <Kakao />
            </div>
              
            <div style={chip}>
              <BtnMain onClick={openModal} width='23vw' height='5vh'>
                PLANEAT 체험하기
              </BtnMain>
              <SimpleTestModal open={modalOpen} close={closeModal} />
            </div>

          </Grid> 
        </Grid>
      </Grid>

      <div className='section2'>
        <p>
          식단 기록을 통해<br></br>
          부족한 영양분을 알아보세요
        </p>
        <div className='cardsection'>
          <Grid container>
            <Grid item xs={0.9}>

            </Grid>
            <Grid item xs={4.8}>
              <Card variant="outlined" style={card}>
                식사 등록 화면
              </Card>
            </Grid>
            <Grid item xs={0.6}>

            </Grid>
            <Grid item xs={4.8}>
              <Card variant="outlined" style={card}>
                식사 영양 상세 정보 화면
              </Card>
            </Grid>
            <Grid item xs={0.9}>

            </Grid>
          </Grid>
        </div>
      </div>

      <div className='section3'>
        <Grid container>
          <Grid item xs={0.9}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={textcard}>
              <p className='p'>
                내가 필요한 영양제를<br></br>
                쉽고 빠르게 찾아보세요
              </p>
            </Card>
          </Grid>
          <Grid item xs={0.6}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={card}>
              영양제 추천 화면
            </Card>
          </Grid>
          <Grid item xs={0.9}>

          </Grid>
        </Grid>
      </div>

      <div className='section4'>
        <Grid container>
          <Grid item xs={0.9}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={card}>
              영양제 추천 화면
            </Card>
          </Grid>
          <Grid item xs={0.6}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={textcard}>
              <p className='p'>
                월간 통계를 통해<br></br>
                식단을 점검해보세요
              </p>
            </Card>
          </Grid>
          <Grid item xs={0.9}>

          </Grid>
        </Grid>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default Home;
