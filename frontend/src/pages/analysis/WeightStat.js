/*
몸무게 별 변화기록 스탯
@author 조혜안
@since 2022.10.01
*/
import { Paper, Grid } from "@mui/material";
import Chart from "react-apexcharts";

// 변화기록 차트
function ShowWeightIntakeCharts() {
  const series = [
    {
      name: "총 섭취량",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: "권장 섭취량",
      type: "column",
      data: [1000, 1020, 1000, 1000, 1200, 1200, 1200, 1200, 1300, 1300, 1300, 1100],
    },
    {
      name: "몸무게",
      type: "line",
      data: [48, 47, 49, 52, 51, 49, 47, 48, 48, 50, 49, 47],
    },
  ];

  const options = {
    colors: ["#F7BF87", "#FFEFC9", "#9DA6F8"],
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    stroke: {
      width: [1, 1, 4],
    },

    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        220908, 220909, 220910, 220911, 220912, 220913, 220914, 220915, 220916, 220917, 220918,
        220919,
      ],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#F7BF87",
        },
        labels: {
          style: {
            colors: "#F7BF87",
          },
        },
        title: {
          text: "총 섭취량",
          style: {
            color: "#F7BF87",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Income",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FFE6AA",
        },
        labels: {
          style: {
            colors: "#FFE6AA",
          },
        },
        title: {
          text: "권장 섭취량",
          style: {
            color: "#FFE6AA",
          },
        },
      },
      {
        seriesName: "Revenue",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#9DA6F8",
        },
        labels: {
          style: {
            colors: "#9DA6F8",
          },
        },
        title: {
          text: "몸무게",
          style: {
            color: "#9DA6F8",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" width={500} height={350} />
        </div>
      </div>
    </div>
  );
}

export default function WeightStat({ value }) {
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
          <h3>변화기록</h3>
        </Grid>
        <Grid item sx={{ textAlign: "center" }}>
          <ShowWeightIntakeCharts></ShowWeightIntakeCharts>
        </Grid>
      </Grid>
    </Paper>
  );
}
