/*
영양제 검색 페이지 > 검색 결과(성분)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardNutrient from "components/common/CardNutrient";
import { Grid, Typography } from "@mui/material";
import SideBar from "components/common/SideBar";
import { Link } from "react-router-dom";
import { http } from "api/http";
import Pagination from "components/common/Pagination";
import img from "assets/drug.png";

function NutrientResult() {
  // 제품 아이디로 검색
  const ingredient = useParams();
  const location = useLocation();
  const dataTitle = location.state.data.title;

  const [info, setInfo] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    http.get(`/nutrient/ingredient/${ingredient.id}`).then((response) => {
      console.log("info", response.data.data);
      setInfo(response.data.data);
      setCount(response.data.data.length);
    });
  }, []);

  // 페이지네이터 세팅
  const [limit, setLimit] = useState(20); // 한 페이지 당 갯수
  const [page, setPage] = useState(1); // 현재 페이지 deafult = 1
  const offset = (page - 1) * limit; // 현재 페이지 첫 index

  // 페이지 변경
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div id="wrap">
      <Grid container>
        {/* 상단 문구 */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          style={{
            background: "#FFEFC9",
            borderRadius: "25px",
            margin: "20px",
            padding: "10px",
            boxShadow: "1px 2px 6px #c7c7c7",
          }}
        >
          {/* 약 이미지 */}
          <Grid item xs={3.5} style={{ textAlign: "right" }}>
            <img src={img} style={{ width: "90px", height: "90px" }} />
          </Grid>
          {/* 문구 */}
          <Grid item xs={5} style={{ marginLeft: "30px" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {dataTitle} 검색결과
              <b style={{ color: "#F7BF87", fontWeight: "bold" }}>
                {count}{" "}
              </b>{" "}
              건
            </Typography>
            <Typography variant="subtitle1">
              {dataTitle} 성분이 포함된 영양제를 만나보세요!
            </Typography>
          </Grid>
        </Grid>
        {/* 좌측 사이드 바 */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        {/* 영양제 카드 */}
        <Grid item xs={10} style={{ marginTop: "30px", marginBottom: "50px" }}>
          <Grid container justifyContent="center">
            {/* 카드들 부분 */}
            <Grid item xs={10}>
              <Grid container justifyContent="center">
                {info.slice(offset, offset + limit).map(function (data, i) {
                  return (
                    <Link
                      to={"/searchdetail/" + info[i].nutrientId}
                      style={{ textDecoration: "none" }}
                    >
                      <CardNutrient key={i} pill={data} />
                    </Link>
                  );
                })}
              </Grid>
              {/* 페이지네이션 */}
              <Grid container style={{ marginTop: "30px" }}>
                <Grid item xs={12}>
                  <Pagination
                    total={info.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NutrientResult;
