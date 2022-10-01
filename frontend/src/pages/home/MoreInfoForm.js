/*
추가 정보 입력하는 컴포넌트
@author 조혜안
@since 2022.09.15
*/
import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import { FormControl, FormLabel, RadioGroup, Radio } from "@mui/material";
import { http } from "api/http";

export default function MoreInfoForm(props) {
  // 성별
  const handleGender = (event) => {
    props.setGender(event.target.value);
  };
  // 나이
  const handleAge = (event) => {
    props.setAge(event.target.value);
  };
  // 키
  const handleHeight = (event) => {
    props.setHeight(event.target.value);
  };
  // 몸무게
  const handleWeight = (event) => {
    props.setWeight(event.target.value);
  };
  // 활동량
  const handleActive = (event) => {
    props.setActive(event.target.value);
  };

  // 숫자만 입력받게 하는 validation
  const validation = (val) => {
    let check = /^[0-9]+$/;
    // 숫자면 true, 그 외는 false 반환
    return !val || check.test(val);
  };

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
            defaultValue="M"
            name="radio-buttons-group"
            onChange={handleGender}
          >
            <FormControlLabel
              value="M"
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
              value="F"
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
      <Grid sx={{ mt: 1, mb: 2 }} item xs={12} md={6}>
        <FormControl>
          <FormLabel
            sx={{
              "&&": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            id="demo-radio-buttons-group-label"
          >
            나이
          </FormLabel>
          <TextField
            value={props.age}
            onChange={handleAge}
            required
            id="userAge"
            variant="standard"
            color="purple"
            placeholder="ex) 27"
            error={!validation(props.age)}
            helperText={!validation(props.age) ? "숫자만 입력해주세요!" : ""}
          />
        </FormControl>
      </Grid>
      {/* 키 */}
      <Grid sx={{ mb: 2 }} item xs={12} md={6}>
        <FormControl>
          <FormLabel
            sx={{
              "&&": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            id="demo-radio-buttons-group-label"
          >
            키
          </FormLabel>
          <TextField
            value={props.height}
            onChange={handleHeight}
            required
            id="userHeight"
            placeholder="ex) 166"
            variant="standard"
            color="purple"
            error={!validation(props.height)}
            helperText={!validation(props.height) ? "숫자만 입력해주세요!" : ""}
          />
        </FormControl>
      </Grid>
      {/* 몸무게 */}
      <Grid sx={{ mb: 2 }} item xs={12} md={6}>
        <FormControl>
          <FormLabel
            sx={{
              "&&": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            id="demo-radio-buttons-group-label"
          >
            몸무게
          </FormLabel>
          <TextField
            value={props.weight}
            onChange={handleWeight}
            required
            id="userWeight"
            placeholder="ex) 48"
            variant="standard"
            color="purple"
            error={!validation(props.weight)}
            helperText={!validation(props.weight) ? "숫자만 입력해주세요!" : ""}
          />
        </FormControl>
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
            defaultValue="notactive"
            name="radio-buttons-group"
            onChange={handleActive}
          >
            <FormControlLabel
              value="notactive"
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
              value="lessactive"
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
              value="active"
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
              value="veryactive"
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
    </React.Fragment>
  );
}
