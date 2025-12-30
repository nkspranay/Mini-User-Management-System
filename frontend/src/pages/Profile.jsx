import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function Profile() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // 🔐 Change password states
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  })
  const [passwordMessage, setPasswordMessage] = useState("")

  const navigate = useNavigate()

  const fetchProfile = () => {
    api.get("/api/users/profile/")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear()
        navigate("/")
      })
  }

  useEffect(() => {
    fetchProfile()
  }, [navigate])

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  // 🧾 Profile handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSave = async () => {
    try {
      await api.put("/api/users/profile/", {
        full_name: user.full_name,
        email: user.email
      })
      setMessage("Profile updated successfully")
      setIsEditing(false)
    } catch {
      setMessage("Failed to update profile")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setMessage("")
    fetchProfile()
  }

  // 🔐 Password handlers
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordMessage("")

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordMessage("New passwords do not match")
      return
    }

    try {
      await api.put("/api/users/change-password/", {
        old_password: passwordData.old_password,
        new_password: passwordData.new_password
      })

      setPasswordMessage("Password updated successfully")
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: ""
      })
      setShowPasswordForm(false)
    } catch {
      setPasswordMessage("Failed to update password")
    }
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="container">
      <h2>Profile</h2>

      {message && <p>{message}</p>}

      {/* 🧾 Profile Section */}
      <div className="profile-info">
        <label>
          <b>Email:</b>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </label>

        <label>
          <b>Name:</b>
          <input
            type="text"
            name="full_name"
            value={user.full_name}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </label>

        <p><b>Role:</b> {user.role}</p>
      </div>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>
      ) : (
        <>
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}

      {/* 🔐 Security Section */}
      <hr />
      <h3>Security</h3>

      {!showPasswordForm ? (
        <button onClick={() => setShowPasswordForm(true)}>
          Change Password
        </button>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <label>Current Password</label>
          <input
            type="password"
            name="old_password"
            value={passwordData.old_password}
            onChange={handlePasswordChange}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            name="new_password"
            value={passwordData.new_password}
            onChange={handlePasswordChange}
            required
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            value={passwordData.confirm_password}
            onChange={handlePasswordChange}
            required
          />

          <button type="submit">Update Password</button>
          <button
            type="button"
            onClick={() => setShowPasswordForm(false)}
          >
            Cancel
          </button>

          {passwordMessage && <p>{passwordMessage}</p>}
        </form>
      )}

      {/* 🛠 Admin shortcut */}
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
