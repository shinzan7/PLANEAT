/*
내 음식 추가 모달
@author 여예원
@since 2022.09.28
*/

import { useState } from "react";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import BtnGray from "components/common/BtnGray";
import BtnMain from "components/common/BtnMain";

export default function FoodModal(props) {
    
    const data = {
        foodUser: 10, // 유저 아이디
        name: "", // 음식이름
        calorie: 0, // 1인분당 칼로리
        carbohydrate: 0, //탄수화물
        fat: 0, // 지방
        protein: 0, // 단백질
        cholesterol: 0, //콜레스테롤
        sodium: 0, // 나트륨
        potassium: 0, //칼륨
        dietary_fiber: 0, // 총 식이섬유
        sugar: 0, // 총 당류
        vitaminA: 0, 
        vitaminC: 0,
        calcium: 0, // 칼슘
        iron: 0, //철
    }

    const [fullWidth, setFullWidth] = useState(true);
    const [foodInfo, setFoodInfo] = useState(data);
    const [showMore, setShowMore] = useState(false);

    // 내 음식에 추가
    function registMyFood() { 
        console.log("regist");
        setFoodInfo(data);
        // todo: axios로 data 보내서 식단 추가하기
    }

    // 식사에 추가
    function addMeal() { 
        console.log("add");
    }
    return (
  
        <Dialog
            style={{ zIndex: 1800 }}
            keepMounted
            fullWidth={fullWidth}
            maxWidth="xs"
            open={props.open}
            onClose={props.close}
        >
          <Grid container direction="row" style={{padding: "2vw", fontSize: "16px"}} alignItems="center">
                <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="center">
                    <Grid items xs={7} style={{ padding: "2vw", fontSize: "20px", fontWeight: "bold" }}>
                      내 음식 추가
                    </Grid>
                    <Grid items xs={5}>
                    <BtnMain width="90%" onClick={() => { registMyFood() }}>
                      새 음식 등록
                    </BtnMain>
                    </Grid>
                </Grid>
                { /* 음식이름 */}
                <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="center">
                    <Grid items xs={11}>
                        <TextField fullWidth size="small" placeholder="음식이름을 입력하세요" variant="standard"
                            onChange={(e) => {
                            data.name = e.target.value;
                        }} />
                    </Grid>
                </Grid>
                { /* 1인분당 칼로리 */}
                <Grid container xs={12} style={{marginBottom: "2vw"}} alignItems="center" justifyContent="space-between">
                    <Grid items xs={4} style={{textAlign: "center"}}>
                        1인분당 칼로리
                    </Grid>
                    <Grid items xs={5}>
                        <TextField style={{ width: "70%" }} size="small" variant="standard"
                            onChange={(e) => {
                            data.calorie = e.target.value;
                        }}/> kcal
                    </Grid>
                </Grid>
                { /* 탄수화물 */}
                <Grid container xs={12} style={{marginBottom: "2vw"}} alignItems="center" justifyContent="space-between">
                    <Grid items xs={4} style={{textAlign: "center"}}>
                        탄수화물
                    </Grid>
                    <Grid items xs={5}>
                        <TextField style={{ width: "70%" }} size="small" variant="standard"
                            onChange={(e) => {
                                data.carbohydrate = e.target.value;
                            }}/> g
                    </Grid>
                </Grid>
                { /* 지방*/}
                <Grid container xs={12} style={{marginBottom: "2vw"}} alignItems="center" justifyContent="space-between">
                    <Grid items xs={4} style={{textAlign: "center"}}>
                        지방
                    </Grid>
                    <Grid items xs={5}>
                        <TextField style={{ width: "70%" }} size="small" variant="standard"
                            onChange={(e) => {
                                data.fat = e.target.value;
                            }}
                        /> g
                    </Grid>
                </Grid>
                { /* 단백질 */}
                <Grid container xs={12} style={{marginBottom: "2vw"}} alignItems="center" justifyContent="space-between">
                    <Grid items xs={4} style={{textAlign: "center"}}>
                        단백질
                    </Grid>
                    <Grid items xs={5}>
                        <TextField style={{ width: "70%" }} size="small" variant="standard"
                        onChange={(e) => {
                            data.protein = e.target.value;
                        }}/> g
                    </Grid>
                </Grid>
                { /* 콜레스테롤 */}
                <Grid container xs={12} style={{marginBottom: "2vw"}} alignItems="center" justifyContent="space-between">
                    <Grid items xs={4} style={{textAlign: "center"}}>
                    콜레스테롤
                    </Grid>
                    <Grid items xs={5}>
                        <TextField style={{ width: "70%" }} size="small" variant="standard"
                        onChange={(e) => {
                            data.cholesterol = e.target.value;
                        }}
                        /> mg
                    </Grid>
                </Grid>
                { /* 나트륨 */}
                <Grid container xs={12} style={{marginBottom: "2vw"}} alignItems="center" justifyContent="space-between">
                    <Grid items xs={4} style={{textAlign: "center"}}>
                        나트륨
                    </Grid>
                    <Grid items xs={5}>
                        <TextField style={{ width: "70%" }} size="small" variant="standard"
                        onChange={(e) => {
                            data.sodium = e.target.value;
                        }}
                        /> mg
                    </Grid>
                </Grid>
                { /* 추가 정보 */}
                {
                    showMore == true ?
                    
                        (<>
                            {/*칼륨*/}
                            <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    칼륨
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.potassium = e.target.value;
                                        }}
                                    /> mg
                                </Grid>
                            </Grid>
                            {/* 총식이섬유 */}
                            <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    총 식이섬유
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.dietary_fiber = e.target.value;
                                        }}
                                    /> g
                                </Grid>
                            </Grid>
                            {/* 총 당류 */}
                            <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    총 당류
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.sugar = e.target.value;
                                        }}
                                    /> g
                                </Grid>
                            </Grid>
                            {/* 비타민A */}
                            <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    비타민A
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.vitaminA = e.target.value;
                                        }}
                                    /> μg
                                </Grid>
                            </Grid>
                            {/* 비타민C */}
                            <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    비타민C
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.vitaminC = e.target.value;
                                        }}
                                    /> mg
                                </Grid>
                            </Grid>
                            {/* 칼슘 */}
                            <Grid container xs={12} style={{ marginBottom: "2vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    칼슘
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.calcium = e.target.value;
                                        }}
                                    /> mg
                                </Grid>
                            </Grid>
                            {/* 철 */}
                            <Grid container xs={12} style={{ marginBottom: "3vw" }} alignItems="center" justifyContent="space-between">
                                <Grid items xs={4} style={{ textAlign: "center" }}>
                                    철
                                </Grid>
                                <Grid items xs={5}>
                                    <TextField style={{ width: "70%" }} size="small" variant="standard"
                                        onChange={(e) => {
                                            data.iron = e.target.value;
                                        }}
                                    /> mg
                                </Grid>
                            </Grid>
                            {/* 새 음식 등록 버튼 */}
                            <Grid container direction="row" justifyContent="space-evenly" style={{ marginTop: "2vw" }}>
                                <Grid items xs={4}>
                                    <BtnMain width="90%" onClick={() => { registMyFood() }}>
                                        새 음식 등록
                                    </BtnMain>
                                </Grid>
                            </Grid>
                        </>
                        ) :
                        (  
                            <Grid container xs={12} style={{ marginTop: "2vw" }} alignItems="center" justifyContent="center">
                                <Grid items xs={5}>
                                    <BtnMain width="90%" onClick={() => { setShowMore(true) }}>
                                        영양 정보 추가하기
                                    </BtnMain>
                                </Grid>
                            </Grid>   
                        )
                }                
          </Grid>
          </Dialog>
    );
}