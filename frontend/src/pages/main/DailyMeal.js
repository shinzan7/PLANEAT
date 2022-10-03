/*
식사 기록 페이지 > 해당 날짜의 식사 기록 통계
@author 여예원
@since 2022.09.23
*/

import * as React from "react";
import styled from "styled-components";
import { Grid, Paper } from "@mui/material";

export default function DailyMeal(props) {

    // 달력에서 클릭한 날짜 가공 함수
  let date = new Date(props.clickDate);
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const data = null;

  return (
    <StyledWrapper>
      <Grid container id="container" direction="row" alignItems="center">
        {data == null ? (
          // 기록이 없는 경우
          <Grid items id="noRecord" xs={12}>
            {month}월 {day}일의 식사기록이 없어요😥
            <br />
            식사를 등록해주세요!
          </Grid>
        ) : (
          // 기록이 있는 경우
          <div>
            <Grid items id="dateTitle" xs={12}>
              {month}월 {day}일의 식사
            </Grid>
            <Grid items id="totalIntake" xs={12}>
              총 섭취량
            </Grid>
            <Grid items xs={12}>
              식사 상세 정보
            </Grid>
            <Grid items xs={12}>
              탄단지 요약
            </Grid>
            <Grid items xs={12}>
              영양상세정보
            </Grid>
            <Grid items xs={12}>
              섭취량 권고
            </Grid>
          </div>
        )}
      </Grid>
    </StyledWrapper>
  );
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
    color: #9da6f8;
    font-size: 1vw;
  }

  #dateTitle {
    color: black;
    font-weight: bold;
  }

  #totalIntake {
    text-align: center;
  }
`;
