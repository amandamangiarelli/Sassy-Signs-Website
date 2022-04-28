import React, { useRef, useState } from "react"
import { useAuth } from "../AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div class="container">
        <div class="content-flow5">
          <h2>Log In</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
          <div id="login-email">
            <label id="email">
              <label>Email </label>
              <input type="email" ref={emailRef} required />
            </label>
          </div>
          <div id="login-password">
            <label id="password">
              <label>Password </label>
              <input type="password" ref={passwordRef} required />
            </label>
          </div>
          <div id="login-button">
            <button disabled={loading} type="submit">
              Log In
            </button>
          </div>
          </form>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div id="page-break">
          </div>
        </div>
    </div>
  )
}
