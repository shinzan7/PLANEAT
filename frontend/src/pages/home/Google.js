import React from "react";


function Google() {
  const GOOGLE_REDIRECT_URI=process.env.REACT_APP_GOOGLE_REDIRECT_URI
  const GOOGLE_REQUEST = `${GOOGLE_REDIRECT_URI}?redirect_uri=http://j7a701.p.ssafy.io/oauth/redirect`

  return (
    <a href={GOOGLE_REQUEST}>
      <button>Google</button>
    </a>
  )
}


export default Google;

// const [showMakeNickname, setMakeNickname] = useState(false)
//   let accessToken,
//     refreshToken,
//     accessTokenExpiration,
//     refreshTokenExpiration,
//     hasNickname,
//     collectedMemberId,
//     nickname
    
//   useEffect(() => {
//     accessToken = new URL(window.location.href).searchParams.get("accessToken")
//     refreshToken = new URL(window.location.href).searchParams.get(
//       "refreshToken"
//     )
//     accessTokenExpiration = new URL(window.location.href).searchParams.get(
//       "accessTokenExpiration"
//     )
//     refreshTokenExpiration = new URL(window.location.href).searchParams.get(
//       "refreshTokenExpiration"
//     )
//     hasNickname = new URL(window.location.href).searchParams.get("hasNickname")
//     collectedMemberId = new URL(window.location.href).searchParams.get(
//       "memberId"
//     )
//     nickname = new URL(window.location.href).searchParams.get("nickname")
//     // console.log(accessToken, "닉넴:", nickname)

//     if (!!accessToken && nickname !== "") {
//       // console.log("토큰 있고 닉넴 있음  ")
//       localStorage.setItem("accessToken", accessToken)
//       localStorage.setItem("refreshToken", refreshToken)
//       localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
//       localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
//       localStorage.setItem("memberId", Number(collectedMemberId))
//       localStorage.setItem("nickname", nickname)

//       console.log(nickname, accessToken, refreshToken)
//       window.location.replace("/")
//     }

//     if (accessToken && !nickname) {
//       // console.log(
//       //   "토큰 있고 닉넴 없음 , id=",
//       //   Number(collectedMemberId),
//       //   refreshTokenExpiration,
//       //   accessToken
//       // )
//       localStorage.setItem("accessToken", accessToken)
//       localStorage.setItem("refreshToken", refreshToken)
//       localStorage.setItem("accessTokenExpiration", accessTokenExpiration)
//       localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration)
//       localStorage.setItem("memberId", Number(collectedMemberId))
//       setMakeNickname(true)
//     }
//   }, [])

//  login.jsx {showMakeNickname ? <SetNickName /> : <NotLoggedInYet />}

{/* logincheck.jsx
  <div>
      {showMakeNickname ? (
        <div>
          <div>
            <SetNickName />
          </div>
        </div>
      ) : (
        <div>
          <Spinner
            aria-label="Default status example"
            className="w-full h-full"
          />
        </div> */}