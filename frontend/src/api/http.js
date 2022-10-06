import axios from "axios";

// axios 객체 생성
// const http = axios.create({
//     baseURL: "https://j7a701.p.ssafy.io/api/",
//     headers: {
//         "Content-type": "application/json"
//     },
// });

// export { http };

function Instance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  })
  // request insterceptor 요청 전 헤더에 토큰 등록
  instance.interceptors.request.use(
    (config) => {
      console.log("request config 나왔슈")
      config.headers["accessToken"] = localStorage.getItem("accessToken")
      config.headers["refreshToken"] = localStorage.getItem("refreshToken")
      return config
    },
    (error) => {
      console.log("request config 에러났슈")
      return Promise.reject(error)
    }
  )
  // response interceptor 요청 응답 받은 후 데이터 가공
  instance.interceptors.response.use(
    (response) => {
      console.log("response 리턴 나왔슈")
      return response
    },
    async (error) => {
      console.log("request 에러 났슈")
      const {
        config,
        response: { status },
      } = error
      const originalRequest = config
      if (status === 401 && !originalRequest._retry) {
        console.log("request 에서 토큰 요청 할거유")
        // token refresh 요청
        originalRequest._retry = true

        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/oauth/refresh`, // token refresh api
          {
            headers: {
              refreshToken: localStorage.getItem("refreshToken"),
            },
          }
        )
        console.log("토큰 요청 했슈")
        // 새로운 토큰 저장
        const {
          accessToken: newAccessToken,

          accessTokenExpiration,
        } = data

        localStorage.setItem("accessToken", newAccessToken)

        localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
        console.log("request 토큰 저장했슈")
        instance.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken")
        originalRequest.headers["accessToken"] = newAccessToken
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        console.log("이제 재요청 할거유")
        return axios(originalRequest)
      } else if (status === 403) {
        console.log("권한없슈")
        // console.log("권한 없음")
        window.location.replace("/")
      }
      console.log("request ㅇ여긴 어디냐?")
      return Promise.reject(error)
    }
  )
  return instance
}
export const http = Instance()