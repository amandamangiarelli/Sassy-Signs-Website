import React, { useState } from "react"
import { useAuth } from "../../AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function AdminHome() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div class="container">
      <div class="content-flow7">
        <h1>Admin Menu</h1>
        <p>Welcome! This is the admin home screen. Select a page for changes or logout below.</p>
          <div class="logoutbtn">
            <button variant="link" onClick={handleLogout}>
              Log Out
            </button>
            <div id="page-break2">
            </div>
          </div>
      </div>
    </div>
  )
}
