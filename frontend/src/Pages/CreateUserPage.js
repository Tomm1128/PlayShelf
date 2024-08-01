import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, loginUser } from "../services/fetchers"
import { useUser } from "../context/UserContext"

const initialValues = {
  username: "",
  password: "",
}

function CreateUserPage() {
  const { setUser } = useUser()
  const [formData, setFormData] = useState(initialValues)
  const navigate = useNavigate()

  const updateFormData = ({ target }) => {
    const newData = {
      ...formData,
      [target.name]: target.value,
    }

    setFormData(newData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createUser(formData).then((user) => {
      loginUser(user.username, user.password).then((data) => {
        if (data.success) {
          setUser(data.user)
          localStorage.setItem("userId", JSON.stringify(data.user))
          navigate("/board_games")
        } else {
          alert(data.message)
        }
      })
    })
  }

  return (
    <div className="row justify-content-center align-items-center min-vh-100">
      <div className="col-md-4 col-lg-3">
        <div className="login-form bg-light p-4 rounded">
          <h2 className="text-center mb-4">Create Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter a username"
                value={formData.username}
                onChange={updateFormData}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter a password"
                value={formData.password}
                onChange={updateFormData}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUserPage
