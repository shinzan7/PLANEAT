/*
식사 기록페이지 등록 버튼
속성: type(아/점/저/간), amount(칼로리)
@author 여예원
@since 2022.09.22
*/

import Button from '@mui/material/Button';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { keyframes } from "@emotion/react";
import { Box, Typography, Grid } from '@mui/material';
  
export default function BtnCircle(props) { 
    const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;
    
    const BtnCircle = styled(Button)`
    && {
        background-color: #9DA6F8;
        color: white;
        border-radius: 50%;
        transform: scale(1.1);
        height: 64px !important;
        box-shadow: 1px 2px 5px #c7c7c7;
        text-transform: none; // 버튼 내용 소문자로
    }

    &:hover {
        background-color: #9DA6F8 !important;
        transform: scale(1.2);
    }

    > .MuiTouchRipple-root span {
        background-color: #9DA6F8;
        opacity: 0.1;
        color: white;
    }
`;
    
    function onClick(e) {
        console.log(e.target.id); // 아/점/저/간/영

        if (e.target.id == "영양제") {
            //영양제 모달
        } else { 
            // 식단 모달
        }
    }
    
    return (
        <Grid items id={props.type} xs={2} style={{ textAlign: "center" }} onClick={ (e)=>onClick(e)}> 
            <BtnCircle id={props.type} >
                {props.amount == null ?
                    <Typography id={props.type}>+</Typography>
                    :
                    <Typography id={props.type} >
                        {props.amount}<br />kcal
                    </Typography>
                }
            </BtnCircle>
            <Typography id={props.type} style={{marginTop: "1.5vw"}} >
                { props.type }
            </Typography>
        </Grid>
    );
};