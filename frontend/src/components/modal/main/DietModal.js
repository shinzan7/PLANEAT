/*
내 식단으로 추가 모달
@author 여예원
@since 2022.09.28
*/

import { useState } from "react";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import BtnGray from "components/common/BtnGray";
import BtnMain from "components/common/BtnMain";

export default function DietModal(props) {

  const [fullWidth, setFullWidth] = useState(true);
  const [dietName, setDietName] = useState(""); // 식단 이름

  // 등록 시, 내 식단으로 추가하는 함수
  function registMyDiet() { 
    console.log(dietName);
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
          <Grid container direction="row" style={{padding: "2vw", fontSize: "18px", fontWeight: "bold"}} alignItems="center">
                <Grid container xs={12} style={{marginBottom: "2vw", fontSize: "20px"}}>
                선택한 음식 식단으로 추가 
                </Grid>
                <Grid container xs={12} style={{marginBottom: "2vw"}}>
                  식단이름  
                </Grid>
                <Grid container xs={12} style={{marginBottom: "2vw"}}>
              <TextField fullWidth size="small" placeholder="식단이름을 입력하세요" variant="outlined" onChange={(e) => {setDietName(e.target.value)}} /> 
                </Grid>
                <Grid container direction="row" justifyContent="space-evenly">
                  <Grid items xs={4}>
                    <BtnGray width="90%" onClick={props.close}>
                      취소
                    </BtnGray>
                  </Grid>
                  <Grid items xs={4}>
                    <BtnMain width="90%" onClick={() => { registMyDiet() }}>
                      등록
                    </BtnMain>
                  </Grid>
                </Grid>
          </Grid>
          </Dialog>
    );
  }