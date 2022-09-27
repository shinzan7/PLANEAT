/*
식사 기록 등록 컴포넌트
@author 여예원
@since 2022.09.22
*/

import * as React from 'react';
import { IconButton, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BtnCircle from 'components/common/BtnCircle';
import styled from 'styled-components';
import { useState } from 'react';
import MealModal from 'components/modal/main/MealModal';

export default function RegistMeal(props) {
    
    let date = new Date(props.clickDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const [mealModalOpen, setMealModalOpen] = useState(true); // 식사 등록 모달
    const [mealType, setMealType] = useState("아침");

    return (
        <StyledWrapper>
            <Grid container id="container" xs={ 12} direction="row">
                <Grid container id="mealDate" xs={ 12} > {month}월 {day}일 식사 등록하기</Grid>
                <Grid container id="btnGroup" xs={12} zeroMinWidth direction="row" justifyContent="space-evenly">
                    <BtnCircle type="아침" amount={props.breakfastAmount} setMealModalOpen={setMealModalOpen} setMealType={setMealType}></BtnCircle>
                    <BtnCircle type="점심" amount={props.lunchAmount} setMealModalOpen={setMealModalOpen} setMealType={setMealType}></BtnCircle>
                    <BtnCircle type="저녁" amount={props.dinnerAmount} setMealModalOpen={setMealModalOpen} setMealType={setMealType}></BtnCircle>
                    <BtnCircle type="간식" amount={props.snackAmount} setMealModalOpen={setMealModalOpen} setMealType={setMealType}></BtnCircle>
                    <BtnCircle type="영양제"></BtnCircle>
                </Grid>
            </Grid>

            {
                mealModalOpen == true ? <MealModal mealModalOpen={mealModalOpen} setMealModalOpen={setMealModalOpen} month={month} day={day} mealType={mealType} / > : null
            }
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    
#container {
    background-color: white;
    box-shadow: 1px 2px 5px #c7c7c7;
    padding: 2vw;
    border-radius: 15px;
    width: 90%;
    margin: auto;
    margin-top: 2vw;
}

#mealDate {
    text-align: left !important;
    margin-left: 5px;
    color: black;
    font-weight: bold;
}

#btnGroup {
    margin-top: 3vw;
}

`;