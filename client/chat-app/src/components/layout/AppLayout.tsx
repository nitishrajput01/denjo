import { Outlet } from 'react-router'
import './AppLayout.css'

export function AppLayout() {
  return (
    <div className="app-shell">
      <div className="app-shell__panel">
        <Outlet />
      </div>
    </div>
  )
}
