/*
식사 기록페이지 등록 버튼
속성: type(아/점/저/간), amount(칼로리), setMealModalOpen(등록모달 오픈 관리 변수), setMealType(등록모달 식사타입 고나리 변수)
@author 여예원
@since 2022.09.22
*/

import Button from "@mui/material/Button";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { keyframes } from "@emotion/react";
import { Box, Typography, Grid } from "@mui/material";

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
      background-color: #9da6f8;
      color: white;
      border-radius: 50%;
      transform: scale(1.1);
      height: 64px !important;
      box-shadow: 1px 2px 5px #c7c7c7;
      text-transform: none; // 버튼 내용 소문자로
    }

    &:hover {
      background-color: #9da6f8 !important;
      transform: scale(1.2);
    }

    > .MuiTouchRipple-root span {
      background-color: #9da6f8;
      opacity: 0.1;
      color: white;
    }
  `;

  function onClick(e) {
    // console.log(e.target.id); // 아/점/저/간/영
    props.setMealType(e.target.id);

    if (e.target.id == "영양제") {
      props.setNutrientModalOpen(true);
    } else {
      props.setMealModalOpen(true);
    }
  }

  return (
    <Grid
      items
      id={props.type}
      xs={2}
      style={{ textAlign: "center" }}
      onClick={(e) => onClick(e)}
    >
      <BtnCircle id={props.type}>
        <Typography id={props.type}>+</Typography>
      </BtnCircle>
      <Typography id={props.type} style={{ marginTop: "1.5vw" }}>
        {props.type}
      </Typography>
    </Grid>
  );
}
