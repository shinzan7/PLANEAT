// 식사 기록 페이지

import * as React from 'react';
import BtnGray from "components/common/BtnGray";
import BtnMain from "components/common/BtnMain";
import ChipBlue from 'components/common/ChipBlue';
import ChipOrange from 'components/common/ChipOrange';
import ChipDeletable from 'components/common/ChipDeletable';
import CardNutrient from 'components/common/CardNutrient';
import Header from 'components/nav/Header';
import Footer from 'components/nav/Footer';
import Calendar from './Calendar';

function Main() {

    const data = {
        img: "",
        nutrient_name: "락토핏 생유산균 화이버",
        company: "종근당",
        category_tag: ["장건강", "배변활동",  "배변활동", "배변활동", "배변활동", "배변활동"],
        ingredient_name: ["차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유","차전자피식이섬유"],
    }

    return (
        <div>
            <Header></Header>
                <div style={{ marginTop: 80 }}>   
                <Calendar></Calendar>
                <BtnGray>회색버튼</BtnGray>
            <BtnMain>메인버튼</BtnMain>
            <ChipBlue label="갈비치킨피자"></ChipBlue>
            <ChipOrange label="갈비치킨피자"></ChipOrange>
            <ChipDeletable label="삭제가능칩" onClick={()=>console.log("delete") } onDelete={()=>console.log("delete")}></ChipDeletable>
                <CardNutrient pill={data}></CardNutrient>
                <CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient><CardNutrient pill={data}></CardNutrient>
            </div>
            <Footer></Footer>
            </div>
    );
}

export default Main;