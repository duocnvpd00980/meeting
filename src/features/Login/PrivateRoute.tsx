import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ReactElement } from 'react'

interface Props {
  element: ReactElement
}
const PrivateRoute = ({ element }: Props) => {
  const { isAdmin } = useAuth()
  return isAdmin ? element : <Navigate to="/" />
}

export default PrivateRoute
