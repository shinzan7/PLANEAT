/*
기능없는 주황 컬러 칩
속성: width(칩 너비), label (칩 내부 내용)
@author 여예원
@since 2022.09.15
*/

import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const ChipOrange = styled(Chip)`
    && {
        background-color: #FDEDDE;
        color: #969696;
        label: ${props => props.label};
        width: ${props => props.width};
        onClick
        onDelete
    }
`;

export default ChipOrange;