import './index.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from './pages/home'
import { NoMatch } from './pages/no-match'
import { Slug } from './pages/slug'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/:slug', element: <Slug /> },
  { path: '*', element: <NoMatch /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
