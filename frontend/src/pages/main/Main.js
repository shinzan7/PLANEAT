// 식사 기록 페이지

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
import { Grid, Item } from "@mui/material";
import { useState } from "react";

function Main() {

    // const data = {
    //     img: "",
    //     nutrient_name: "락토핏 생유산균 화이버",
    //     company: "종근당",
    //     category_tag: ["장건강", "배변활동",  "배변활동", "배변활동", "배변활동", "배변활동"],
    //     ingredient_name: ["차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유"],
    // }

    const [clickDate, setClickDate] = useState(new Date());
    const [goodDays, setGoodDays] = useState([]);
    const [normalDays, setNormalDays] = useState([]);
    const [badDays, setBadDays] = useState([]);

    return (
        <div>
            <Header></Header>
                <div id="wrap">   
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{padding: "0px"}}>
                    <Grid item style={{ background: "red", textAlign:"center", justifyContent:"center"}} xs={12} md={ 6} >
                        <Calendar
                            clickDate={clickDate}
                            goodDays={goodDays}
                            normalDays={normalDays}
                            badDays={ badDays}
                            setClickDate={ setClickDate }
                        ></Calendar>
                    </Grid>
                    <Grid item style={{ background: "blue", textAlign:"center" }} xs={12} md={ 6}>
                        
                    </Grid>
                </Grid>
                </div>
                <Footer></Footer>
        </div>
    );
}

export default Main;