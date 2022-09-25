/*
내 영양 분석 페이지 > 섭취량 및 변화기록 스탯
@author 조혜안
@since 2022.09.22
*/
import { Divider, Paper, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { React, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const userInfo = {
  name: "김싸피",
};

const listItemStyle = {
  textAlign: "right",
};

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
function ShowIntakeCharts() {
  // 탄수화물, 단백질, 지방, 당, 나트륨 순으로 해당 기간의 섭취량 받아오기
  const series = [intake.carbohydrate, intake.protein, intake.fat, intake.sugar, intake.sodium];
  const options = {
    //data on the x-axis
    colors: ["#FFB3B3", "#F7BF87", "#FFEFC9", "#A9D5C7", "#9DA6F8"],
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "총 칼로리",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return intake.calorie;
            },
          },
        },
      },
    },
    labels: ["탄수화물", "단백질", "지방", "당류", "나트륨"],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="radialBar" width={350} />
        </div>
      </div>
    </div>
  );
}

// 변화기록 차트
function ShowWeightIntakeCharts() {
  const series = [
    {
      name: "총 섭취량",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: "몸무게",
      type: "line",
      data: [48, 47, 49, 52, 51, 49, 47, 48, 48, 50, 49, 47],
    },
  ];

  const options = {
    colors: ["#F7BF87", "#9DA6F8"],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },

    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "총 섭취량",
        },
      },
      {
        opposite: true,
        title: {
          text: "몸무게",
        },
      },
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" width={500} />
        </div>
      </div>
    </div>
  );
}

export default function FootStat({ value }) {
  // 세부정보 더보기 상태
  const [open, setOpen] = useState(false);

  // 세부정보 더보기 열기 버튼 클릭
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Paper
      sx={{
        maxHeight: 500,
        borderColor: "purple.main",
        color: "#747373",
        overflow: "auto",
      }}
      variant="outlined"
    >
      {/* 최근 7일이면 0, 최근 30일이면 1, 전체 기간이면 2 */}
      {/* {value} */}
      <div style={{ margin: 20 }}>
        <h3>{userInfo.name} 님의 섭취량</h3>
        <ShowIntakeCharts></ShowIntakeCharts>
        {/* 총 영양성분의 세부정보 */}
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItem>
            <ListItemText secondary="총 섭취 칼로리" />
            <ListItemText sx={listItemStyle} secondary={intake.calorie} />
          </ListItem>
          <Divider />
          <ListItem divider>
            <ListItemText secondary="탄수화물" />
            <ListItemText sx={listItemStyle} secondary={intake.carbohydrate} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="단백질" />
            <ListItemText sx={listItemStyle} secondary={intake.protein} />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText secondary="지방" />
            <ListItemText sx={listItemStyle} secondary={intake.fat} />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText secondary="총 당류" />
            <ListItemText sx={listItemStyle} secondary={intake.sugar} />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText secondary="나트륨" />
            <ListItemText sx={listItemStyle} secondary={intake.sodium} />
          </ListItem>
          <Divider light />
          <ListItem button onClick={handleClick}>
            <ListItemText secondary="세부성분 더보기" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="총 식이섬유" />
                <ListItemText sx={listItemStyle} secondary={intake.dietary_fiber} />
              </ListItem>
              <Divider light />
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="칼슘" />
                <ListItemText sx={listItemStyle} secondary={intake.calcium} />
              </ListItem>
              <Divider light />
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="철" />
                <ListItemText sx={listItemStyle} secondary={intake.iron} />
              </ListItem>
              <Divider light />
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="마그네슘" />
                <ListItemText sx={listItemStyle} secondary={intake.magnesium} />
              </ListItem>
              <Divider light />
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="인" />
                <ListItemText sx={listItemStyle} secondary={intake.phosphorus} />
              </ListItem>
              <Divider light />
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="칼륨" />
                <ListItemText sx={listItemStyle} secondary={intake.potassium} />
              </ListItem>
              <Divider light />
              <ListItem sx={{ pl: 4 }}>
                <ListItemText secondary="나트륨" />
                <ListItemText sx={listItemStyle} secondary={intake.sodium} />
              </ListItem>
              <Divider light />
            </List>
          </Collapse>
        </List>
        <h3>{userInfo.name} 님의 변화기록</h3>
        <br />
        <ShowWeightIntakeCharts></ShowWeightIntakeCharts>
        <br />
      </div>
    </Paper>
  );
}
