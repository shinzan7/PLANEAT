/*
영양제 검색 페이지 > 검색 결과(제품명)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect } from "react";
import CardNutrient from "components/common/CardNutrient";
import { useParams } from 'react-router-dom'
import { Grid } from "@mui/material";
import SideBar from "components/common/SideBar";
import {Link} from 'react-router-dom';
import { http } from "api/http";
import Pagination from "components/common/Pagination";


function NameResult() {
  // 성분 이름으로 검색
  const name = useParams()

  const [info, setInfo] = useState([])

  useEffect(() => {
    http.get(`/nutrient/name/${name.id}`)
    .then(response => {
      setInfo(response.data.data)
    })
  }, [])
  
  // 페이지네이터 세팅
  const [limit, setLimit] = useState(20) // 한 페이지 당 보여질 카드 갯수
  const [page, setPage] = useState(1) // 현재 페이지 default = 1 
  const offset = (page-1)*limit // 현재 페이지의 첫 index

  // 페이지 변경
  const handlePageChange = (page) => {
    setPage(page);
  };

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh' }

  return (
      <div style={section}>
          <Grid container> 
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                
                {/* 상단 문구 */}
                <Grid item xs={4}>
                  <p><span style={{fontWeight:'bold'}}>'{name.id}'</span>에 대한 제품 검색 결과가 <span style={{fontWeight:'bold'}}>{info.length}</span>건 있어요</p>
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
              </Grid>
              
              <div style={section3}>
                
              </div>
              
              <Grid container> 
                <Grid item xs={1}>

                </Grid>
                {/* 페이지네이터에서 보여지는 화면 */}
                <Grid item xs={8}>
                  <Grid container>
                  {info.slice(offset, offset+limit).map(function(data, k) {
                      return (
                        <Link to={'/searchdetail/'+info[k].nutrientId} style={{textDecoration:'none'}}>
                          <CardNutrient key={k} pill={data} />
                        </Link>
                      )})}
                  </Grid>
                </Grid>
                
                <Grid container>
                      <Grid item xs={2}>

                      </Grid>
                      <Grid item xs={6}>
                        {/* 페이지네이터 세팅 */}
                        <Pagination
                        total={info.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                      />


                      </Grid>
                      <Grid item xs={4}>
                
                      </Grid>
                    </Grid>
                        
                <Grid item xs={3}>

                </Grid>  
              </Grid>

            </Grid>
          </Grid>
      </div>
  );
}

export default NameResult;