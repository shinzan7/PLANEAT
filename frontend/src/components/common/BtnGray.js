// 회색 버튼

import Button from '@mui/material/Button';
import styled from 'styled-components';

const BtnGray = styled(Button)`
    && {
        background-color: #D9D9D9;
        color: white;
        border-radius: 24px;
        width: ${props => props.size};
    }
`;
  
export default BtnGray;