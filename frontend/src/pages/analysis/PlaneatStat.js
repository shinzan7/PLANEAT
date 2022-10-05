/*
플래닛지수 스탯
@author 조혜안
@since 2022.10.01
*/
import { Paper, Grid, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { http } from "api/http";
import { useEffect, useState, useRef } from "react";

export default function PlaneatStat({ value, score, scoreBad, scoreGood, scoreSoso }) {
  const [bad, setBad] = useState("");

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // console.log("스코어", scoreBad);
      // console.log("스코어", scoreGood);
      // console.log("스코어", scoreSoso);
    }
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        borderWidth: "3px",
        borderColor: "orange.main",
        color: "#747373",
        overflow: "auto",
        height: 480,
        overflow: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#F7BF87",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#FFB973",
        },
      }}
    >
      {/* 최근 7일이면 0, 최근 30일이면 1, 전체 기간이면 2 */}
      {/* {value} */}
      <Grid Container style={{ margin: 20 }}>
        <Grid item>
          <h3 style={{ marginBottom: "10px" }}>플래닛지수</h3>
        </Grid>
        {score}
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
                {scoreBad}
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
                {scoreGood}
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
                {scoreSoso}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
