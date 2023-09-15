import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'

import App from './App.tsx'
import ErrorPage from './error-page.tsx'
import './index.css'
import Topology from './Topology.tsx'


const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />, 
    errorElement: <ErrorPage />
  }, 
  {
    path: '/topology', 
    element: <Topology />, 
  }, 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
