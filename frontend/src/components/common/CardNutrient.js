/*
영양제 카드.
속성: pill(영양제 데이터)
@author 여예원
@since 2022.09.15
*/
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ChipBlue from "./ChipBlue";
import ChipOrange from "./ChipOrange";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import styled from "styled-components";

export default function MediaCard(props) {
  let imgUrl = props.pill.imagePath; // props의 이미지 url

  return (
    <StyledWrapper>
      <Grid id="cardContainer">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <img
              sx={{ width: { xs: "150px" }, marginTop: 20 }}
              height="150"
              src={imgUrl == "" ? "/assets/basic_nutrient.png" : imgUrl}
            />
          </Grid>
          {/* 제조 회사 */}
          <Grid item xs={12} style={{ marginTop: "5px" }}>
            <Typography variant="caption">{props.pill.company}</Typography>
          </Grid>
          {/* 영양제 이름 */}
          <Grid item xs={12} style={{ marginTop: "5px" }}>
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              {props.pill.nutrientName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  && #cardContainer {
    width: 230px;
    height: 250px;
    border-radius: 25px;
    margin: 10px;
    box-shadow: 1px 2px 6px #c7c7c7;
    text-align: center;
    color: black !important;
  }
`;
