/*
메인 컬러 버튼
너비 수정이 필요시 사용할때 width속성을 넣어 값을 지정하면 된다.
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
        width: ${props => props.size};
        height: 37px;
    }
`;
  
export default BtnMain;