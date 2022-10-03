/*
내 식단으로 추가 모달
@author 여예원
@since 2022.09.28
*/

import { useState } from "react";
import {
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  alertTitleClasses,
} from "@mui/material";
import BtnGray from "components/common/BtnGray";
import BtnMain from "components/common/BtnMain";
import { useRef } from "react";
import { http } from "api/http";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

export default function DietModal(props) {
  const userInfo = useRecoilValue(userState);
  const [fullWidth, setFullWidth] = useState(true);
  const [dietName, setDietName] = useState(""); // 식단 이름
  const dietNameInput = useRef(null);

  // 등록 시, 내 식단으로 추가하는 함수
  async function registMyDiet() {
    console.log(dietName);
    console.log(props.foodList);

    let copy = [];

    for (let i = 0; i < props.foodList.length; i++) {
      copy.push({
        amount: props.foodList[i].amount,
        foodInfoId: props.foodList[i].foodInfoId,
      });
    }

    console.log(copy);

    const response = await http.post(`my-diets/${userInfo.userId}`, {
      dietInfosList: copy,
      dietName: dietName,
    });

    if (response.data.message == "success") {
      setDietName(null);
      props.close();
      alert("식단 등록에 성공했습니다.");
    } else {
      alert("식단 등록에 실패했습니다.");
    }
  }

  return (
    <Dialog
      style={{ zIndex: 1800 }}
      keepMounted
      fullWidth={fullWidth}
      maxWidth="xs"
      open={props.open}
      onClose={props.close}
      id="mealModal"
    >
      <Grid
        container
        direction="row"
        style={{ padding: "2vw", fontSize: "18px", fontWeight: "bold" }}
        alignItems="center"
      >
        {JSON.stringify(props.foodList)} {dietName}
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw", fontSize: "20px" }}
        >
          선택한 음식 식단으로 추가
        </Grid>
        <Grid container xs={12} style={{ marginBottom: "2vw" }}>
          식단이름
        </Grid>
        <Grid container xs={12} style={{ marginBottom: "2vw" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="식단이름을 입력하세요"
            variant="outlined"
            inputRef={dietNameInput}
            onChange={(e) => {
              setDietName(e.target.value);
            }}
          />
        </Grid>
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid items xs={4}>
            <BtnGray
              width="90%"
              onClick={() => {
                setDietName(null); // 식단 이름 state 삭제
                dietNameInput.current.value = null; // 식단 이름 input value 삭제
                props.close();
              }}
            >
              취소
            </BtnGray>
          </Grid>
          <Grid items xs={4}>
            <BtnMain
              width="90%"
              onClick={() => {
                registMyDiet();
              }}
            >
              등록
            </BtnMain>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
