/*
추가 정보 입력하는 컴포넌트
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import { FormControl, FormLabel, RadioGroup, Radio } from "@mui/material";

export default function MoreInfoForm() {
  const [gender, setGender] = React.useState({
    male: true,
    female: false,
  });

  const handleChange = (event) => {
    setGender({
      ...gender,
      [event.target.name]: event.target.checked,
    });
  };

  const { male, female } = gender;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        개인정보 입력
      </Typography>
      <Typography variant="subtitle2">
        추가적으로 기입한 정보를 바탕으로 영양을 분석해드려요!
      </Typography>
      {/* 성별 */}
      <Grid sx={{ mt: 3 }} item xs={12} md={6}>
        <FormControl>
          <FormLabel
            sx={{
              "&&": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            id="demo-radio-buttons-group-label"
          >
            성별
          </FormLabel>
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
                    color: "purple.main",
                    "&.Mui-checked": {
                      color: "purple.main",
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
                    color: "purple.main",
                    "&.Mui-checked": {
                      color: "purple.main",
                    },
                  }}
                />
              }
              label="여"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {/* 나이 */}
      <Grid sx={{ mb: 2 }} item xs={12} md={6}>
        <TextField
          required
          id="userAge"
          label="나이"
          helperText="숫자로 입력해주세요 (ex.27)"
          fullWidth
          autoComplete="cc-number"
          variant="standard"
          color="purple"
        />
      </Grid>
      {/* 키 */}
      <Grid sx={{ mb: 2 }} item xs={12} md={6}>
        <TextField
          required
          id="userHeight"
          label="키"
          helperText="숫자로 입력해주세요 (ex.166)"
          fullWidth
          autoComplete="cc-exp"
          variant="standard"
          color="purple"
        />
      </Grid>
      {/* 몸무게 */}
      <Grid sx={{ mb: 2 }} item xs={12} md={6}>
        <TextField
          required
          id="userWeight"
          label="몸무게"
          helperText="숫자로 입력해주세요 (ex.48)"
          fullWidth
          autoComplete="cc-csc"
          variant="standard"
          color="purple"
        />
      </Grid>
      {/* 활동량 */}
      <Grid sx={{ mt: 3 }} item xs={12} md={6}>
        <FormControl>
          <FormLabel
            sx={{
              "&&": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            id="demo-radio-buttons-group-label"
          >
            활동량
          </FormLabel>
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
                    color: "purple.main",
                    "&.Mui-checked": {
                      color: "purple.main",
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
                    color: "purple.main",
                    "&.Mui-checked": {
                      color: "purple.main",
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
                    color: "purple.main",
                    "&.Mui-checked": {
                      color: "purple.main",
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
                    color: "purple.main",
                    "&.Mui-checked": {
                      color: "purple.main",
                    },
                  }}
                />
              }
              label="매우 활동적"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="userBMI"
            label="BMI"
            helperText="키, 몸무게, 활동량 입력 시 자동 입력"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="userRecoIntake"
            label="권장섭취량"
            helperText="키, 몸무게, 활동량 입력 시 자동 입력"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}
