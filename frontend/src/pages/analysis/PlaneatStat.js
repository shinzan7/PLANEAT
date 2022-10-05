/*
플래닛지수 스탯
@author 조혜안
@since 2022.10.01
*/
import { Paper, Grid, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { getStaticContextFromError } from "@remix-run/router";
import { http } from "api/http";
import { useEffect, useState, useRef } from "react";

export default function PlaneatStat({ value, score }) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderWidth: "3px",
        borderColor: "orange.main",
        color: "#747373",
        overflow: "auto",
        height: "470px",
      }}
    >
      {/* 최근 7일이면 0, 최근 30일이면 1, 전체 기간이면 2 */}
      {/* {value} */}
      <Grid Container style={{ margin: 20 }}>
        <Grid item>
          <h3 style={{ marginBottom: "10px" }}>플래닛지수</h3>
        </Grid>
        <List>
          <ListItem sx={{ padding: "0px" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <img width="20" height="20" src="assets/score/score_bad.png"></img>
            </ListItemIcon>
            <ListItemText secondary="총 칼로리, 탄수화물, 단백질, 지방, 당 권장섭취량의 +-60%를 벗어남" />
          </ListItem>
          <ListItem sx={{ padding: "0px" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <img width="20" height="20" src="assets/score/score_good.png"></img>
            </ListItemIcon>
            <ListItemText secondary="총 칼로리, 탄수화물, 단백질, 지방, 당 권장섭취량의 +-30%를 만족함" />
          </ListItem>
          <ListItem sx={{ padding: "0px" }}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <img width="20" height="20" src="assets/score/score_soso.png"></img>
            </ListItemIcon>
            <ListItemText secondary="총 칼로리, 탄수화물, 단백질, 지방, 당 권장섭취량의 +-60%를 만족함" />
          </ListItem>
        </List>
        <Grid item sx={{ textAlign: "center" }}>
          <Grid
            container
            id="btnGroup"
            xs={12}
            zeroMinWidth
            direction="row"
            justifyContent="space-evenly"
            sx={{ marginTop: "15%" }}
          >
            <Grid item>
              <img
                width="100"
                height="100"
                style={{ display: "block" }}
                src="assets/score/score_bad.png"
              ></img>
              <p style={{ color: "#FFB3B3", fontWeight: "bold", textAlign: "center" }}>
                {(score[0] = "NaN%" ? "0%" : score[0])}
              </p>
            </Grid>
            <Grid item>
              <img
                width="100"
                height="100"
                style={{ display: "block" }}
                src="assets/score/score_good.png"
              ></img>
              <p style={{ color: "#A9D5C7", fontWeight: "bold", textAlign: "center" }}>
                {(score[1] = "NaN%" ? "0%" : score[1])}
              </p>
            </Grid>
            <Grid item>
              <img
                width="100"
                height="100"
                style={{ display: "block" }}
                src="assets/score/score_soso.png"
              ></img>
              <p style={{ color: "#F7BF87", fontWeight: "bold", textAlign: "center" }}>
                {(score[2] = "NaN%" ? "0%" : score[2])}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
