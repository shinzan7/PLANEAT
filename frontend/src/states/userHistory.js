import { selector } from 'recoil';
import { http } from "api/http";

const today = new Date()
const year = today.getFullYear().toString()
const tmpMonth = today.getMonth() + 1
const month = tmpMonth + 1 < 10 ? "0" + tmpMonth : "" + tmpMonth
const tmpDay = today.getDate()
const day = tmpDay < 10 ? "0" + tmpDay : "" + tmpDay

// console.log(year, month, day)

export const myHistory = selector({
  key:'history',
  get: async({get}) => {
    // const response = await http.get(`/analysis/percent?date=${year}-${month}-${day}%userId=${userId}`)
    const response = await http.get('/analysis/percent?date=2022-09-26&userId=8')
    return response.data.data
  }
})
