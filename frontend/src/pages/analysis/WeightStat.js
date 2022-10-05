/*
몸무게 별 변화기록 스탯
@author 조혜안
@since 2022.10.01
*/
import { Paper, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";

// 변화기록 차트
function ShowWeightIntakeCharts({ date, realIntake, recoIntake }) {
  const series = [
    {
      name: "총 섭취량",
      type: "column",
      data: realIntake,
    },
    {
      name: "권장 섭취량",
      type: "column",
      data: recoIntake,
    },
  ];

  const options = {
    colors: ["#F7BF87", "#FFEFC9"],
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
      categories: date,
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

export default function WeightStat({ value, data, reco }) {
  // 실제 칼로리
  const [realIntake, setRealIntake] = useState([]);
  // 권장 칼로리
  const [recoIntake, setRecoIntake] = useState([]);
  // 날짜
  const [date, setDate] = useState([]);

  // 한글날짜로 변환
  function hangul_date(data) {
    var format = /[12][0-9]{3}-[0-9]{2}-[0-9]{2}/;
    if (data.search(format) == -1) return data;

    var _year = data.substr(0, 4);
    var _month = data.substr(5, 2);
    var _day = data.substr(8, 2);

    return _month + "월" + _day + "일";
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // console.log(data);
      // console.log(reco);
      let arr = [];
      let arr2 = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(hangul_date(data[i].date));
        arr2.push(data[i].calorie);
      }
      setDate(arr); // 날짜
      setRealIntake(arr2); // 실제 칼로리

      let arr3 = [];
      for (let i = 0; i < reco.length; i++) {
        arr3.push(reco[i].calorie); // 권장 칼로리
      }
      setRecoIntake(arr3);
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
          <ShowWeightIntakeCharts
            date={date}
            realIntake={realIntake}
            recoIntake={recoIntake}
          ></ShowWeightIntakeCharts>
        </Grid>
      </Grid>
    </Paper>
  );
}
