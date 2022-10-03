/*
기본 버튼 (색상 변경 필요시 사용)
속성: width(버튼 너비 수정), bgColor, fontColor
@author 여예원
@since 2022.09.30
*/

import Button from "@mui/material/Button";
import styled from "styled-components";

const BtnGray = styled(Button)`
  && {
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.fontColor};
    border-radius: 24px;
    width: ${(props) => props.width};
    height: 37px;
  }

  &:hover {
    background-color: ${(props) => props.bgColor} !important;
    transform: scale(1.1);
  }
`;

export default BtnGray;
