/*
영양제 검색 페이지
@author 전상현
@since 2022.09.19
*/
import React from "react";
import Header from 'components/nav/Header';
import { Grid } from '@mui/material';
import SearchByReco from "../../pages/search/SearchByReco";
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";

const section = { marginTop:'80px' }
const section1 = { marginTop:'25vh', textAlign:'center'}
const section2 = { marginTop:'5vh', textAlign:'center'}
const section3 = { marginTop:'10vh'}

function Search() {

    return (
        <div style={ section }>
          <Header />
          <Grid container> 
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                
                <Grid item xs={4}>
                  <SearchBar />
      
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
              </Grid>
              
              <div style={section3}>
                
              </div>
              <SearchByReco />

            </Grid>
          </Grid>
        </div>
        
    );
}

export default Search;