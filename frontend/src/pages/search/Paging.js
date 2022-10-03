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
