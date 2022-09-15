/*
회색 버튼
너비 수정이 필요시 사용할때 width속성을 넣어 값을 지정하면 된다.
ex) <BtnGray width="120px"></BtnGray>
@author 여예원
@since 2022.09.15
*/

import Button from '@mui/material/Button';
import styled from 'styled-components';

const BtnGray = styled(Button)`
    && {
        background-color: #D9D9D9;
        color: white;
        border-radius: 24px;
        width: ${props => props.size};
        height: 37px;
    }
`;
  
export default BtnGray;