import { atom } from 'recoil';

  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const accessTokenExpiration = localStorage.getItem('accessTokenExpiration')
  const refreshTokenExpiration = localStorage.getItem('refreshTokenExpiration')
  const userId = localStorage.getItem('userId')
  const name = localStorage.getItem('name')
  const birthYear = localStorage.getItem('birthYear')
  const gender = localStorage.getItem('gender')

export const userState = atom({
  key: 'user',
  default: [ accessToken, refreshToken, accessTokenExpiration, refreshTokenExpiration, 
  userId, name, birthYear, gender ],
  
}) 
