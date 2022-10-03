/*
페이지네이션
@author 전상현
@since 2022.10.01
*/

import styled from "styled-components";
import React, { useState } from 'react'

function Pagination({ total, limit, page, setPage }) {
  const numPages =[];
  for (let i = 1; i <= Math.ceil(total/ limit); i++) {
    numPages.push(i);
  }

  const [limit2, setLimit2] = useState(10) 
  const offset = Math.floor((page-1)/10)*limit2

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(Math.floor((page-11)/10)*10+1)} disabled={page <= 10}>
          &lt;
        </Button>

        {numPages.slice(offset, offset+limit2).map(function(number) {
          return (
            <Button
              key={number}
              onClick={() => setPage(number)}
              aria-current={page === number ? "page" : null}
            >
              {number}
            </Button>
          )})} 

        <Button onClick={() => setPage(Math.floor((page+9)/10)*10+1)} disabled={ (Math.floor((Math.ceil(total/limit)-1)/10)*10)+1 <= page && page <= Math.ceil(total / limit) } >
          &gt;
        </Button>
      </Nav>
    </>
  );
}


// (Math.floor((Math.ceil(total/limit)-1)/10)*10)+1 <= page <= Math.ceil(total / limit)
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;