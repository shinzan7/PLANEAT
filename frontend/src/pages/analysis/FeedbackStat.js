/*
피드백 스탯
@author 조혜안
@since 2022.10.01
*/
import { Paper, Grid } from "@mui/material";
import Chart from "react-apexcharts";

const userNutrientInfo = [
  {
    nutrient_name: "탄수화물",
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
    nutrient_name: "단백질",
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
    nutrient_name: "지방",
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
      min: 0, // start date
      max: 10, // end date
      tickAmount: 2, // interval you want
    },
  };

  return (
    <div className="app">
      <div>
        <Chart options={options} series={series} type="bar" width="100%" height={110} />
      </div>
    </div>
  );
}

export default function FeedbackStat({ value }) {
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
          <h3>분석 피드백</h3>
        </Grid>
        <Grid item>
          {userNutrientInfo.map((data, i) => (
            <div>
              <ShowNutrientCharts
                nutrientName={data.nutrient_name}
                realReco={data.user_nutrient_info}
              ></ShowNutrientCharts>
              <p style={{ marginLeft: "3px", marginBottom: "0px", marginTop: "0px" }}>
                <b style={{ color: "#F7BF87" }}>{data.nutrient_name}</b>을 ~~g 중에{" "}
                <b style={{ color: "#F7BF87" }}>{data.user_nutrient_info.length}</b>g 섭취했어요.
              </p>
            </div>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
