// 내 식단으로 추가 모달

import { useState } from "react";
import { Dialog } from "@mui/material";

export default function MaxWidthDialog(props) {

    // 모달 여는 함수
    const handleClickOpen = () => {
      props.setDietModalOpen(true);
    };
  
    // 모달 닫는 함수
    const handleClose = () => {
      props.setDietModalOpen(false);
      };
      
    const [fullWidth, setFullWidth] = useState(true);

      
      return (
  
         <Dialog
              fullWidth={fullWidth}
              maxWidth="sm"
              open={props.dietModalOpen}
              onClose={handleClose}
              id="mealModal"
        >
                ㅎㅇ
        </Dialog>
    );
  }