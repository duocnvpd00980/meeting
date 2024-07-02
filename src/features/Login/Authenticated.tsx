import { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface Props {
  children: ReactNode
}

const Authenticated = ({ children }: Props) => {
  const { isAuthentication } = useAuth()
  return isAuthentication && children
}

export default Authenticated
