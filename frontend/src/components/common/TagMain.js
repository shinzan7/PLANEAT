/*
관심 건강고민 태그
@author 조혜안
@since 2022.09.19
*/

import { ContactlessOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./TagMain.css"

const TagDiv = styled.div`
  .clicked {
    background-color: "#9DA6F8";
  }
`;

const TagMain = ({ data, checkedItems, checkedItemHandler, click }) => {
  const [isChecked, setIsChecked] = useState(null);
  const [isClicked, setIsClicked] = useState(null);

  // tag의 클래스를 동적으로 바인딩할 변수
  const [type, setType] = useState(null);

  // 선택된 태그를 담을 변수 (store 로 이동 필요)
  const [clickTag, setClickTag] = useState([]);

  const [test, setTest] = useState([]);

  const onCheck = ({ props }) => {
    console.log(props.data);
    // checkedItemHandler(target.value, target.checked);
    // setIsChecked(target.checked);
    // setIsClicked(target.checked);
  };

  // userTagFrom.js 에서 클릭시 발생하는 함수
  const userFormClick = function (props) { 
    console.log("====1====");
    console.log(clickTag);

    setType("clicked");
    let copy = [...clickTag];

    console.log("====2====");
    console.log(copy);

    if (copy.includes(props)) { 
      let index = copy.indexOf(props);
      console.log(index);
      copy.splice(index, 1);
      setClickTag(copy);
      setType("");

      console.log("====3====");
      console.log(clickTag);

    } else {
      copy.push(props);
      setClickTag(copy);
     
      console.log("====3====");
      console.log(clickTag);
    }
  }

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
        className={ type }
        style={{
          width: "160px",
          height: "160px",
          textAlign: "center",
          borderRadius: "40px",
          backgroundColor: "white",
          boxShadow: "1px 3px 5px rgb(209, 215, 216)",
          margin: "15px",
        }}
        onClick={() => { 
          if (click == "userForm") {
            userFormClick(data);
          } else if (click == "search") { 
            console.log("search");
          }
        }}
      >
        <img src="assets/혈당.png" style={{ marginTop: "20px", width: 80, height: 70 }}></img>
        <div style={{ marginTop: "10px" }}>{data}</div>
      </div>
    </>
  );
};

export default TagMain;
