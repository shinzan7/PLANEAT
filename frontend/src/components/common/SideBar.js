/*
사이드바 css, 구조 변경
@author 여예원
@since 2022.10.06
*/

import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { ListItemButton, List } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function IconMenu() {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <StyledWrapper>
      <Paper sx={{ width: "100%", padding: "30px" }} elevation={0}>
        <List>
          <ListItemButton
            style={{
              fontSize: "18px",
              width: "100%",
              padding: "30px",
            }}
            onClick={() => {
              navigator("/search");
            }}
            id={location.pathname == "/search" ? "current" : null}
          >
            영양제 추천
          </ListItemButton>
          <Divider />
          <ListItemButton
            style={{
              fontSize: "18px",
              height: "100%",
              padding: "30px",
            }}
            onClick={() => {
              navigator("/searchtag");
            }}
            id={location.pathname.includes("tag") ? "current" : null}
          >
            고민별 검색
          </ListItemButton>
          <Divider />
          <ListItemButton
            style={{
              fontSize: "18px",
              height: "100%",
              padding: "30px",
            }}
            onClick={() => {
              navigator("/searchnutrient");
            }}
            id={location.pathname.includes("nutrient") ? "current" : null}
          >
            성분별 검색
          </ListItemButton>
        </List>
      </Paper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  && #current {
    color: #9da6f8;
    font-weight: bold;
  }
`;
