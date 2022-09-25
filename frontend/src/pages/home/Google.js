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