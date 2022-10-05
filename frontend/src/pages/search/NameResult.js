/*
영양제 검색 페이지 > 검색 결과(제품명)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect } from "react";
import CardNutrient from "components/common/CardNutrient";
import { useParams } from 'react-router-dom'
import { Grid, responsiveFontSizes } from "@mui/material";
import SideBar from "components/common/SideBar";
import {Link} from 'react-router-dom';
import { http } from "api/http";
import Pagination from "components/common/Pagination";


function NameResult() {
  const name = useParams()

  const [info, setInfo] = useState([])

  useEffect(() => {
    http.get(`/nutrient/name/${name.id}`)
    .then(response => {
      // console.log(response.data.data)
      setInfo(response.data.data)
    })
  }, [])
  
  console.log('info', info)

      
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const offset = (page-1)*limit

  const handlePageChange = (page) => {
    setPage(page);
  };

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh' }
  const card = { textAlign:'left' }

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