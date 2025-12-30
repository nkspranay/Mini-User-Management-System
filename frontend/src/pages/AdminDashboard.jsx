import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/api/admin/users/")
      .then((res) => setUsers(res.data))
      .catch(() => navigate("/profile"))
  }, [navigate])

  const updateStatus = async (id, isActive) => {
    await api.put(`/api/admin/users/${id}/status/`, {
      is_active: isActive,
    })

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, is_active: isActive } : u
      )
    )
  }

  return (
  <div className="container-lg">
    <h2>Admin Dashboard</h2>

    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.full_name}</td>
              <td>{u.role}</td>
              <td>{u.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  onClick={() => updateStatus(u.id, !u.is_active)}
                >
                  {u.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-20">
      <button onClick={() => navigate("/profile")}>
        Back to Profile
      </button>
    </div>
  </div>
)

}

export default AdminDashboard
