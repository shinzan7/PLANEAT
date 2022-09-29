import { atom, selector } from 'recoil'
import { http } from 'api/http'

const userId = localStorage.getItem('userId')

export const userNutrient = selector({
  key:'nutrient',
  get: async({get}) => {
    const response = await http.get(`/nutrient/user/list/${userId}`)
    return response.data
  }
})
