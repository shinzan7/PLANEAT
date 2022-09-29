/*
마이페이지 > 회원 정보 수정
@author 조혜안
@since 2022.09.27
*/
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import { FormControl, FormLabel, RadioGroup, Radio } from "@mui/material";
import BtnMain from "components/common/BtnMain";

export default function UserInfo() {
  return (
    <Container component="main" sx={{ mb: 4, width: "650px", height: "700px" }}>
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          회원정보 수정
        </Typography>
        <Typography variant="subtitle">
          회원 정보를 수정하고, BMI 및 권장섭취량을 확인할 수 있습니다!
        </Typography>
        {/* 이름 */}
        <Grid
          container
          sx={{ mt: 3, mb: 2 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={3}>
            이름
          </Grid>
          <Grid item xs={9}>
            <TextField
              disabled
              id="userName"
              autoComplete="cc-exp"
              variant="standard"
              color="purple"
            />
          </Grid>
        </Grid>

        {/* 이메일 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            이메일
          </Grid>
          <Grid item xs={9}>
            <TextField
              disabled
              fullWidth
              id="userEmail"
              autoComplete="cc-exp"
              variant="standard"
              color="purple"
            />
          </Grid>
        </Grid>

        {/* 성별 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            성별
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="남"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="여"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* 나이 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            나이
          </Grid>
          <Grid item xs={9}>
            <TextField id="userAge" autoComplete="cc-number" variant="standard" color="purple" />
          </Grid>
        </Grid>

        {/* 키 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            키
          </Grid>
          <Grid item xs={9}>
            <TextField id="userHeight" autoComplete="cc-exp" variant="standard" color="purple" />
          </Grid>
        </Grid>

        {/* 몸무게 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            몸무게
          </Grid>
          <Grid item xs={9}>
            <TextField id="userWeight" autoComplete="cc-csc" variant="standard" color="purple" />
          </Grid>
        </Grid>

        {/* 활동량 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            활동량
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="notActive"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="notActive"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="비활동적"
                />
                <FormControlLabel
                  value="lessActive"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="저활동적"
                />
                <FormControlLabel
                  value="Active"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="활동적"
                />
                <FormControlLabel
                  value="veryActive"
                  control={
                    <Radio
                      sx={{
                        color: "orange.main",
                        "&.Mui-checked": {
                          color: "orange.main",
                        },
                      }}
                    />
                  }
                  label="매우 활동적"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* BMI */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            BMI
          </Grid>
          <Grid item xs={9}>
            <TextField id="userBMI" autoComplete="cc-name" variant="standard" />
          </Grid>
        </Grid>

        {/* 권장섭취량 */}
        <Grid container sx={{ mb: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            권장섭취량
          </Grid>
          <Grid item xs={9}>
            <TextField id="userRecoIntake" autoComplete="cc-name" variant="standard" />
          </Grid>
        </Grid>

        <Grid style={{ mt: 6, textAlign: "end" }}>
          <BtnMain width="100px">수정하기</BtnMain>
        </Grid>
      </React.Fragment>
    </Container>
  );
}
