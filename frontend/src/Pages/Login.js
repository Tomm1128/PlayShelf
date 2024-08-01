import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { loginUser } from "../services/fetchers"

function Login() {
  const { setUser } = useUser()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    loginUser(username, password).then((data) => {
      if (data.success) {
        setUser(data.user)
        localStorage.setItem("userId", JSON.stringify(data.user))
        navigate("/board_games")
      } else {
        alert(data.message)
      }
    })
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("userId")
    const user = savedUser ? JSON.parse(savedUser) : null
    if (user) {
      setUser(user)
      navigate("/board_games")
    }
  }, [])

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4 col-lg-3">
          <h1 className="text-center mb-4">PlayShelf</h1>
          <div className="login-form bg-light p-4 rounded">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <Link to="/create_user">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
