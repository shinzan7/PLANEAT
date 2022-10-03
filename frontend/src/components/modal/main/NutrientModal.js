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
  getStepConnectorUtilityClass,
} from "@mui/material";

import styled from "styled-components";
import BtnMain from "components/common/BtnMain";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { http } from "api/http";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import { RepeatOneSharp } from "@mui/icons-material";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

export default function NutrientModal(props) {
  const userInfo = useRecoilValue(userState);

  const [fullWidth, setFullWidth] = useState(true);

  let m = props.month;
  if (m < 10) {
    m = "0" + m;
  }
  let d = props.day;
  if (d < 10) {
    d = "0" + d;
  }
  let date = props.year + "-" + m + "-" + d;

  const navigator = useNavigate();
  // 영양제 섭취기록 등록 함수
  async function registPill(e) {
    e.preventDefault();
    for (let i = 0; i < myNutrients.length; i++) {
      const response = await http.post(`/nutrient/history/${userInfo.userId}`, {
        intakeDate: date,
        intakeReal: intakes[i],
        userNutrientId: myNutrients[i].userNutrientId,
      });
      console.log(response.data);
    }
    props.close();
  }

  // 영양제 섭취 기록 수정 함수
  async function modifyPill(e) {
    e.preventDefault();
    for (let i = 0; i < myNutrients.length; i++) {
      const response = await http.put(`/nutrient/history/${userInfo.userId}`, {
        intakeDate: date,
        intakeReal: intakes[i],
        userNutrientId: myNutrients[i].userNutrientId,
      });
      console.log(response.data);
    }
    props.close();
  }

  // 영양제 등록으로 이동하는 함수
  function moveMyPage() {
    navigator("/myPage");
  }

  // 유저 영양제 목록
  const [myNutrients, setMyNutrients] = useState([]); // 유저 영양제 데이터 배열
  const [intakes, setIntakes] = useState([]); // 영양제별 섭취량 변수 배열
  const [hasRecord, setHasRecord] = useState(false); // 섭취 기록이 있는지 조회하는 변수

  // 맨 처음 유저의 영양제 목록 불러오기
  async function getUserNutrients() {
    const response = await http.get(`/nutrient/user/list/${userInfo.userId}`);
    if (response.data.message === "success") {
      setMyNutrients(response.data.data);
      // console.log(response.data.data); // 유저 영양제 정보: response.data.data
      let infos = response.data.data;

      // 등록한 영양제 복용 횟수로 초기값 설정
      let intakes = [];
      for (let i = 0; i < infos.length; i++) {
        let history = infos[i].nutriHistoryList;

        // 영양제 기록이 없는 경우
        if (history.length == 0) {
          setHasRecord(false);
          intakes[i] = Number(infos[i].intakeRecommend);
        }
        // 영양제 기록이 있는 경우
        else {
          for (let j = 0; j < history.length; j++) {
            // 영양제 기록 중 해당 날짜가 있는 경우
            if (history[j].intakeDate == date) {
              intakes[i] = history[j].intakeReal;
              setHasRecord(true);
              break;
            }
            // 영양제 기록 중 해당 날짜가 없는 경우
            else {
              intakes[i] = infos[i].intakeRecommend;
              setHasRecord(false);
            }
          }
        }
      }
      setIntakes(intakes);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getUserNutrients(); // 초기 유저 영양제 정보 가져오기
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
        <Grid
          container
          xs={12}
          style={{ marginBottom: "2vw", fontSize: "20px", color: "#9DA6F8" }}
        >
          <Grid items xs={9}>
            {props.month}월 {props.day}일 {props.mealType}
          </Grid>
          <Grid items xs={3}>
            {hasRecord == true ? (
              <>
                <BtnMain
                  width="90%"
                  onClick={(e) => {
                    modifyPill(e);
                  }}
                >
                  수정하기
                </BtnMain>
              </>
            ) : (
              <>
                <BtnMain
                  width="90%"
                  onClick={(e) => {
                    registPill(e);
                  }}
                >
                  기록하기
                </BtnMain>
              </>
            )}
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
                      <Grid
                        container
                        key={i}
                        xs={12}
                        style={{ margin: "1vw" }}
                        alignItems="center"
                      >
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
