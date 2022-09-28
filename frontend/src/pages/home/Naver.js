import React from "react";


function Naver() {
  const NAVER_REDIRECT_URI=process.env.REACT_APP_NAVER_REDIRECT_URI
  const NAVER_REQUEST = `${NAVER_REDIRECT_URI}?redirect_uri=http://j7a701.p.ssafy.io/oauth/redirect`

  return (
    <a href={NAVER_REQUEST}>
      <button>
        <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="42" cy="42.1411" r="41.2258" fill="#1BE43B"/>
          <path d="M23.9636 25.8225V58.4596H36.5206V42.131L47.4476 58.4596H60.0247V25.8225H47.4476V42.131L36.5206 25.8225H23.9636Z" fill="white"/>
        </svg>
      </button>
    </a>
  )
}


export default Naver;