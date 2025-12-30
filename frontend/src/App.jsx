import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
