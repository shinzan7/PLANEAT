import { atom } from 'recoil'

export const userRecIntake = atom({
  key: 'recIntake',
  default: {
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    // 영양소별 권장 섭취량도 
  }
})
