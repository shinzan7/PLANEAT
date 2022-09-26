import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Main from "pages/main/Main";

function Logincheck() {

  // const accessToken = location.state.accessToken
  // const accessToken = new URLSearchParams(location.accessToken)

  const [NewUser, User] = useState(false)
  let accessToken,
    refreshToken,
    accessTokenExpiration,
    refreshTokenExpiration,
    userId,
    name,
    birthYear,
    gender

  useEffect(() => {
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
      // 처음 소셜 로그인한 유저가 생년, 성별 동의를 하고 들어온다면?
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("userId", Number(userId))
      localStorage.setItem("name", name)
      localStorage.setItem("birthYear", birthYear)
      localStorage.setItem("gender", gender)

      console.log(name, accessToken, refreshToken)
      window.location.replace("/")
    }

    if (accessToken && birthYear && gender) {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
      localStorage.setItem("userId", Number(userId))
      localStorage.setItem("name", name)
      localStorage.setItem("birthYear", birthYear)
      localStorage.setItem("gender", gender)
      User(true)
    }
  }, [])

  return (
    <div>
      {NewUser ? <Welcome /> : <Main />}
    </div>
  )
}

export default Logincheck;