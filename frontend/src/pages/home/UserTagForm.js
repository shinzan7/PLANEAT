/*
유저 건강고민 입력하는 컴포넌트
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";

import Typography from "@mui/material/Typography";

import ListItemButton from "@mui/material/ListItemButton";

import Chip from "@mui/material/Chip";
import { Container, Grid } from "@mui/material";

const images = [
  {
    url: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "간 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "갑상선 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "관절 & 뼈 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "기억력 개선",
  },
  {
    url: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "긴장 완화",
  },
  {
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "남성 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "노화 & 항산화",
  },
  {
    url: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "눈 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "두뇌활동",
  },
  {
    url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "면역 기능",
  },
  {
    url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "모발 & 손톱건강",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "스트레스 & 수면",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "여성 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "운동 능력 개선",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "위 건강 & 소화기능",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "장 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "전립선 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "체액 농도 밸런스",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "체지방 감소",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "칼슘 흡수 촉진",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "피로 개선",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "피부 건강",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "항산화",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈관 & 혈액순환",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈당조절",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈압 조절",
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈중 콜레스테롤 개선",
  },
];

function clickTag() {
  console.log("클릭");
}

export default function UserTagForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        건강고민 선택
      </Typography>
      <Typography variant="subtitle2">
        평소의 건강고민이나 가지고 있는 질환 관련해서 선택해주세요.
        <br />
        선택하신 건강고민을 고려해서 영양제를 추천해드려요!
      </Typography>

      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {images.map((item) => (
            <Grid item key={ListItemButton} xs={12} sm={6} md={2}>
              {/* <Chip label="ㅁㄴㅇ" onClick={clickTag} /> */}
              <Chip label={item.title} clickable onClick={clickTag}></Chip>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* <List sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ListItemButton key={item.url}>
            <img
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ListItemButton>
        ))}
      </List> */}
    </React.Fragment>
  );
}
