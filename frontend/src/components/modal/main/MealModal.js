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
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
      'aria-controls': `simple-tabpanel-${index}`,
    };
};



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
    const [fullWidth, setFullWidth] = useState(true);

    // 검색하는 함수
    const search = (e) => {
        if (e.key === "Enter") { 
            e.preventDefault();
            console.log(searchKeyWord);
        }
    }

    // Tab 관련 함수
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth="lg"
            open={props.mealModalOpen}
            onClose={handleClose}
            id="mealModal"
      >
              { /* 모달 타이틀 */}
            <Grid container direction="row" style={{padding: "2vw", fontSize: "18px", color: "#9DA6F8", fontWeight: "bold"}} alignItems="center">
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
            <Grid container direction="row" style={{ padding: "2vw" }} alignItems="center" justifyContent="center">
                
                <Grid item xs={7}>
                    <Paper elevation={0} component="form" id = "search" sx={{ display: 'flex', alignItems: 'center', borderRadius: "24px", backgroundColor: '#F5F5F5' }}>
                        { /* 검색어 입력 부분 */}
                        <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="음식명으로 검색하세요"
                            onChange={(e) => { setSearchKeyWord(e.target.value) }} // 검색 키워드 변경
                            id="searchValue"
                            inputRef={searchInput} // input 객체를 반환
                            onKeyDown={(e) => { search(e) }} // enter시 검색하는 함수
                        />
                        { /* 검색어 삭제 버튼 */}
                        {
                        (searchKeyWord == null || searchKeyWord == "") ? null :
                            (<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                                searchInput.current.value = null; // input 객체의 값을 비운다.
                                setSearchKeyWord(null)
                            }}>
                            <HighlightOffIcon />
                            </IconButton>)
                        }
                        { /* 돋보기 버튼 */}
                        <IconButton type="button" sx={{ p: '10px', color: "#9DA6F8", mr: 2 }} aria-label="search" onClick={(e) => {
                            search(e)
                        }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            { /* 음식 선택 영역 */}
            <Tabs 
                indicatorColor="primary"
                textColor="black"
                value={value}
                sx={{ ml: "3vw", mr: "3vw" }}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
            >
                <Tab label="전체" {...a11yProps(0)} style={{minWidth: "50%"}} />
                <Tab label="MY" {...a11yProps(1)} style={{minWidth: "50%"}} />
            </Tabs>
            { /* 전체 탭 내용*/}
            <TabPanel value={value} index={0}>
            <Grid container direction="row" style={{padding: "2vw"}} alignItems="center">
                { /* 음식 선택 영역: 왼쪽 */}
                <Grid items xs={6}>
                    <StyledWrapper>
                        <div id="container">
                            왼쪽1  
                        </div>
                    </StyledWrapper>
                </Grid>
                { /* 음식 선택 영역: 오른쪽 */}
                <Grid items xs={6}>
                    <StyledWrapper>
                        <div id="container">
                            오른쪽1 
                        </div>
                    </StyledWrapper>
                </Grid>
            </Grid>
            </TabPanel>
            { /* MY 탭 내용*/}
            <TabPanel value={value} index={1}>
            <Grid container direction="row" style={{padding: "2vw"}} alignItems="center">
            { /* 음식 선택 영역: 왼쪽 */}
                <Grid items xs={6}>
                    <StyledWrapper>
                        <div id="container">
                            왼쪽1  
                        </div>
                    </StyledWrapper>
                </Grid>
                { /* 음식 선택 영역: 오른쪽 */}
                <Grid items xs={6}>
                    <StyledWrapper>
                        <div id="container">
                            오른쪽1 
                        </div>
                    </StyledWrapper>
                </Grid>
                <Grid container xs={12} justifyContent="center">
                    <Grid items xs={4}>
                        <BtnMain width="100%">음식 정보 직접 입력</BtnMain>
                    </Grid>
                </Grid>    
            </Grid>
            </TabPanel>
      </Dialog>
  );
}

const StyledWrapper = styled.div`
    
&& #container {
    background-color: white;
    padding: 2vw;
    border: 2px solid #E6E8FD;
    border-radius: 15px;
    margin: 0.3vw;
    max-width: 100%;
}

`;

