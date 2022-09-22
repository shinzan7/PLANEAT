/*
메인(식사기록)페이지
@author 여예원
@since 2022.09.22
*/

import * as React from 'react';
import BtnGray from "components/common/BtnGray";
import BtnMain from "components/common/BtnMain";
import ChipBlue from 'components/common/ChipBlue';
import ChipOrange from 'components/common/ChipOrange';
import ChipDeletable from 'components/common/ChipDeletable';
import CardNutrient from 'components/common/CardNutrient';
import Header from 'components/nav/Header';
import Footer from 'components/nav/Footer'
import Calendar from './Calendar';
import RegistMeal from './RegistMeal';
import { Grid, Item } from "@mui/material";
import { useState } from "react";
import { Box } from '@mui/system';
import "./Main.css"

function Main() {

    // const data = {
    //     img: "",
    //     nutrient_name: "락토핏 생유산균 화이버",
    //     company: "종근당",
    //     category_tag: ["장건강", "배변활동",  "배변활동", "배변활동", "배변활동", "배변활동"],
    //     ingredient_name: ["차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유"],
    // }
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) { 
        month = "0" + month;
    }

    if (day < 10) { 
        day = "0" + day;
    }

    const today = year + "-" + month + "-" + day;


    const [clickDate, setClickDate] = useState(today); // 딜력에서 선택된 날짜
    const [goodDays, setGoodDays] = useState([]); // 플래닛 지수 좋음
    const [normalDays, setNormalDays] = useState([]); // 플래닛 지수 보통
    const [badDays, setBadDays] = useState([]); // 플래닛 지수 나쁨

    return (
        <div>
            <Header></Header>
                <div id="wrap">   
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{padding: "0px"}}>
                    { /* 왼쪽 영역 */}
                    <Grid item style={{ background: "#FCFBFA", textAlign: "center", justifyContent: "center" }} xs={12} md={6} >
                        <Calendar
                            clickDate={clickDate}
                            setClickDate={ setClickDate }
                            goodDays={goodDays}
                            normalDays={normalDays}
                            badDays={ badDays}
                        ></Calendar>
                    </Grid>
                    <Grid item style={{ background: "#FCFBFA", textAlign:"center" }} xs={12} md={ 6}>
                        { /* 우측 영역 */}
                        <div>
                            <RegistMeal
                                clickDate={clickDate}
                            ></RegistMeal>
                        </div>
                    </Grid>
                </Grid>
                </div>
                <Footer></Footer>
        </div>
    );
}

export default Main;