/*
메인 컬러 버튼
속성: width(버튼 너비 수정)
ex) <BtnMain width="120px"></BtnMain>
@author 여예원
@since 2022.09.15
*/

import Button from '@mui/material/Button';
import styled from 'styled-components';

const BtnMain = styled(Button)`
    && {
        background-color: #9DA6F8;
        color: white;
        border-radius: 24px;
        width: ${props => props.width};
        height: 37px;
    }
    
    &:hover {
        background-color: #9DA6F8 !important;
        transform: scale(1.1);
    }
`;
  
export default BtnMain;