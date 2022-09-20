/*
관심 건강고민 태그
@author 조혜안
@since 2022.09.19
*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TagDiv = styled.div`
  .clicked {
    background-color: "#9DA6F8";
  }
`;

const TagMain = ({ data, checkedItems, checkedItemHandler }) => {
  const [isChecked, setIsChecked] = useState(null);
  const [isClicked, setIsClicked] = useState(null);

  const onCheck = ({ target }) => {
    checkedItemHandler(target.value, target.checked);
    setIsChecked(target.checked);
    setIsClicked(target.checked);
  };

  useEffect(() => {
    if (checkedItems.includes(data)) {
      setIsChecked(true);
      setIsClicked("clicked");
    } else {
      setIsChecked(false);
      setIsClicked("unclicked");
    }
  }, [checkedItems]);

  return (
    <>
      <div
        style={{
          width: "160px",
          height: "160px",
          textAlign: "center",
          borderRadius: "40px",
          backgroundColor: "white",
          boxShadow: "1px 3px 5px rgb(209, 215, 216)",
        }}
      >
        <img src="assets/혈당.png" style={{ marginTop: "20px", width: 80, height: 70 }}></img>
        <div style={{ marginTop: "10px" }}>{data}</div>
      </div>
    </>
  );
};

export default TagMain;
