import { Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { VerifyOtp } from './pages/VerifyOtp'
import { ProtectedRoute } from './protectedRoutes'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      {/* protected Routes */}
       <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      </Route>
    </Routes>
  )
}

export default App
