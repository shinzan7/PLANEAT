/*
검색 페이지 / 검색 바
@author 전상현
@since 2022.09.23
*/


import React, { useState } from "react";
import { IconButton, Paper, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Link} from 'react-router-dom';



function SearchBar() {

  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = React.useRef(null);

  // 검색하는 함수
  const search = (e) => {
      if (e.key === "Enter") { 
          e.preventDefault();
          console.log(searchKeyWord);
      }
  }

  return (
    <div>
      {/* <p style={{ fontWeight:'bold'}}>제품명으로 영양제를 검색해보세요.</p>
      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', borderRadius: "24px", backgroundColor: '#F5F5F5' }} elevation="0">
        <InputBase
          sx={{ ml: 1, flex: 1}}
          />
        <Link to='/result'>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Link>
      </Paper> */}
      
      <Paper elevation={0} component="form" id = "search" sx={{ display: 'flex', alignItems: 'center', borderRadius: "24px", backgroundColor: '#F5F5F5' }}>
                        { /* 검색어 입력 부분 */}
                        <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="제품명으로 검색하세요"
                            onChange={(e) => { setSearchKeyWord(e.target.value) }} // 검색 키워드 변경
                            id="searchValue"
                            inputRef={searchInput} // input 객체를 반환
                            onKeyDown={(e) => { search(e) }} // enter시 검색하는 함수
                        />
                        { /* 검색어 삭제 버튼 */}
                        {
                        (searchKeyWord === null || searchKeyWord === "") ? null :
                            (<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                                searchInput.current.value = null; // input 객체의 값을 비운다.
                                setSearchKeyWord(null)
                            }}>
                            <HighlightOffIcon />
                            </IconButton>)
                        }
                        { /* 돋보기 버튼 */}
                          <IconButton type="button" sx={{ p: '10px', color: "#9DA6F8", mr: 2}} aria-label="search" onClick={(e) => {
                              search(e)
                          }}>
                            <Link to={'/result/'+ searchKeyWord} style={{color:'gray'}}>
                              <SearchIcon/>
                            </Link>
                          </IconButton>                  
                    </Paper>
    </div>
  )
}

export default SearchBar;