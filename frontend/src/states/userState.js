/*
recoil userState
유저 정보
필요한 곳에 useRecoilValue로 꺼내쓰거나, useRecoilState로 조작
@author 전상현
@since 2022.09.28
*/

import { atom, selector } from 'recoil';
import { http } from "api/http";

export const userState = atom({
  key: "user",
  default: {
    // accessToken: localStorage.getItem("accessToken"),
    // refreshToken: localStorage.getItem("refreshToken"),
    // accessTokenExpiration: localStorage.getItem("accessTokenExpiration"),
    // refreshTokenExpiration: localStorage.getItem("refreshTokenExpiration"),
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    // 로컬에서 확인해보고 싶을 때, 특정 id와 name 넣어보기

    // userId: "8",
    // name: "조혜아니아니",

    birthYear: localStorage.getItem("birthYear"),
    gender: localStorage.getItem("gender"),
    age: localStorage.getItem("age"),
    email: "",
    height: localStorage.getItem("height"),
    weight: localStorage.getItem("weight"),
    active: localStorage.getItem("active"),
    bmi: localStorage.getItem("bmi"),
    categories: localStorage.getItem("categories"),
  },
});

export const myTag = selector({
  key:'tag',
  get: async({get}) => {
    // const response = await http.get(`/user-infos/${userId}`)
    const response = await http.get('/user-infos/8')
    return response.data.data
  }
})

