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

export default function RegistMeal(props) {
    
    let date = new Date(props.clickDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();


    return (
        <StyledWrapper>
            <Grid container id="container" xs={ 12} direction="row">
                <Grid container id="mealDate" xs={ 12} > {month}월 {day}일 식사 등록하기</Grid>
                <Grid container id="btnGroup" xs={12} zeroMinWidth direction="row" justifyContent="space-evenly">
                    <BtnCircle type="아침"></BtnCircle>
                    <BtnCircle type="점심"></BtnCircle>
                    <BtnCircle type="저녁"></BtnCircle>
                    <BtnCircle type="간식"></BtnCircle>
                    <BtnCircle type="영양제"></BtnCircle>
                </Grid>
            </Grid>
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