/*
식사 등록 버튼 클릭시 나오는 모달
속성: month, day, mealModalOpen, setMealModalOpen, mealtype
@author 여예원
@since 2022.09.26
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Typography, Grid, TextField, Paper, InputBase, IconButton } from '@mui/material';
import BtnMain from 'components/common/BtnMain';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';

export default function MaxWidthDialog(props) {

  // 모달 여는 함수
  const handleClickOpen = () => {
    props.setMealModalOpen(true);
  };

  // 모달 닫는 함수
  const handleClose = () => {
    props.setMealModalOpen(false);
    };
    
    const [searchKeyWord, setSearchKeyWord] = useState();
    const searchInput = React.useRef(null);

    const search = (e) => { 
        e.preventDefault();
        console.log(searchKeyWord);
    }

  return (
      <Dialog
        fullWidth="true"
        maxWidth="lg"
        open={props.mealModalOpen}
        onClose={handleClose}
        id="mealModal"
      >
              { /* 모달 타이틀 */}
              <Grid container direction="row" style={{padding: "2vw", fontSize: "18px", color: "#9DA6F8"}} alignItems="center">
                  <Grid container xs={7}>
                  {props.month}월 {props.day}일 {props.mealType} 식사  
                  </Grid>
                  <Grid container xs={5}>
                      { /* 내 식단으로 추가 */}
                      <Grid items xs = {6}>
                      <BtnMain width="80%" onClick={() => { console.log("click")}}> 내 식단으로 추가</BtnMain>
                      </Grid>
                      { /* 식사 등록 */}
                      <Grid items xs={6}>
                          <BtnMain width="70%" onClick={() => { console.log("click") }}>식사 등록</BtnMain>
                      </Grid>   
                  </Grid>
              </Grid>
              { /* 선택 음식 칩 영역 */}
              <Grid container  direction="row" style={{paddingLeft: "2vw"}} alignItems="center">
                  선택 음식 칩영역
              </Grid>
              { /* 검색바 영역 */}
              <Grid container direction="row" style={{ padding: "2vw" }} alignItems="center">
              <Grid item xs={2.5}></Grid>  
                <Grid item xs={7}>
                    <Paper elevation="0" component="form" id = "search" sx={{ display: 'flex', alignItems: 'center', borderRadius: "24px", backgroundColor: '#F5F5F5' }}>
                    <InputBase
                          sx={{ ml: 2, flex: 1 }}
                          placeholder="음식명으로 검색하세요"
                          onChange={(e) => { setSearchKeyWord(e.target.value) }}
                          id="searchValue"
                          inputRef={searchInput} // input 객체를 반환
                          onKeyPress={(e) => { search(e) }}
                          type="text"
                      />
                    { // 검색어 삭제 버튼
                          (searchKeyWord == null || searchKeyWord == "") ? null :
                              (<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                                  searchInput.current.value = null; // input 객체의 값을 비운다.
                                  setSearchKeyWord(null)
                              }}>
                          <HighlightOffIcon />
                          </IconButton>)
                    }
                      <IconButton type="button" sx={{ p: '10px', color: "#9DA6F8", mr: 2 }} aria-label="search" onClick={(e) => {
                          search(e)
                      }}>
                        <SearchIcon />
                    </IconButton>
                    </Paper>
                </Grid>
              <Grid item xs={2.5}></Grid> 
              </Grid>
             { /* 음식 선택 영역 */}
              <Grid container direction="row" style={{padding: "2vw"}} alignItems="center">
              { /* 음식 선택 영역: 왼쪽 */}
                <Grid item xs={6}>
                    <StyledWrapper>
                        <Grid container id="container" xs={ 12} direction="row">
                            왼쪽
                        </Grid>
                    </StyledWrapper>
              </Grid>
              { /* 음식 선택 영역: 오른쪽 */}
                <Grid item xs={6}>
                <StyledWrapper>
                        <Grid container id="container" xs={ 12} direction="row">
                            오른쪽
                        </Grid>
                    </StyledWrapper>
                </Grid>
              </Grid>
      </Dialog>
  );
}

const StyledWrapper = styled.div`
    
#container {
    background-color: white;
    box-shadow: 1px 2px 5px #c7c7c7;
    padding: 2vw;
    border-radius: 15px;
    width: 90%;
    margin: auto;
    margin-top: 2vw;
}

`;

