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
import DailyMeal from "./DailyMeal";
import "./Main.css"

function Main() {

    // const data = {
    //     img: "",
    //     nutrient_name: "락토핏 생유산균 화이버",
    //     company: "종근당",
    //     category_tag: ["장건강", "배변활동",  "배변활동", "배변활동", "배변활동", "배변활동"],
    //     ingredient_name: ["차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유"],
    // }

    // 오늘 날짜 구하기
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
    const [goodDays, setGoodDays] = useState(["2022-09-01", "2022-09-03", "2022-09-10", "2022-09-17", "2022-09-21"]); // 플래닛 지수 좋음
    const [normalDays, setNormalDays] = useState(["2022-09-30", "2022-09-14"]); // 플래닛 지수 보통
    const [badDays, setBadDays] = useState(["2022-09-02", "2022-09-04"]); // 플래닛 지수 나쁨
    const [breakfastAmount, setBreakfastAmount] = useState("350"); // 아침 칼로리
    const [lunchAmount, setLunchAmount] = useState("200"); // 점심 칼로리
    const [dinnerAmount, setDinnerAmount] = useState("500"); // 저녁 칼로리
    const [snackAmount, setsnackAmount] = useState("100"); // 간식 칼로리

    return (
        <div>
            <Header></Header>
                <div id="wrap">   
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{padding: "0px"}}>
                    { /* 왼쪽 영역 */}
                    <Grid item style={{ background: "#FCFBFA", textAlign: "center", justifyContent: "center" }} xs={12} md={6} >
                        <Calendar
                            clickDate={clickDate}
                            setClickDate={setClickDate}
                            goodDays={goodDays}
                            normalDays={normalDays}
                            badDays={badDays}
                        ></Calendar>
                    </Grid>
                    <Grid item style={{ background: "#FCFBFA", textAlign:"center" }} xs={12} md={ 6}>
                        { /* 우측 영역 */}
                        <Grid style={{margin: "auto"}}>
                            <RegistMeal
                                clickDate={clickDate}
                                breakfastAmount={breakfastAmount}
                                setBreakfastAmount={setBreakfastAmount}
                                lunchAmount={lunchAmount}
                                setLunchfastAmount={setLunchAmount}
                                dinnerAmount={dinnerAmount}
                                setDinnerAmount={setDinnerAmount}
                                snackAmount={snackAmount}
                                setsnackAmount={setsnackAmount}
                            ></RegistMeal>
                            <DailyMeal
                                clickDate={clickDate}
                            ></DailyMeal>
                        </Grid>
                    </Grid>
                </Grid>
                </div>
            <Footer></Footer>
        </div>
    );
}

export default Main;

/*
메인에서 관리하는 정보 : 클릭 날짜 , 식사기록 데이터
Calendar: 클릭날짜, 클릭셑함수, 평가별 날짜배열 (좋음, 보통, 나쁨)
RegistMeal : 클릭 날짜, 식사기록 데이터 중 아/점/저/간 섭취 칼로리 양
DailyMeal : 식사기록 데이터 전부
*/