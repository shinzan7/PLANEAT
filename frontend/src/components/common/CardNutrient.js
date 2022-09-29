/*
영양제 카드.
속성: pill(영양제 데이터)
@author 여예원
@since 2022.09.15
*/
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ChipBlue from './ChipBlue';
import ChipOrange from './ChipOrange';
import Typography from '@mui/material/Typography';

const CardNutrient = function MediaCard(props) {
    console.log(props)
    let imgUrl = props.pill.imagePath; // props의 이미지 url

  return (
      <Card sx={{ width: {xs:'250px'}, height: 300, borderRadius: 5, margin: 1}}>
          <CardContent>
          <p style={{textAlign: "center", marginTop:20}}>
              <img
              sx={{width: {xs:'100px'}}}
              height="100"
              src={
                  imgUrl == "" ? "/assets/basic_nutrient.png" : imgUrl
              }
                      
              />
              </p>
            {/* 제조 회사 */}
            <Typography variant="caption">
                {props.pill.company} 
            </Typography>
            {/* 영양제 이름 */}
            <Typography sx={{ fontWeight: "bold"} } variant="body1">
                { props.pill.nutrientName} 
            </Typography>
          </CardContent>
          <CardActions sx={{ padding: 0, marginLeft: 2, marginBottom: 1 }} >
          {/* 영양제 기능 태그 */}
            {/* <ChipBlue label={ props.pill.nutriIngredientList[0].categoryTagList[0]}></ChipBlue>                     */}
          </CardActions>
          <CardActions sx={{padding: 0, marginLeft: 2} }>
           {/* 영양제 성분 태그 */}
          {/* <ChipOrange label={ props.pill.nutriIngredientList[0].ingredientName}></ChipOrange> */}
        </CardActions>
    </Card>
  );
}

export default CardNutrient;
