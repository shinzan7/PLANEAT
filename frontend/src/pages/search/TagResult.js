/*
영양제 검색 페이지 > 검색 결과(건강고민)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import CardNutrient from "components/common/CardNutrient";
import { Grid } from "@mui/material";
import SideBar from "components/common/SideBar";
import {Link} from 'react-router-dom';
import { http } from "api/http";
import styled from "styled-components";
// import Pagination from "components/common/Pagination";
import Pagination from 'react-js-pagination'



function TagResult() {
  const tagname = useParams()

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh' }
  const card = { textAlign:'left' }
  const bold = {fontWeight:'bold'}

  const [info, setInfo] = useState([])

  useEffect(() => {
    http.get(`/nutrient/tag/${tagname.id}`)
    .then(response => {
      console.log('info', response.data.data)
      setInfo(response.data.data)
    })
  }, [])

  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const offset = (page-1)*limit

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
      <div style={section}>
          <Grid container> 
            {/* 좌측 사이드바 */}
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                {/* 중앙 상단 문구 */}
                <Grid item xs={4}>
                  <p><span style={bold}>{tagname.id}</span> 개선에 도움이 되는 영양제들이에요.</p>
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
              </Grid>
              
              <div style={section3}>
                
              </div>
              
              <Grid container> 
                <Grid item xs={1}>

                </Grid>
                 {/* 태그 검색 결과  */}
                <Grid item xs={9}>
                  <Grid container>
                    {/* {info.map(function(data, i) { 
                      return (
                      <Link to={'/searchdetail/'+info[i].nutrientId} style={{textDecoration:'none'}}>
                        <CardNutrient key={i} pill={data} />
                      </Link>
                      )
                    })}       */}

                    {info.slice(offset, offset+limit).map(function(data, i) {
                      return (
                        <Link to={'/searchdetail/'+info[i].nutrientId} style={{textDecoration:'none'}}>
                          <CardNutrient key={i} pill={data} />
                        </Link>
                      )})}

                    <br></br>

                    <Grid container>
                      <Grid item xs={3}>

                      </Grid>
                      <Grid item xs={6}>
                        {/* <Pagination
                        total={info.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                      /> */}

                        <Pagination
                        activePage={page}
                        itemsCountPerPage={20}
                        totalItemsCount={info.length}
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={handlePageChange}
                      />

                      </Grid>
                      <Grid item xs={3}>
                
                      </Grid>
                    </Grid>

                    <br></br>

                  </Grid>
                </Grid>
                <Grid item xs={2}>

                </Grid>  
              </Grid>

            </Grid>
          </Grid>
      </div>
  );
}

export default TagResult;