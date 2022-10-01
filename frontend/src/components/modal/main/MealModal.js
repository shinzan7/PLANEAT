/*
식사 등록 버튼 클릭시 나오는 모달
속성: month, day, mealModalOpen, setMealModalOpen, mealtype
@author 여예원
@since 2022.09.26
*/

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";

import {
  Typography,
  Grid,
  TextField,
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import BtnMain from "components/common/BtnMain";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DietModal from "components/modal/main/DietModal";
import FoodModal from "components/modal/main/FoodModal";
import { http } from "api/http";
import { click } from "@testing-library/user-event/dist/click";
import Btn from "components/common/Btn";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MaxWidthDialog(props) {
  const [allFood, setAllFood] = useState([]); // 모든 음식, 왼쪽 영역 음식
  const [myFood, setMyFood] = useState([]); // 내가 추가한 음식

  // 맨 처음 음식 전체 데이터 가져오기
  async function getAllFood() {
    console.log("getAllFood");
    const response = await http.get(`/food-infos/1`);
    if (response.data.message === "success") {
      setAllFood(response.data.data);
      console.log(response.data.data);
    }
  }

  //todo: 로그인한 유저 아이디로 변경하기
  // 맨 처음 내 음식 가져오는 함수
  async function getMyFood() {
    console.log("getMyFood");
    const response = await http.get(`/food-infos/10`);
    if (response.data.message === "success") {
      setMyFood(response.data.data);
      console.log(response.data.data);
    }
  }

  const [isChange, setIsChange] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getAllFood();
      getMyFood();
    }
  }, [isChange]);

  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체
  const intakeFoodInput = useRef(null); // 섭취량 input 객체
  const [fullWidth, setFullWidth] = useState(true);
  const [showMoreFoodModal, setShowMoreFoodModal] = useState(false);

  // 음식 이름 검색하는 함수
  function search(e) {
    console.log("search");
    if (e.key === "Enter") {
      e.preventDefault();
    }
    console.log(searchKeyWord);
  }

  // 전체탭 음식 클릭 함수
  function foodClick(index) {
    console.log("foodClick");
    console.log(allFood[index]);
    setClickedFood(allFood[index]);
  }

  // MY탭 음식 클릭 함수
  function myFoodClick(index) {
    console.log("MYfoodClick");
    console.log(myFood[index]);
    setClickedFood(myFood[index]);
  }

  // Tab 관련 변수, 함수
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [dietModalOpen, setDietModalOpen] = useState(false); // 식단 모달 관리 변수
  const [foodModalOpen, setFoodModalOpen] = useState(false); // 음식 직접입력 모달 관리 변수
  const [clickedFood, setClickedFood] = useState(null); // 클릭한 음식
  const [clickedFoodList, setClickedFoodList] = useState([]); // 클릭한 음식 담는 배열

  // 클릭한 음식 섭취량 조절 함수
  let regex = /^[0-9]+$/;
  function changeClickedFood(e) {
    if (!regex.test(e.target.value)) {
      alert("섭취량을 숫자로 입력하세요");
      intakeFoodInput.current.value = null;
    }
    let copy = { ...clickedFood };
    copy.year = Number(intakeFoodInput.current.value); // 음식 객체의 year 를 섭취량으로 쓰자
    setClickedFood(copy);
  }

  return (
    <div>
      {/* 식단으로 추가 모달 */}
      <DietModal open={dietModalOpen} close={() => setDietModalOpen(false)} />
      {/* 내음식 추가 모달 */}
      <FoodModal
        open={foodModalOpen}
        close={() => {
          setFoodModalOpen(false);
          setShowMoreFoodModal(false);
        }}
        setIsChange={setIsChange}
        showMoreFoodModal={showMoreFoodModal}
        setShowMoreFoodModal={setShowMoreFoodModal}
      />
      <Dialog
        style={{ zIndex: 1700 }}
        keepMounted
        fullWidth={fullWidth}
        maxWidth="lg"
        open={props.mealModalOpen}
        onClose={props.close}
        id="container"
      >
        {/* 모달 타이틀 */}
        <Grid
          container
          direction="row"
          style={{
            padding: "2vw",
            fontSize: "18px",
            color: "#9DA6F8",
            fontWeight: "bold",
          }}
          alignItems="center"
        >
          <Grid container xs={7}>
            {props.month}월 {props.day}일 {props.mealType} 식사
          </Grid>
          <Grid container xs={5}>
            {/* 내 식단으로 추가 버튼 */}
            <Grid items xs={6}>
              <BtnMain
                width="80%"
                onClick={() => {
                  setDietModalOpen(true);
                }}
              >
                내 식단으로 추가
              </BtnMain>
            </Grid>
            {/* 식사 등록 버튼 */}
            <Grid items xs={6}>
              <BtnMain
                width="70%"
                onClick={() => {
                  console.log("click");
                }}
              >
                식사 등록
              </BtnMain>
            </Grid>
          </Grid>
        </Grid>
        {/* 선택 음식 칩 영역 */}
        <Grid
          container
          direction="row"
          style={{ paddingLeft: "2vw" }}
          alignItems="center"
        >
          선택 음식 칩영역
        </Grid>
        {/* 검색바 영역 */}
        <Grid
          container
          direction="row"
          style={{ padding: "2vw" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={7}>
            <Paper
              elevation={0}
              component="form"
              id="search"
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "24px",
                backgroundColor: "#F5F5F5",
              }}
            >
              {/* 검색어 입력 부분 */}
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="음식명으로 검색하세요"
                onChange={(e) => {
                  setSearchKeyWord(e.target.value);
                }} // 검색 키워드 변경
                id="searchValue"
                inputRef={searchInput} // input 객체를 반환
                onKeyDown={(e) => {
                  search(e);
                }} // enter시 검색하는 함수
              />
              {/* 검색어 삭제 버튼 */}
              {searchKeyWord == null || searchKeyWord == "" ? null : (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => {
                    searchInput.current.value = null; // input 객체의 값을 비운다.
                    setSearchKeyWord(null);
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
              )}
              {/* 돋보기 버튼 */}
              <IconButton
                type="button"
                sx={{ p: "10px", color: "#9DA6F8", mr: 2 }}
                aria-label="search"
                onClick={(e) => {
                  search(e);
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        {/* 음식 선택 영역 */}
        <Tabs
          indicatorColor="primary"
          textColor="inherit"
          value={value}
          sx={{ ml: "3vw", mr: "3vw" }}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="전체" {...a11yProps(0)} style={{ minWidth: "50%" }} />
          <Tab label="MY" {...a11yProps(1)} style={{ minWidth: "50%" }} />
        </Tabs>
        {/* 전체 탭 내용*/}
        <TabPanel value={value} index={0}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {/* 음식 선택 영역: 왼쪽 */}
            <Grid items xs={6}>
              <StyledWrapper>
                <Grid container xs={12} id="container">
                  <List sx={{ width: "100%" }}>
                    {allFood.map(function (food, i) {
                      return (
                        <ListItemButton key={i} onClick={() => foodClick(i)}>
                          <ListItemText
                            primary={food.name}
                            secondary={`${food.calorie}kcal, ${food.servingSize}${food.servingUnit}, (1회 제공량)`}
                            id={i}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 선택 영역: 오른쪽 */}
            <Grid items xs={6}>
              <StyledWrapper>
                <Grid
                  container
                  id="container"
                  justifyContent="center"
                  alignItems="center"
                >
                  {clickedFood == null ? (
                    <Grid id="noClickedFood">
                      <Grid items xs={12} sx={{ mb: 2 }}>
                        <img src="assets/planet.png" id="planet" />
                      </Grid>
                      <Grid items xs={12}>
                        음식을 클릭하면 영양성분을 확인할 수 있어요
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      xs={12}
                      style={{
                        background: "red",
                        padding: "3%",
                        height: "400px",
                      }}
                    >
                      {JSON.stringify(clickedFood)}
                      {/* 음식명 */}
                      <Grid
                        container
                        xs={12}
                        style={{ background: "yellow" }}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid items xs={6} style={{ fontSize: "18px" }}>
                          섭취량 설정
                        </Grid>
                        <Grid items xs={3}>
                          <Btn bgColor="#E6E8FD" fontColor="black">
                            식사에 추가
                          </Btn>
                        </Grid>
                      </Grid>
                      {/* 음식 양 */}
                      <Grid items xs={12} style={{ background: "green" }}>
                        <ListItemText
                          primary={clickedFood.name}
                          secondary={`${clickedFood.calorie}kcal, ${clickedFood.servingSize}${clickedFood.servingUnit}, (1회 제공량)`}
                        />
                        <FormControl
                          sx={{ m: 1, width: "25ch" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            id="outlined-adornment-weight"
                            defaultValue={clickedFood.servingSize}
                            onChange={(e) => {
                              changeClickedFood(e);
                            }}
                            inputRef={intakeFoodInput}
                            endAdornment={
                              <InputAdornment position="end">
                                {clickedFood.servingUnit}
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid items xs={12} style={{ background: "blue" }}>
                        차트
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </StyledWrapper>
            </Grid>
          </Grid>
        </TabPanel>
        {/* MY 탭 내용*/}
        <TabPanel value={value} index={1}>
          <Grid container direction="row" alignItems="center">
            {/* 음식 선택 영역: 왼쪽 */}
            <Grid items xs={6}>
              <StyledWrapper>
                <Grid container xs={12} id="container" elevation={0}>
                  <List
                    sx={{ width: "100%" }}
                    subheader={
                      <ListSubheader
                        sx={{ fontWeight: "bold", fontSize: "18px" }}
                        component="div"
                        id="nested-list-subheader"
                      >
                        내 음식
                      </ListSubheader>
                    }
                  >
                    {myFood.map(function (food, i) {
                      return (
                        <ListItemButton key={i} onClick={() => myFoodClick(i)}>
                          <ListItemText
                            primary={food.name}
                            secondary={`${food.calorie}kcal, ${food.servingSize}${food.servingUnit}, (1회 제공량)`}
                            id={i}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 선택 영역: 오른쪽 */}
            <Grid items xs={6}>
              <StyledWrapper>
                <Grid
                  container
                  id="container"
                  justifyContent="center"
                  alignItems="center"
                >
                  {clickedFood == null ? (
                    <Grid id="noClickedFood">
                      <Grid items xs={12} sx={{ mb: 2 }}>
                        <img src="assets/planet.png" id="planet" />
                      </Grid>
                      <Grid items xs={12}>
                        음식을 클릭하면 영양성분을 확인할 수 있어요
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <div>클릭한 음식 있음</div>
                    </>
                  )}
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 정보 직접 입력 버튼 */}
            <Grid container xs={12} justifyContent="center">
              <Grid items xs={4}>
                <BtnMain
                  width="100%"
                  onClick={() => {
                    setFoodModalOpen(true);
                  }}
                >
                  음식 정보 직접 입력
                </BtnMain>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
      </Dialog>
    </div>
  );
}

const StyledWrapper = styled.div`
  && #container {
    background-color: white;
    margin: 1vw;
    border: 2px solid #e6e8fd;
    border-radius: 15px;
    width: 95%;
    height: 400px;
    overflow: auto;
    scrollbar-width: thin;
  }
  && #container::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 100px;
  }

  /* 스크롤바 뒷 배경 */
  && #container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 100px;
  }

  /* 스크롤바 막대 */
  && #container::-webkit-scrollbar-thumb {
    background-color: #bababa;
    border-radius: 100px;
  }

  && #noClickedFood {
    font-weight: bold;
    text-align: center;
  }

  && #planet:hover {
    transform: scale(1.1);
  }
`;
