import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/api/users/profile/")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear()
        navigate("/")
      })
  }, [navigate])

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="container">
      <h2>Profile</h2>

      <div className="profile-info">
        <p><b>Email:</b> {user.email}</p>
        <p><b>Name:</b> {user.full_name}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>

      {user.role === "admin" && (
        <button onClick={() => navigate("/admin")}>
          Go to Admin Dashboard
        </button>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
