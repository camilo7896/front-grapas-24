import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from'react-router-dom'
import HomePage from './pages/HomePage'
import PicadoPage from './pages/PicadoPage'
import UserContext from './context/UserContext'
import Admin from './pages/AdminPage'
import TableUser from './components/TableUser'
import AsignationPage from './pages/AsignationPage'
import EficencePage from './pages/EficencePage'
import Login from './components/Login'

const route = createBrowserRouter(
  [
    {path: '/',
      element: <HomePage/>,
      errorElement: <h1>Error</h1>
    },
    {path: '/login',
      element: <Login/>,
      errorElement: <h1>Error</h1>
    },
    {
      path: '/picado',
      element: <PicadoPage/>
    },
    {
      path: '/empaque',
      element: <h1>Empaque</h1>
    },
    {
      path: '/puas',
      element: <h1>Puas</h1>
    },
    {
      path: '/admin',
      element: <Admin/>
    },
    {
      path: '/userlist',
      element: <TableUser/>
    },
    {
      path: '/asignation',
      element: <AsignationPage/>
    },
    {
      path: '/eficences',
      element: <EficencePage/>
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
<UserContext>
  <RouterProvider router={route}/>
</UserContext>

)
