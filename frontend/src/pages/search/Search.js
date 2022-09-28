/*
영양제 검색 페이지
@author 전상현
@since 2022.09.19
*/
import React from "react";
import { Grid } from '@mui/material';
import SearchByReco from "../../pages/search/SearchByReco";
import SideBar from "components/common/SideBar";
import SearchBar from "components/common/SearchBar";
import { useRecoilState, useRecoilValue } from 'recoil';
import { textState } from "states/textState";
import { userState } from 'states/userState'

const section = { marginTop:'80px' }
const section1 = { marginTop:'25vh', textAlign:'center'}
const section2 = { marginTop:'5vh', textAlign:'center'}
const section3 = { marginTop:'10vh'}

function Search() {

    const [ text, setText ] = useRecoilState(textState)
    const onChange = (event) => {
      setText(event.target.value);
    };

    const userInfo = useRecoilValue(userState)
    console.log(userInfo)
    console.log(userInfo[5])

    return (
        <div style={ section }>
          <Grid container> 
            {/* 좌측 사이드바 */}
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                {/* 검색창 */}
                <Grid item xs={4}>
                  <SearchBar />
                </Grid>
                <Grid item xs={5}>
                <input type="text" value={text} onChange={onChange} />
                <br />
                Echo: {text}
                </Grid>
              </Grid>
              
              <div style={section3}>
                {/* {userInfo[5]}
                {userInfo.name} */}
              </div>
              
              <SearchByReco />

            </Grid>
        </Grid>
        </div>
        
    );
}

export default Search;