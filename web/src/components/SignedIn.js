import React, { useState, useEffect } from "react"
import { session } from "../util/api"

const SignedIn = ({ mbClient, children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const signIn = () => {
    mbClient.requestAuthorization("auth.user_identity:read", window.location.origin.toString())
  }

  useEffect(() => {
    (async () => {
      const currentUser = JSON.parse(localStorage.getItem("user"))
      const currentSession = JSON.parse(localStorage.getItem("user"))
      
      if (currentUser && currentSession) {
        setLoggedIn(true)
      }

      if (!(await mbClient.isLoggedIn())) {
        try {
          await mbClient.handleAuthorizationResponse()
        } catch  (error) {
          console.log('login error')
        }
      }
      const user = await mbClient.getIdentity()

      if (!currentUser || (user && user.id !== currentUser.id) || !loggedIn) {
        await session(user.id)

        localStorage.setItem("user", JSON.stringify(user))
        setLoggedIn(true)
      }
    })()
  })

  if (!loggedIn) {
    return (
      <div className="d-flex text-center flex-column">
        <p>Welcome to the paywall example app, sign in to continue</p>
        <div>
          <button className="btn btn-primary btn-lg mt-5" onClick={signIn}>
            Sign In with Money Button
          </button>
        </div>
      </div>
    )
  } else {
    return children
  }
}

export default SignedIn
