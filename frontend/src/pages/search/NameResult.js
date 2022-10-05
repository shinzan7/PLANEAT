/*
영양제 검색 페이지 > 검색 결과(제품명)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect } from "react";
import CardNutrient from "components/common/CardNutrient";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import SideBar from "components/common/SideBar";
import { Link } from "react-router-dom";
import { http } from "api/http";
import Pagination from "components/common/Pagination";

function NameResult() {
  // 성분 이름으로 검색
  const name = useParams();

  const [info, setInfo] = useState([]);

  useEffect(() => {
    http.get(`/nutrient/name/${name.id}`).then((response) => {
      setInfo(response.data.data);
    });
  }, []);

  // 페이지네이터 세팅
  const [limit, setLimit] = useState(20); // 한 페이지 당 보여질 카드 갯수
  const [page, setPage] = useState(1); // 현재 페이지 default = 1
  const offset = (page - 1) * limit; // 현재 페이지의 첫 index

  // 페이지 변경
  const handlePageChange = (page) => {
    setPage(page);
  };

  const section = { marginTop: "80px" };
  const section1 = { marginTop: "25vh", textAlign: "center" };
  const section2 = { marginTop: "5vh", textAlign: "center" };
  const section3 = { marginTop: "10vh" };

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
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              '{name.id}'에 대한 검색결과&nbsp;
              <b style={{ color: "#9DA6F8", fontWeight: "bold" }}>
                {info.length}
              </b>
              &nbsp;건
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10} style={{ marginTop: "30px", marginBottom: "50px" }}>
          <Grid container justifyContent="center">
            {/* 페이지네이터에서 보여지는 화면 */}
            <Grid item xs={10}>
              <Grid container justifyContent="center">
                {info.slice(offset, offset + limit).map(function (data, k) {
                  return (
                    <Link
                      to={"/searchdetail/" + info[k].nutrientId}
                      style={{ textDecoration: "none" }}
                    >
                      <CardNutrient key={k} pill={data} />
                    </Link>
                  );
                })}
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: "30px" }}>
              <Grid item xs={12}>
                {/* 페이지네이터 세팅 */}
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
    </div>
  );
}

export default NameResult;
