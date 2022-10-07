import { atom } from "recoil";

export const userRecIntake = atom({
  key: "recIntake",
  default: {
    kcal: localStorage.getItem("recoIntake"),
    carbohydrate: localStorage.getItem("carbo"),
    protein: localStorage.getItem("protein"),
    fat: localStorage.getItem("fat"),
    sugar: 50,
    // 영양소별 권장 섭취량도
  },
});
