import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/register.jsx'
import LoginPage from './pages/login.jsx'
import DashboardPage from './pages/dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
