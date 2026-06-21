import { Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Register } from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
