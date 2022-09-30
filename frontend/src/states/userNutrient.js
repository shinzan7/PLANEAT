import { atom, selector } from 'recoil'
import { http } from 'api/http'

const userId = localStorage.getItem('userId')

export const userNutrient = selector({
  key:'nutrient',
  get: async({get}) => {
    // const userDATA = []
    const response = await http.get('/nutrient/user/list/9')
    return response.data
    // userDATA.append(response.data)
  }
})
