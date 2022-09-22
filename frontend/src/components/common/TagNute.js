/*
영양제 성분태그
@author 전상현
@since 2022.09.22
*/

import React, { useState } from "react";
import "./TagMain.css";

const TagNute = ({ tag, clickedItems, clickedItemHandler, src }) => {
  // tag의 클래스를 동적으로 바인딩할 변수
  const [type, setType] = useState(null);

  const onCheck = ({ target }) => {
    // console.log("=====onCheck=====");
    // console.log(target.className);

    clickedItemHandler(target.className);

    // css 변경을 위한 type 변경
    // 이미 클릭된 태그인 경우 id에 삭제
    if (clickedItems.includes(target.className)) {
      setType("");
    }
    // 클릭 안된 태그인 경우
    else {
      setType("clicked");
    }
  };

  return (
    <>
      <div
        id={type}
        className={tag}
        style={{
          width: "130px",
          height: "130px",
          textAlign: "center",
          borderRadius: "40px",
          backgroundColor: "#EAEBF8",
          boxShadow: "1px 3px 5px rgb(209, 215, 216)",
          margin: "15px",
        }}
        onClick={(e) => {
          onCheck(e);
        }}
      >
        <div className={tag} style={{ fontWeight: "bold", fontSize: "15px", marginTop:"57.5px" }}>
          {tag}
        </div>
      </div>
    </>
  );
};

export default TagNute;