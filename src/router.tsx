import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ROUTER } from './constants'
import Booked from './features/Booking/Booked'
import Reserves from './features/Booking/Reserve'
import Login from './features/Login'
import Room from './features/Room'
import User from './features/User'
import PrivateRoute from './features/Login/PrivateRoute'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: ROUTER.RESERVE, element: <Reserves /> },
      { path: ROUTER.BOOKED, element: <Booked /> },
      { path: ROUTER.ROOM, element: <PrivateRoute element={<Room />} /> },
      { path: ROUTER.USER, element: <PrivateRoute element={<User />} /> },
    ],
  },
  { path: ROUTER.LOGIN, element: <Login /> },
])
