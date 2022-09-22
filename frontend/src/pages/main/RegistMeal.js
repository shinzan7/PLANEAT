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
            <Grid id="container" xs={ 12}>
                <Grid items id="mealDate" xs={ 12}> {month}월 {day}일 식사 등록하기</Grid>
                <Grid items xs={12} style={{display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
}}>
                    <BtnCircle></BtnCircle>
                    <BtnCircle></BtnCircle>
                    <BtnCircle></BtnCircle>
                    <BtnCircle></BtnCircle>
                    <BtnCircle></BtnCircle>
            </Grid>
        </Grid>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    
#container {
    background-color: white;
    box-shadow: 1px 2px 5px #c7c7c7;
    padding: 10px;
    border-radius: 15px;
    margin: 50px;
}

#mealDate {
    text-align: left !important;
    margin-left: 5px;
    color: black;
    font-weight: bold;
}

#registBtn {
    display: inline-block !important;
}
`;