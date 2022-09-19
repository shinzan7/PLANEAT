/*
영양제 검색 페이지
@author 전상현
@since 2022.09.19
*/
import React, { useState } from "react";
import Header from 'components/nav/Header';
import { Grid, Button, ButtonGroup, IconButton, Paper, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchByNutrient from './SearchByNutrient';
import SearchByReco from "./SearchByReco";
import SearchByTag from "./SearchByTag";
import SearchReseult from "./SearchResult";


const section = { marginTop:'80px' }
const section1 = { marginTop:'15vh', textAlign:'center'}
const title = { color:'gray', border:'none'}
const section2 = { marginTop:'5vh', textAlign:'center'}
const section3 = {marginTop:'5vh'}




function Search() {
    const data = [
      {
        id: 0,
        title: "영양제 검색",
        description: <SearchByReco />
      },
      {
        id: 1,
        title: "제품 검색",
        description: <SearchReseult />
      },
      {
        id: 2,
        title: "고민별 검색",
        description: <SearchByTag />
      },
      {
        id: 3,
        title: "성분별 검색",
        description: <SearchByNutrient />
      },
    ]

    const [index, setIndex] = useState(0);

    return (
        <div style={ section }>
          <Header />
          <Grid container> 
            <Grid item xs={1.5} style={section1}>
              <ButtonGroup orientation="vertical" variant="text" >
                {data.map(item => (
                  <Button
                  key={item.id}
                  style={title}
                  onClick={() => setIndex(item.id)}>{item.title}</Button>
                ))}
              </ButtonGroup>
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                
                <Grid item xs={6}>
                  <div>
                    <Paper component="form" sx={{display: 'flex', alignItems: 'center', borderRadius:100, backgroundColor:'#F5F5F5'}}>
                      <InputBase
                        sx={{ ml: 1, flex: 1}}
                      />
                      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  
                </Grid>
              </Grid>

              {data.filter(item => index === item.id).map(item => (
              <div style={section3}>{item.description}</div>
              ))}
            </Grid>
          </Grid>
        </div>
        
    );
}

export default Search;