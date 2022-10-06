/*
페이지네이션 적용안 // 폐기
@author 전상현
@since 2022.10.03
*/

import React from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({page, total, setPage}) => {

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={20}
      totalItemsCount={total}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
};

export default Paging;
