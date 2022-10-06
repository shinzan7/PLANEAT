/*
영양제 검색 페이지
@author 전상현
@since 2022.09.19
*/
import React from "react";
import { Grid, Typography } from "@mui/material";
import SearchByReco from "../../pages/search/SearchByReco";
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";

const section = { marginTop: "80px" };
const section1 = { marginTop: "25vh", textAlign: "center" };
const section2 = { marginTop: "5vh", textAlign: "center" };
const section3 = { marginTop: "5vh" };

function Search() {
  return (
    <div style={section}>
      <Grid container>
        {/* 상단 문구 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          xs={12}
          style={{
            background: "none",
            borderRadius: "25px",
            margin: "20px",
            padding: "20px",
            boxShadow: "1px 2px 6px #c7c7c7",
          }}
        >
          {/* 문구 */}
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ marginBottom: "10px", fontWeight: "bold" }}
            >
              제품명으로 검색하세요!
            </Typography>
          </Grid>
          {/* 검색창 */}
          <Grid item xs={4}>
            <SearchBar />
          </Grid>
        </Grid>
        {/* 좌측 사이드바 */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        {/* 검색결과 */}
        <Grid item xs={10}>
          <SearchByReco />
        </Grid>
      </Grid>
    </div>
  );
}

export default Search;
