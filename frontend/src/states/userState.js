/*
recoil userState
필요한 정보 이 곳에 저장한 후
필요한 곳에 useRecoilValue로 꺼내쓰거나, useRecoilState로 조작
@author 전상현
@since 2022.09.28
*/

import { atom } from 'recoil';
import { http } from 'api/http'

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
  userId, name, birthYear, gender],
  
}) 
