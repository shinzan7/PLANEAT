/*
내 영양 분석 페이지 > 섭취량 및 변화기록 스탯
@author 조혜안
@since 2022.09.22
*/
import { Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { http } from "api/http";
import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

// 분석 피드백 차트
function ShowFeedbackCharts({ percent }) {
  const series = [
    {
      name: "영양소",
      data: [
        percent.carbohydrate,
        percent.protein,
        percent.fat,
        percent.sugar,
        percent.dietaryFiber,
        percent.calcium,
        percent.iron,
        percent.magnesium,
        percent.phosphorus,
        percent.potassium,
        percent.sodium,
        percent.zinc,
        percent.copper,
        percent.manganese,
        percent.selenium,
        percent.vitaminA,
        percent.vitaminB1,
        percent.vitaminB2,
        percent.vitaminB6,
        percent.vitaminB12,
        percent.vitaminC,
        percent.vitaminD,
        percent.folate,
        percent.cholesterol,
        percent.fattyAcid,
        percent.linoleicAcid,
        percent.alphaLinoleicAcid,
        percent.transFattyAcid,
      ],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 5,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    colors: ["#9DA6F8"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#666666"],
      },
    },

    xaxis: {
      categories: [
        "탄수화물",
        "단백질",
        "지방",
        "당류",
        "식이섬유",
        "칼슘",
        "철",
        "마그네슘",
        "인",
        "칼륨",
        "나트륨",
        "아연",
        "구리",
        "망간",
        "셀레늄",
        "비타민A",
        "비타민B1",
        "비타민B2",
        "비타민B6",
        "비타민B12",
        "비타민C",
        "비타민D",
        "엽산",
        "콜레스테롤",
        "총 포화지방산",
        "리놀레산",
        "알파 리놀렌산",
        "트랜스지방산",
      ],

      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#9DA6F8",
            colorTo: "#E6E8FD",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      max: 100,
      tickAmount: 5,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };

  return (
    <div className="app">
      <div>
        <Chart options={options} series={series} type="bar" width="100%" height={350} />
      </div>
    </div>
  );
}

export default function FoodStat({ value, data, percent }) {
  // userState 유저 정보
  const userInfo = useRecoilValue(userState);

  // 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  // 유저 권장섭취량 정보
  const [userRecIntake, setUserRecIntake] = useState([]);
  const [nutritionsList, setNutritionsList] = useState([]);

  async function getRecIntake() {
    const response = await http.get(`/user-infos/rec-intake/${userInfo.userId}/${getToday()}`);
    if (response.data.message == "success") {
      setUserRecIntake(response.data.data);
      setNutritionsList(response.data.data.nutritionsList);
    }
  }

  useEffect(() => {
    getRecIntake();
  }, []);

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
      <Grid Container style={{ margin: 20 }}>
        <Grid item>
          <h3>섭취량 분석</h3>
        </Grid>
        <Grid item>
          <div>
            <ShowFeedbackCharts percent={percent}></ShowFeedbackCharts>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
