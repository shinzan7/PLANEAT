/*
로그인 페이지
@author 전상현
@since 2022.09.25
*/


import React, { useEffect } from "react";


function Logincheck() {
  let accessToken,
    refreshToken,
    accessTokenExpiration,
    refreshTokenExpiration,
    userId,
    name,
    birthYear,
    gender

  useEffect(() => {
    // Redirect된 url 주소에서 parameter 세팅
    accessToken = new URL(window.location.href).searchParams.get("accessToken")
    refreshToken = new URL(window.location.href).searchParams.get(
      "refreshToken"
    )
    accessTokenExpiration = new URL(window.location.href).searchParams.get(
      "accessTokenExpiration"
    )
    refreshTokenExpiration = new URL(window.location.href).searchParams.get(
      "refreshTokenExpiration"
    )
    userId = new URL(window.location.href).searchParams.get("userId")
    name = new URL(window.location.href).searchParams.get("name")
    birthYear = new URL(window.location.href).searchParams.get("birthYear")
    gender = new URL(window.location.href).searchParams.get("gender")
  

    if (accessToken && birthYear == "" && gender == "") {
      // 이름과 이메일만 기본으로 들고오므로 신규 유저는 welcome으로
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("userId", Number(userId))
      localStorage.setItem("name", name)
      localStorage.setItem("birthYear", birthYear)
      localStorage.setItem("gender", gender)

      // console.log(name, accessToken, refreshToken)
      window.location.replace("/welcome")
      
    }

    if (accessToken && birthYear!="" && gender!="") {
      // 나이와 성별이 있으면 기존 유저이므로 main으로
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("userId", Number(userId))
      localStorage.setItem("name", name)
      localStorage.setItem("birthYear", birthYear)
      localStorage.setItem("gender", gender)
      // setNewUser(true)
      window.location.replace("/analysis")
    }
  }, [])

  return (
    <div></div>
  )
}

export default Logincheck;