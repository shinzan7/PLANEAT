/*
검색 페이지 / 좌측 사이드 메뉴
@author 전상현
@since 2022.09.23
*/

import React from "react";
import { Button, ButtonGroup } from '@mui/material';
import {Link} from 'react-router-dom';

function SideBar() {
  const title = { color:'gray', border:'none'}
  const none = { textDecoration:'none'}

  return(
    <ButtonGroup orientation="vertical" variant="text">
      <Link to='/search' style={none}>
        <Button style={title}>
          영양제 추천
        </Button>  
      </Link> 
      <Link to='/searchtag' style={none}>
        <Button style={title}>
          고민별 검색
        </Button>  
      </Link>  
      <Link to='/searchnutrient' style={none}>
        <Button style={title}>
          성분별 검색
        </Button>  
      </Link>  
    </ButtonGroup>
  )
}

export default SideBar;