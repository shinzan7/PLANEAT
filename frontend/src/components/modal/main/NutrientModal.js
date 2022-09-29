/*
영양제 섭취 기록 모달
@author 여예원
@since 2022.09.29
*/

import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import BtnMain from "components/common/BtnMain";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { http } from "api/http";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";

export default function NutrientModal(props) {
  const [fullWidth, setFullWidth] = useState(true);

  const navigator = useNavigate();
  // 영양제 섭취 등록 함수
    async function registPill(e) {
        e.preventDefault();

        let m = props.month;
        
        if (m < 10) { 
            m = "0" + m;
        }

        let date = props.year + "-" + m + "-" + props.day;
        
        console.log(typeof(date));
        console.log(typeof(intakes[0]));
        console.log(typeof(myNutrients[0].userNutrientId))

        console.log(new Date());
        const response = await http.post(`/nutrient/history`,
            {
                intakeDate: "2022-09-25",
                intakeReal: 3,
                userNutrientId: 31
            }
        );
        
        console.log(response.data);
        
    
  }

  function moveMyPage() {
    navigator("/myPage");
  }

  // 유저 영양제 목록
  const [myNutrients, setMyNutrients] = useState([]);
  const [intakes, setIntakes] = useState([]);

  // 맨 처음 유저의 영양제 목록 불러오기
  async function getUserNutrients() {
    // todo: 로그인한 유저의 id로 변경 필요
      console.log("click");
    const response = await http.get(`/nutrient/user/list/10`);
    if (response.data.message === "success") {
      setMyNutrients(response.data.data);
        console.log(response.data.data);

        // 등록한 영양제 복용 횟수로 초기값 설정
        let intakes = [];
        for (let i = 0; i < response.data.data.length; i++) { 
            intakes[i] = response.data.data[i].intakeRecommend;
        }

        setIntakes(intakes);
    }
    }
    const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
        getUserNutrients();
    }
  }, []);


  // 영양제 섭취횟수 증가 함수
  function addIntakes(index) {
    let copy = [...intakes];
    copy[index]++;
    setIntakes(copy);
  }

  // 영양제 섭취횟수 감소 함수
  function minusIntakes(index) {
    let copy = [...intakes];
    if (copy[index] > 0) {
      copy[index]--;
    }
    setIntakes(copy);
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
        {/* 모달 타이틀 */}
        <Grid container xs={12} style={{ marginBottom: "2vw", fontSize: "20px", color: "#9DA6F8" }}>
          <Grid items xs={9}>
                      {props.month}월 {props.day}일 {props.mealType} { intakes}
          </Grid>
          <Grid items xs={3}>
            <BtnMain
              width="90%"
              onClick={(e) => {
                registPill(e);
              }}
            >
              기록 하기
            </BtnMain>
          </Grid>
        </Grid>
        {/* 모달 내용 */}
        <StyledComponent>
          <Grid container xs={12} id="container">
            {myNutrients.length == 0 ? (
              <>
                <Grid items xs={12}>
                  <div>
                    등록한 영양제가 없어요.
                    <br />
                    [마이 페이지] -> [영양제 관리]에서
                    <br />
                    영양제를 등록해주세요.
                  </div>
                </Grid>
              </>
            ) : (
              <>
                <Grid container xs={12}>
                  {myNutrients.map(function (pill, i) {
                    return (
                      <Grid container key={i} xs={12} style={{ margin: "1vw" }} alignItems="center">
                        <Grid items xs={9}>
                          {pill.nutrientName}
                        </Grid>
                        <Grid items xs={1}>
                          <IconButton
                            size="small"
                            id={i}
                            onClick={() => {
                              minusIntakes(i);
                            }}
                            className="numberBtn"
                          >
                            <RemoveIcon id={i} fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid items xs={1}>
                          <input
                            min="0"
                            type="number"
                            className="number"
                            value={intakes[i]}
                          ></input>
                        </Grid>
                        <Grid items xs={1}>
                          <IconButton
                            id={i}
                            onClick={() => {
                              addIntakes(i);
                            }}
                            className="numberBtn"
                            size="small"
                          >
                            <AddIcon fontSize="inherit" id={i} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid container xs={12} justifyContent="center" style={{ marginTop: "2vw" }}></Grid>
              </>
            )}
          </Grid>
          {/* 모달 하단 버튼 */}
          <Grid container xs={12} justifyContent="center" sx={{ mt: 3 }}>
            <Grid items xs={5}>
              <BtnMain
                width="100%"
                onClick={() => {
                  moveMyPage();
                }}
              >
                영양제 추가하기
              </BtnMain>
            </Grid>
          </Grid>
        </StyledComponent>
      </Grid>
    </Dialog>
  );
}

const StyledComponent = styled.div`
  && #container {
    background-color: white;
    padding: 2vw;
    border: 2px solid #e6e8fd;
    border-radius: 15px;
    width: 100%;
    max-height: 400px;
    overflow: auto;
    scrollbar-width: thin;
  }

  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  .number {
    border: 2px solid #d9d9d9;
    display: inline-flex;
    width: 100%;
    padding: 0;
    text-align: center;
  }
`;
