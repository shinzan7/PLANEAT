/*
영양제 성분태그
속성: tag(성분명)
@author 전상현
@since 2022.09.22
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TagMain.css";

const TagNute = ({ tag, index }) => {

  const navigate = useNavigate();

  const onCheck = ({ target }) => {
    console.log("=====onCheck=====");
    console.log(target.id); // 영양성분의 아이디 (1,2,3, ... )
  };

  return (
    <>
      <div
        id={index}
        className="container"
        onClick={(e) => {
          onCheck(e);
        }}
      >
        <div id={index} className="tag" style={{ fontWeight: "bold", fontSize: "15px"}}>
          {tag}
        </div>
      </div>
    </>
  );
};

export default TagNute;