/*
기능없는 메인 컬러 칩
속성: width(칩 너비), label (칩 내부 내용)
@author 여예원
@since 2022.09.15
*/

import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const ChipBlue = styled(Chip)`
    && {
        background-color: #E6E8FD;
        color: #969696;
        label: ${props => props.label};
        width: ${props => props.width};
    }
`;

export default ChipBlue;