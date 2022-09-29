import { atom, selector } from 'recoil'
import { http } from 'api/http'

export const nutrient = selector({
  key:'nutrient',
  get: async({get}) => {
    const response = await http.get('/nutrient?id=10')
    return response.data.data
  }
})
