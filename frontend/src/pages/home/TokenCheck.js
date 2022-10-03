import { http } from "api/http"

const today = new Date()
const year = today.getFullYear()
const tmpMonth = today.getMonth() + 1
const month = tmpMonth + 1 < 10 ? "0" + tmpMonth : "" + tmpMonth
const tmpDay = today.getDate()
const day = tmpDay < 10 ? "0" + tmpDay : "" + tmpDay
const hour = today.getHours()
const minute = today.getMinutes()
const seconds = today.getSeconds()
const todayYMD = `${year}-${month}-${day}`


export function AccessTokenExpireCheck() {
  const accessTokenExpiration = localStorage.getItem("accessTokenExpiration")
  const accessDateList = accessTokenExpiration.split("-")
  const accessYMD = `${accessDateList[0]}-${accessDateList[1]}-${accessDateList[2]}`
  if (todayYMD > accessYMD) {
    return true
  } else if (
    todayYMD === accessYMD &&
    hour * 60 * 60 + minute * 60 + seconds >
      Number(accessDateList[3]) * 60 * 60 +
        Number(accessDateList[4]) * 60 +
        Number(accessDateList[5])
  ) {
    return true
  } else {
    return false
  }
}

export function RefreshTokenExpireCheck() {
  const refreshTokenExpiration = localStorage.getItem("refreshTokenExpiration")
  const refreshDataList = refreshTokenExpiration.split("-")
  const refreshYMD = `${refreshDataList[0]}-${refreshDataList[1]}-${refreshDataList[2]}`
  if (todayYMD > refreshYMD) {
    return true
  } else if (
    todayYMD === refreshYMD &&
    hour * 60 * 60 + minute * 60 + seconds >
      Number(refreshDataList[3]) * 60 * 60 +
        Number(refreshDataList[4]) * 60 +
        Number(refreshDataList[5])
  ) {
    return true
  } else {
    return false
  }
}

// export function IsUser() {

//   const userId = localStorage.getItem('userId')
//   // userId 유무로 로그인 유무 체크
//   if (!userId) {
//     window.location.replace("/")
//   } else {
//     // access, refresh 둘 다 만료면 그냥 로그인 시키자
//     if (AccessTokenExpireCheck()) {
//       if (RefreshTokenExpireCheck()) {
//         window.location.replace("/")
//       }
//       // access만 만료면 refresh 보내서 access 재발급 
//       else {
//         http.get('oauth/refresh', 
//         {
//           headers: {
//             refreshToken: localStorage.getItem("refreshToken"),
//           },
//         })
//         .then((res) => {
//           console.log(res.data)
//           localStorage.setItem('accessToken', res.data.accessToken)

//         })
//       }
//     }
//   }
// }
