/*
영양제 검색 페이지 > 영양제 상세정보
@author 전상현
@since 2022.09.22
*/

import React from "react";
import CardNutrient from "components/common/CardNutrient";

function SearchDetail() {
  const data = {
    img: "",
    nutrient_name: "락토핏 생유산균 화이버",
    company: "종근당",
    category_tag: ["장건강"],
    ingredient_name: ["차전자피식이섬유"],
  }

  return (
      <div>
        SearchDetail
        <CardNutrient pill={data}/>
      </div>
  );
}

export default SearchDetail;