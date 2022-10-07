/*
영양제 검색 페이지 > 검색 결과(건강고민)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardNutrient from "components/common/CardNutrient";
import { Grid, Typography } from "@mui/material";
import SideBar from "components/common/SideBar";
import { Link } from "react-router-dom";
import { http } from "api/http";
import Pagination from "components/common/Pagination";
import img from "assets/capsules.png";

function TagResult() {
  const tagname = useParams();

  const [info, setInfo] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    http.get(`/nutrient/tag/${tagname.id}`).then((response) => {
      console.log("info", response.data.data);
      setInfo(response.data.data);
      setCount(response.data.data.length);
    });
  }, []);

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
          style={{
            background: "#E6E8FD",
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
              {tagname.id} 검색결과 <b style={{ color: "#9DA6F8" }}>{count} </b>{" "}
              건
            </Typography>
            <Typography variant="subtitle1">
              {tagname.id} 고민에 좋은 영양제를 만나보세요!
            </Typography>
          </Grid>
        </Grid>

        {/* 좌측 사이드바 */}
        <Grid item xs={2}>
          <SideBar />
        </Grid>

        <Grid item xs={10} style={{ marginTop: "30px", marginBottom: "50px" }}>
          <Grid container justifyContent="center">
            {/* 카드들 부분 */}
            {/* 태그 검색 결과  */}
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

export default TagResult;
