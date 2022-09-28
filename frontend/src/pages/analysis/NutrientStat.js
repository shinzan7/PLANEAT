/*
내 영양 분석 페이지 > 플래닛 지수 및 영양제 섭취 스탯
@author 조혜안
@since 2022.09.22
*/
import { Paper, Grid } from "@mui/material";
import { useEffect } from "react";
import Chart from "react-apexcharts";

// 유저가 등록한 영양제
const userNutrientInfo = [
  {
    nutrient_name: "광동 마그네슘",
    intake_reco: "2",
    user_nutrient_info: [
      {
        intake_date: "220908",
        real_reco: "2",
      },
      {
        intake_date: "220909",
        real_reco: "2",
      },
      {
        intake_date: "220910",
        real_reco: "2",
      },
      {
        intake_date: "220911",
        real_reco: "2",
      },
    ],
  },
  {
    nutrient_name: "큰상인 홍삼정 스틱",
    intake_reco: "1",
    user_nutrient_info: [
      {
        intake_date: "220908",
        real_reco: "2",
      },
      {
        intake_date: "220909",
        real_reco: "2",
      },
      {
        intake_date: "220910",
        real_reco: "2",
      },
    ],
  },
  {
    nutrient_name: "데일리코어 비타민C",
    intake_reco: "2",
    user_nutrient_info: [
      {
        intake_date: "220908",
        real_reco: "2",
      },
      {
        intake_date: "220909",
        real_reco: "2",
      },
      {
        intake_date: "220910",
        real_reco: "2",
      },
    ],
  },
];

// for (let i = 0; i < userNutrientInfo.length; i++) {}

// 해당 기간의 플랜잇지수(좋음, 나쁨, 보통) 갯수
const analysisHistory = {
  score_good: 4,
  score_bad: 2,
  score_soso: 1,
};

// 플랜잇 지수 percentage
let good_per =
  Math.round(
    (100 * analysisHistory.score_good) /
      (analysisHistory.score_good + analysisHistory.score_bad + analysisHistory.score_soso)
  ) + "%";
let bad_per =
  Math.round(
    (100 * analysisHistory.score_bad) /
      (analysisHistory.score_good + analysisHistory.score_bad + analysisHistory.score_soso)
  ) + "%";
let soso_per =
  Math.round(
    (100 * analysisHistory.score_soso) /
      (analysisHistory.score_good + analysisHistory.score_bad + analysisHistory.score_soso)
  ) + "%";

// 영양제 섭취 차트
function ShowNutrientCharts({ nutrientName, realReco }) {
  const series = [
    {
      data: [realReco.length],
    },
  ];
  const options = {
    //data on the x-axis
    colors: ["#F7BF87"],
    chart: {
      height: 100,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [nutrientName],
    },
  };

  return (
    <div className="app">
      <div>
        <Chart options={options} series={series} type="bar" width={660} height={110} />
      </div>
    </div>
  );
}

export default function NutrientState({ value }) {
  return (
    <Paper
      sx={{
        maxHeight: 600,
        borderWidth: "3px",
        borderColor: "orange.main",
        color: "#747373",
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
      <div style={{ margin: 20 }}>
        {/* 플래닛 지수 */}
        <h3>나의 플래닛 지수</h3>
        <Grid container id="container" xs={12} direction="row">
          <Grid
            container
            id="btnGroup"
            xs={12}
            zeroMinWidth
            direction="row"
            justifyContent="space-evenly"
          >
            <Grid item>
              <img
                width="100"
                height="100"
                style={{ display: "block" }}
                src="assets/score/score_bad.png"
              ></img>
              <p style={{ color: "#FFB3B3", fontWeight: "bold", textAlign: "center" }}>{bad_per}</p>
            </Grid>
            <Grid item>
              <img
                width="100"
                height="100"
                style={{ display: "block" }}
                src="assets/score/score_good.png"
              ></img>
              <p style={{ color: "#A9D5C7", fontWeight: "bold", textAlign: "center" }}>
                {good_per}
              </p>
            </Grid>
            <Grid item>
              <img
                width="100"
                height="100"
                style={{ display: "block" }}
                src="assets/score/score_soso.png"
              ></img>
              <p style={{ color: "#FFEFC9", fontWeight: "bold", textAlign: "center" }}>
                {soso_per}
              </p>
            </Grid>
          </Grid>
        </Grid>
        {/* 영양제 체크 차트 */}
        <h3>영양제 Check</h3>
        {userNutrientInfo.map((data, i) => (
          <div>
            <ShowNutrientCharts
              nutrientName={data.nutrient_name}
              realReco={data.user_nutrient_info}
            ></ShowNutrientCharts>
            <p style={{ marginLeft: "20px" }}>
              <b style={{ color: "#F7BF87" }}>{data.nutrient_name}</b>을 ~~일 중에{" "}
              <b style={{ color: "#F7BF87" }}>{data.user_nutrient_info.length}</b> 일 섭취했어요.
            </p>
          </div>
        ))}
      </div>
    </Paper>
  );
}
