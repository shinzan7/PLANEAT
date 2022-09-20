/*
유저 건강고민 입력하는 컴포넌트
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";

import ListItemButton from "@mui/material/ListItemButton";

import Chip from "@mui/material/Chip";
import { Container, Grid } from "@mui/material";
import TagMain from "components/common/TagMain";


const userTags = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "간 건강",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "갑상선 건강",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "관절 & 뼈 건강",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "기억력 개선",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "긴장 완화",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "남성 건강",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "노화 & 항산화",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "눈 건강",
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "두뇌활동",
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "면역 기능",
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "모발 & 손톱건강",
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "스트레스 & 수면",
  },
  {
    id: "13",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "여성 건강",
  },
  {
    id: "14",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "운동 능력 개선",
  },
  {
    id: "15",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "위 건강 & 소화기능",
  },
  {
    id: "16",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "장 건강",
  },
  {
    id: "17",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "전립선 건강",
  },
  {
    id: "18",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "체액 농도 밸런스",
  },
  {
    id: "19",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "체지방 감소",
  },
  {
    id: "20",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "칼슘 흡수 촉진",
  },
  {
    id: "21",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "피로 개선",
  },
  {
    id: "22",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "피부 건강",
  },
  {
    id: "23",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "항산화",
  },
  {
    id: "24",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈관 & 혈액순환",
  },
  {
    id: "25",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈당조절",
  },
  {
    id: "26",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈압 조절",
  },
  {
    id: "27",
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "혈중 콜레스테롤 개선",
  },
];

function clickTag() {
  console.log("클릭");
}

export default function UserTagForm() {
  const [checkedItems, setCheckedItems] = useState([]);

  const checkedItemHandler = (code, isChecked) => {
    if (isChecked) {
      // 체크 추가할 때
      setCheckedItems([...checkedItems, code]);
    } else if (!isChecked && checkedItems.find((one) => one === code)) {
      // 체크 해제할 때 checkedItems에 있을 경우
      const filter = checkedItems.filter((one) => one !== code);
      setCheckedItems([...filter]);
    }
  };

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

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={5}>
          {userTags.map((data, i) => (
            <TagMain
              key={ i}
              click={ "userForm"}
              data={data.title}
              checkedItems={checkedItems}
              checkedItemHandler={checkedItemHandler}
              />
          ))}
        </Grid>
      </Container>

      {/* <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {images.map((item) => (
            <Grid item key={ListItemButton} xs={12} sm={6} md={2}>
              <TagMain></TagMain>
              <Chip label={item.title} clickable onClick={clickTag}></Chip>
            </Grid>
          ))}
        </Grid>
      </Container> */}

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
