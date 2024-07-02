import Cookies from 'js-cookie'
import { meetingStores } from '../stores/meetingStores'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const user = () => meetingStores((state) => state.login)
const reserveRoom = () => meetingStores((state) => state.addReserveRoom)
const logout = () => meetingStores((state) => state.setLogout)

export const useAuth = () => {
  const [isAuthentication, setIsAuthentication] = useState<boolean>()
  const auth = user()
  const isAdmin = auth.userRole === 1
  const navigate = useNavigate()
  const addReserveRoom = reserveRoom()
  useEffect(() => {
    if (!auth.userID) {
      Cookies.remove('Authenticated')
      setIsAuthentication(false)
      navigate('/login')
    }
    addReserveRoom({ uId: auth.userID })
    setIsAuthentication(true)
  }, [auth, isAuthentication])

  return {
    isAuthentication,
    user: auth,
    logout,
    isAdmin,
  }
}
