/*
검색 페이지 / 검색 바
@author 전상현
@since 2022.09.23
*/


import React from "react";
import { IconButton, Paper, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom';

function SearchBar() {
  return (
    <div>
      <p style={{ fontWeight:'bold'}}>제품명으로 영양제를 검색해보세요.</p>
      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', borderRadius: "24px", backgroundColor: '#F5F5F5' }} elevation="0">
        <InputBase
          sx={{ ml: 1, flex: 1}}
          />
        <Link to='/result'>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Link>
      </Paper>
    </div>
  )
}

export default SearchBar;