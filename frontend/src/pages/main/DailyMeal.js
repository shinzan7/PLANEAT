/*
식사 기록 페이지 > 해당 날짜의 식사 기록 통계
@author 여예원
@since 2022.09.23
*/

import * as React from 'react';
import styled from 'styled-components';
import { Grid, Paper } from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function DailyMeal(props) {

    let date = new Date(props.clickDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    const data = null;

    return (
        <StyledWrapper>
            <Grid container id="container" xs={ 12} direction="row" alignItems="center">
                {
                    data == null ?
                        // 기록이 없는 경우
                        (<Grid items id="noRecord" xs={12} >
                            {month}월 {day}일의 식사기록이 없어요🥲<br />
                            식사를 등록해주세요!
                        </Grid>)
                        :
                        // 기록이 있는 경우
                        (<Grid items id="dateTitle" xs={12}>{month}월 {day}일의 식사</Grid>)
                }
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
        margin-top: 2vw;
        margin-bottom: 2vw;
        min-height: 50vh;
    }

    #noRecord {
        color: #9DA6F8;
        font-size: 1vw;
    }



`;