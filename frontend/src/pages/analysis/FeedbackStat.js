/*
피드백 스탯
@author 조혜안
@since 2022.10.01
*/
import { Divider, Paper, List, ListItem, ListItemText, Collapse, Grid, Box } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { React, useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";

// 섭취량
const intake = {
  calorie: "111", // 총 에너지
  carbohydrate: "44", // 탄수화물
  protein: "55", // 단백질
  fat: "67", // 지방
  sugar: "83", // 총 당류
  sodium: "91", // 나트륨
  dietary_fiber: "13", // 총 식이섬유
  calcium: "45", // 칼슘
  iron: "15", //철
  magnesium: "45", // 마그네슘
  phosphorus: "73", // 인
  potassium: "46", // 칼륨
  sodium: "83", // 나트륨
  zinc: "16", // 아연
  copper: "73", // 구리
  manganese: "64", // 망간
  selenium: "15", // 셀레늄
  vitamin_a: "43", // 비타민 A
  vitamin_d: "16", // 비타민 D
  vitamin_b6: "35", // 비타민 B6
  folate: "16", // 엽산
  vitamin_b12: "21", // 비타민 B12
  vitamin_c: "12", // 비타민 C
  cholesterol: "45", // 콜레스테롤
  fatty_acid: "35", // 총 포화 지방산
  linoleic_acid: "73", // 리놀레산
  alpha_lineleic_acid: "15", // 알파 리놀레산
  trans_fatty_acid: "16", // 트랜스 지방산
  vitamin_b1: "21", // 비타민 B1
  vitamin_b2: "20", // 비타민 B2
};

// 섭취량 차트
function ShowIntakeCharts({ carbo, protein, fat }) {
  // 탄수화물, 단백질, 지방, 당, 나트륨 순으로 해당 기간의 섭취량 받아오기
  const series = [carbo, protein, fat];
  const options = {
    //data on the x-axis
    labels: ["탄수화물", "단백질", "지방"],
    colors: ["#FFB3B3", "#F7BF87", "#A9D5C7", "#A9D5C7", "#9DA6F8"],
    chart: {
      type: "pie",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              label: "총 칼로리 평균",
              fontWeight: 600,
              fontFamily: "Nanum Gothic",
              // color: "#9DA6F8",
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="pie" width={450} />
        </div>
      </div>
    </div>
  );
}

export default function FeedbackStat({ value, data, percent, allCal, calArr }) {
  const [chol, setChol] = useState(percent.cholesterol); // 콜레스테롤
  const [trans, setTrans] = useState(percent.transFattyAcid); // 트랜스지방산
  const [sodium, setSodium] = useState(percent.sodium); // 나트륨

  const [carbo, setCarbo] = useState(percent.carbohydrate); // 탄수화물
  const [protein, setProtein] = useState(percent.protein); // 단백질
  const [fat, setFat] = useState(percent.fat); // 지방

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setChol(percent.cholesterol);
      setTrans(percent.transFattyAcid);
      setSodium(percent.sodium);
      setCarbo(percent.carbohydrate);
      setProtein(percent.protein);
      setFat(percent.fat);
      // console.log(percent);
      // console.log(data);
      // console.log(allCal);
      // console.log(calArr)
    }
  });

  return (
    <Paper
      elevation={3}
      sx={{
        borderWidth: "3px",
        borderColor: "orange.main",
        color: "#747373",
        overflow: "auto",
      }}
    >
      {/* 최근 7일이면 0, 최근 30일이면 1, 전체 기간이면 2 */}
      {/* {value} */}
      <h3 style={{ margin: 20 }}>분석 피드백</h3>
      <Grid Container justifyContent="center" style={{ display: "flex", margin: 20 }}>
        <Grid item xs>
          <div style={{ marginLeft: "5%" }}>
            {percent.analysisType == null ? (
              <div style={{ marginTop: "20%", lineHeight: "2", textAlign: "center" }}>
                섭취한 칼로리가 0kcal이에요.😥
              </div>
            ) : (
              <ShowIntakeCharts
                allCal={allCal}
                carbo={calArr[0]}
                protein={calArr[1]}
                fat={calArr[2]}
              ></ShowIntakeCharts>
            )}
          </div>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          {/* 총 영양성분의 세부정보 */}
          <Box
            sx={{
              maxHeight: 300,
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
              lineHeight: "2",
            }}
          >
            <div
              style={{
                lineHeight: "1.6",
                textAlign: "center",
                marginBottom: "3%",
                color: "#7c7c7c",
                fontWeight: "bold",
              }}
            >
              평균 섭취 칼로리
              <br />
              <b style={{ color: "#9DA6F8", fontSize: "23px" }}>{allCal}</b> kcal
            </div>
            {carbo > 100 ? (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#FFB3B3" }}>탄수화물</b>을{" "}
                <b style={{ color: "#FFB3B3" }}>{carbo - 100}%</b> 더 섭취했어요!
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#FFB3B3" }}>탄수화물</b>이{" "}
                <b style={{ color: "#FFB3B3" }}>{100 - carbo}%</b> 부족해요!
              </div>
            )}
            {protein > 100 ? (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#F7BF87" }}>단백질</b>을{" "}
                <b style={{ color: "#F7BF87" }}>{protein - 100}%</b> 더 섭취했어요!
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#F7BF87" }}>단백질</b>이{" "}
                <b style={{ color: "#F7BF87" }}>{100 - protein}%</b> 부족해요!
              </div>
            )}
            {fat > 100 ? (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#A9D5C7" }}>지방</b>을{" "}
                <b style={{ color: "#A9D5C7" }}>{fat - 100}%</b> 더 섭취했어요!
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#A9D5C7" }}>지방</b>이{" "}
                <b style={{ color: "#A9D5C7" }}>{100 - fat}%</b> 부족해요!
              </div>
            )}
            <div></div>
            {chol > 100 ? (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#747373" }}>콜레스테롤</b>을{" "}
                <b style={{ color: "#747373" }}>{chol - 100}%</b> 더 섭취했어요!
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#747373" }}>콜레스테롤</b>을{" "}
                <b style={{ color: "#747373" }}>{100 - chol}%</b> 적게 섭취했어요!
              </div>
            )}
            {trans > 100 ? (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#747373" }}>트랜스지방</b>을{" "}
                <b style={{ color: "#747373" }}>{trans - 100}%</b> 더 섭취했어요!
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#747373" }}>트랜스지방</b>을{" "}
                <b style={{ color: "#747373" }}>{100 - trans}%</b> 적게 섭취했어요!
              </div>
            )}
            {sodium > 100 ? (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#747373" }}>나트륨</b>을{" "}
                <b style={{ color: "#747373" }}>{sodium - 100}%</b> 더 섭취했어요!
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <b style={{ fontSize: "18px", color: "#747373" }}>나트륨</b>을{" "}
                <b style={{ color: "#747373" }}>{100 - sodium}%</b> 적게 섭취했어요!
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
