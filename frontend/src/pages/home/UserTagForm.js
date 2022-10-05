/*
유저 건강고민 입력하는 컴포넌트
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";

import { Container, Grid } from "@mui/material";
import TagMain from "components/common/TagMain";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

const userTags = [
  {
    id: "1",
    src: "assets/concerns/간건강.png",
    title: "간 건강",
  },
  {
    id: "2",
    src: "assets/concerns/갑상선건강.png",
    title: "갑상선 건강",
  },
  {
    id: "3",
    src: "assets/concerns/관절&뼈건강.png",
    title: "관절 & 뼈 건강",
  },
  {
    id: "4",
    src: "assets/concerns/기억력개선.png",
    title: "기억력 개선",
  },
  {
    id: "5",
    src: "assets/concerns/긴장완화.png",
    title: "긴장 완화",
  },
  {
    id: "6",
    src: "assets/concerns/남성건강.png",
    title: "남성 건강",
  },
  {
    id: "7",
    src: "assets/concerns/노화&항산화.png",
    title: "노화",
  },
  {
    id: "8",
    src: "assets/concerns/눈건강.png",
    title: "눈 건강",
  },
  {
    id: "9",
    src: "assets/concerns/두뇌활동.png",
    title: "두뇌 활동",
  },
  {
    id: "10",
    src: "assets/concerns/면역기능.png",
    title: "면역 기능",
  },
  {
    id: "11",
    src: "assets/concerns/모발&손톱건강.png",
    title: "모발 & 손톱건강",
  },
  {
    id: "12",
    src: "assets/concerns/스트레스&수면.png",
    title: "스트레스 & 수면",
  },
  {
    id: "13",
    src: "assets/concerns/여성건강.png",
    title: "여성 건강",
  },
  {
    id: "14",
    src: "assets/concerns/운동능력개선.png",
    title: "운동능력 개선",
  },
  {
    id: "15",
    src: "assets/concerns/위건강&소화.png",
    title: "위건강 & 소화기능",
  },
  {
    id: "16",
    src: "assets/concerns/장건강.png",
    title: "장 건강",
  },
  // {
  //   id: "18",
  //   src: "assets/concerns/체액농도밸런스.png",
  //   title: "체액 농도 밸런스",
  // },
  {
    id: "19",
    src: "assets/concerns/체지방감소.png",
    title: "체지방 감소",
  },
  {
    id: "20",
    src: "assets/concerns/칼슘흡수촉진.png",
    title: "칼슘 흡수 촉진",
  },
  {
    id: "21",
    src: "assets/concerns/피로감.png",
    title: "피로감",
  },
  {
    id: "22",
    src: "assets/concerns/피부건강.png",
    title: "피부 건강",
  },
  {
    id: "23",
    src: "assets/concerns/항산화.png",
    title: "항산화",
  },
  {
    id: "24",
    src: "assets/concerns/혈관&혈액순환.png",
    title: "혈관 & 혈액순환",
  },
  {
    id: "25",
    src: "assets/concerns/혈당.png",
    title: "혈당",
  },
  {
    id: "26",
    src: "assets/concerns/혈압.png",
    title: "혈압",
  },
  {
    id: "27",
    src: "assets/concerns/혈중콜레스테롤.png",
    title: "혈중 콜레스테롤",
  },
];

export default function UserTagForm({ userCategory, setUserCategory, categories }) {
  // userState 유저 정보
  const userInfo = useRecoilValue(userState);

  const [clickedItems, setClickedItems] = useState([]);

  const clickedItemHandler = (id) => {
    //이미 클릭된 태그인 경우
    if (clickedItems.includes(id)) {
      let copy = [...clickedItems];
      let index = copy.indexOf(id);
      copy.splice(index, 1);
      setClickedItems(copy);

      userCategory.splice(index, 1);
      categories.splice(index, 1);
    }
    // 클릭 안된 태그인 경우
    else {
      // 건강고민은 3개까지 선택 가능, 초과할 시 alert
      if (clickedItems.length >= 3) {
        alert("건강고민은 최대 3개까지 선택이 가능합니다!");
      } else {
        let copy = [...clickedItems];
        copy.push(id);
        setClickedItems(copy);

        // userCategory에 데이터 넣기
        userCategory.push({
          userId: userInfo.userId,
          userCategoryInfoId: id,
        });

        // category에 데이터 넣기
        for (let i = 0; i < userTags.length; i++) {
          if (userTags[i].id == id) {
            categories.push({
              categoryId: id,
              categoryName: userTags[i].title,
            });
          }
        }
      }
      // console.log(categories);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        건강고민 선택
      </Typography>
      <Typography variant="subtitle2">
        평소의 건강고민이나 가지고 있는 질환 관련해서 최대 3가지를 선택해주세요.
        <br />
        선택하신 건강고민을 고려해서 영양제를 추천해드려요!
      </Typography>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={5}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
            }}
          >
            {userTags.map((data, i) => (
              <TagMain
                key={i}
                src={data.src}
                tag={data.title}
                tagid={data.id}
                clickedItems={clickedItems}
                clickedItemHandler={clickedItemHandler}
              />
            ))}
          </div>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
