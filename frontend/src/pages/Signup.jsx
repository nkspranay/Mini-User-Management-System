import { useState } from "react"
import api from "../api"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await api.post("/api/auth/signup/", {
        email,
        full_name: fullName,
        password,
      })

      navigate("/")
    } catch (err) {
      setError("Signup failed")
    }
  }

  return (
    <div className="container">
      <h2>Signup</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  )
}

export default Signup
