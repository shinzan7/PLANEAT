/*
내 영양 분석 페이지 > 플래닛 지수 및 영양제 섭취 스탯
@author 조혜안
@since 2022.09.22
*/
import { Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { http } from "api/http";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

// const userNutrientInfo = [
//   {
//     nutrient_name: "광동 마그네슘",
//     intake_reco: "2",
//     user_nutrient_info: [
//       {
//         intake_date: "220908",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220909",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220910",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220911",
//         real_reco: "2",
//       },
//     ],
//   },
//   {
//     nutrient_name: "큰상인 홍삼정 스틱",
//     intake_reco: "1",
//     user_nutrient_info: [
//       {
//         intake_date: "220908",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220909",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220910",
//         real_reco: "2",
//       },
//     ],
//   },
//   {
//     nutrient_name: "데일리코어 비타민C",
//     intake_reco: "2",
//     user_nutrient_info: [
//       {
//         intake_date: "220908",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220909",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220910",
//         real_reco: "2",
//       },
//     ],
//   },
// ];

// for (let i = 0; i < userNutrientInfo.length; i++) {}

// 영양제 섭취 차트
function ShowNutrientCharts({ nameDatas, perDatas }) {
  const series = [
    {
      data: perDatas,
    },
  ];
  const options = {
    //data on the x-axis
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: ["#FFB3B3", "#F7BF87", "#FFEFC9", "#A9D5C7", "#9DA6F8"],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return val + "%";
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: nameDatas,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val)) + "%";
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="app">
      <div>
        <Chart options={options} series={series} type="bar" width="100%" height={380} />
      </div>
    </div>
  );
}

export default function NutrientStat({ value }) {
  // userState 유저 정보
  const userInfo = useRecoilValue(userState);

  // 유저가 등록한 영양제
  const [userNutrientInfo, setUserNutrientInfo] = useState([]);

  // 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
  function getDateStr(myDate) {
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();

    month = month < 10 ? "0" + String(month) : month;
    day = day < 10 ? "0" + String(day) : day;

    return year + "-" + month + "-" + day;
  }
  // 오늘로부터 1주일 전 날짜 반환
  function lastWeek() {
    var d = new Date();
    var dayOfMonth = d.getDate();
    d.setDate(dayOfMonth - 7);
    return getDateStr(d);
  }
  // 오늘로부터 1개월 전 날짜 반환
  function lastMonth() {
    var d = new Date();
    var monthOfYear = d.getMonth();
    d.setMonth(monthOfYear - 1);
    return getDateStr(d);
  }

  // 영양제 분석 데이터 받아오기
  async function getNutrientStat() {
    // 최근 7일 데이터
    if (value === 0) {
      const response1 = await http.get(`nutrient/user/list/period`, {
        params: {
          endDate: getDateStr(new Date()),
          startDate: lastWeek(),
          userId: userInfo.userId,
        },
      });

      if (response1.data.message === "success") {
        setUserNutrientInfo([...response1.data.data]);
      }
    }
    // 최근 30일 데이터
    else if (value === 1) {
      const response2 = await http.get(`nutrient/user/list/period`, {
        params: {
          endDate: getDateStr(new Date()),
          startDate: lastMonth(),
          userId: userInfo.userId,
        },
      });

      if (response2.data.message === "success") {
        setUserNutrientInfo([...response2.data.data]);
      }
    }
    // 전체 데이터
    else if (value === 2) {
      const response3 = await http.get(`nutrient/user/list/period`, {
        params: {
          endDate: getDateStr(new Date()),
          startDate: "1900-01-01",
          userId: userInfo.userId,
        },
      });

      if (response3.data.message === "success") {
        setUserNutrientInfo([...response3.data.data]);
      }
    }

    makeData();
  }

  // 영양제 이름
  const [nameDatas, setNameDatas] = useState([]);
  // 영양제 섭취 비율 (기간동안 섭취한 횟수 / (권장횟수*기간) * 100)
  const [perDatas, setPerDatas] = useState([]);

  // 오늘 날짜 yyyy-mm-dd 형식으로 받아오기
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  // 날짜차이계산
  const getDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
  };

  function makeData() {
    let list = [];
    let list2 = [];
    if (userNutrientInfo.length != 0) {
      for (let i = 0; i < userNutrientInfo.length; i++) {
        // console.log(userNutrientInfo[i].nutrientName);
        list.push(userNutrientInfo[i].nutrientName);
        if (value == 0) {
          let intakes = 0; // 실제 섭취한 총 횟수
          for (let j = 0; j < userNutrientInfo[i].nutriHistoryList.length; j++) {
            intakes += userNutrientInfo[i].nutriHistoryList[j].intakeReal;
          }
          let per = (intakes * 100) / (userNutrientInfo[i].intakeRecommend * 7);
          list2.push(per.toFixed(1));
        } else if (value == 1) {
          let intakes = 0; // 실제 섭취한 총 횟수
          for (let j = 0; j < userNutrientInfo[i].nutriHistoryList.length; j++) {
            intakes += userNutrientInfo[i].nutriHistoryList[j].intakeReal;
          }
          let per = (intakes * 100) / (userNutrientInfo[i].intakeRecommend * 30);
          list2.push(per.toFixed(1));
        } else if (value == 2) {
          if (userNutrientInfo[i].nutriHistoryList.length != 0) {
            // 처음 섭취한 날 부터 오늘까지의 날짜차이
            // console.log(userNutrientInfo[i].nutriHistoryList[0].intakeDate);
            let date = getDiff(getToday(), userNutrientInfo[i].nutriHistoryList[0].intakeDate);
          }
          // console.log(date);
          let intakes = 0; // 실제 섭취한 총 횟수
          for (let j = 0; j < userNutrientInfo[i].nutriHistoryList.length; j++) {
            intakes += userNutrientInfo[i].nutriHistoryList[j].intakeReal;
          }
          let per = (intakes * 100) / (userNutrientInfo[i].intakeRecommend * 7);
          list2.push(per.toFixed(1));
        }
      }
      // console.log(nameDatas);
      setNameDatas(list);
      setPerDatas(list2);
    }
  }

  useEffect(() => {
    getNutrientStat();
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
      <div style={{ margin: 20 }}>
        {/* 영양제 분석 차트 */}
        <h3>영양제 섭취 비율</h3>
        {/* {JSON.stringify(userNutrientInfo)} */}
        {userNutrientInfo.length == 0 ? (
          <div style={{ lineHeight: "2", textAlign: "center" }}>
            섭취하고 있는 영양제가 없어요.
            <br />
            마이페이지에서 영양제를 등록해주세요!😊
          </div>
        ) : (
          <div>
            <ShowNutrientCharts nameDatas={nameDatas} perDatas={perDatas}></ShowNutrientCharts>
          </div>
        )}

        {/* {userNutrientInfo.map((data, i) => (
          <div>
            <ShowNutrientCharts
              nutrientName={data.nutrient_name}
              realReco={data.user_nutrient_info}
            ></ShowNutrientCharts>
            <p style={{ marginLeft: "3px", marginBottom: "0px", marginTop: "0px" }}>
              <b style={{ color: "#F7BF87" }}>{data.nutrient_name}</b>을 ~~일 중에{" "}
              <b style={{ color: "#F7BF87" }}>{data.user_nutrient_info.length}</b> 일 섭취했어요.
            </p>
          </div>
        ))} */}
      </div>
    </Paper>
  );
}
