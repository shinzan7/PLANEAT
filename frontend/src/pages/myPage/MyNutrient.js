/*
마이페이지 > 영양제 등록
@author 조혜안
@since 2022.09.27
*/
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Typography, Grid, TextField, Container, FormControl } from "@mui/material";
import BtnMain from "components/common/BtnMain";
import ToggleButton from "@mui/material/ToggleButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import { http } from "api/http";
import ChipDeletable from "components/common/ChipDeletable";

// 영양제 목록
const nutrients = [
  { nutrient_id: "1", nutrient_name: "영양제 1" },
  { nutrient_id: "2", nutrient_name: "영양제 2" },
  { nutrient_id: "3", nutrient_name: "영양제 3" },
  { nutrient_id: "4", nutrient_name: "영양제 4" },
  { nutrient_id: "5", nutrient_name: "영양제 5" },
  { nutrient_id: "6", nutrient_name: "영양제 6" },
  { nutrient_id: "7", nutrient_name: "영양제 7" },
  { nutrient_id: "8", nutrient_name: "영양제 8" },
  { nutrient_id: "9", nutrient_name: "영양제 9" },
  { nutrient_id: "10", nutrient_name: "영양제 10" },
];

// 내 영양제 목록
const myNutrients0 = [
  { user_nutrient_id: 1, nutrient_name: "내영양제 1" },
  { user_nutrient_id: 2, nutrient_name: "내영양제 2" },
  { user_nutrient_id: 3, nutrient_name: "내영양제 3" },
  { user_nutrient_id: 4, nutrient_name: "내영양제 4" },
];

export default function UserInfo() {
  // 영양제 알림 구독 토글버튼 (구독하기 / 구독중)
  const [selected, setSelected] = useState(false);

  // 영양제 등록 모달 열기
  const [open, setOpen] = useState(false);

  // 영양제 섭취 횟수
  const [intakeCnt, setIntakeCnt] = useState("1");
  const handleChangeCnt = (event) => {
    setIntakeCnt(event.target.value);
  };

  // 등록한 내 영양제 이름
  const [myNutrientName, setMyNutrientName] = useState("");

  // 유저 영양제 목록
  const [myNutrients, setMyNutrients] = useState([]);

  // 맨 처음 유저의 영양제 목록 불러오기
  async function getUserNutrients() {
    // 8 -> 로그인한 유저의 id로 변경 필요
    const response = await http.get(`/nutrient/user/list/8`);
    if (response.data.message === "success") {
      // console.log(response.data.data);
      setMyNutrients(response.data.data);
      // myNutrients = JSON.stringify(myNutrients);
      // console.log(myNutrients);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // console.log(myNutrients);
      // console.log("업데이트 될 때마다 실행");
      getUserNutrients();
    }
  }, [myNutrients]);

  // 내 영양제 등록 함수
  const registMyNutrient = (event) => {
    // console.log(intakeCnt);
    // console.log(myNutrientName);
    setOpen(false);
  };

  // 모달 열기
  const showModal = () => {
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.orange.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.orange.main,
    },
  }));

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4, width: "100%", height: "700px" }}>
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          영양제 관리
        </Typography>
        <Typography variant="subtitle">복용 중인 영양제를 관리할 수 있습니다!</Typography>
        {/* 영양제 알림 서비스 */}
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          영양제 알림 서비스
          <BootstrapTooltip title="서비스 준비중입니다. 조금만 기다려주세요">
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </BootstrapTooltip>
        </div>
        <ToggleButton
          color="secondary"
          size="medium"
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          {selected ? "구독중" : "구독하기"}
        </ToggleButton>
        {/* 영양제 등록 */}
        <Grid
          container
          sx={{ mt: 3, mb: 2 }}
          rowSpacing={1}
          //   columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item sx={{ mr: 1 }}>
            내 영양제 등록
          </Grid>
          <Grid item>
            <AddCircleOutlineIcon color="secondary" onClick={showModal}></AddCircleOutlineIcon>
          </Grid>
        </Grid>
      </React.Fragment>
      {/* 등록한 영양제 리스트 */}
      <div>
        {myNutrients.map((data, i) => (
          <ChipDeletable
            bgcolor="#FFEFC9"
            col="black"
            value={data.userNutrientId}
            sx={{ marginRight: "15px", marginBottom: "10px" }}
            onDelete={() => {
              // console.log(data.userNutrientId);
              const id = data.userNutrientId;
              const response = http.delete(`/nutrient/user/${id}`);
            }}
            label={data.nutrientName}
          ></ChipDeletable>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle color="#9DA6F8">내 영양제 등록하기</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>영양제 이름</DialogContentText>
          <Autocomplete
            onChange={(event, value) => setMyNutrientName(value)}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={nutrients.map((option) => option.nutrient_name)}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          {/* <TextField autoFocus margin="dense" id="name" type="text" fullWidth variant="standard" /> */}
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>하루 복용 횟수</DialogContentText>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">횟수</InputLabel>
            <Select value={intakeCnt} onChange={handleChangeCnt} label="횟수">
              <MenuItem value={1}>1회</MenuItem>
              <MenuItem value={2}>2회</MenuItem>
              <MenuItem value={3}>3회</MenuItem>
              <MenuItem value={4}>4회</MenuItem>
              <MenuItem value={5}>5회</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <BtnMain width="80px" onClick={handleClose}>
            취소
          </BtnMain>
          <BtnMain width="80px" onClick={registMyNutrient}>
            등록
          </BtnMain>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
