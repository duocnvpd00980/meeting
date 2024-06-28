import { ReactNode } from 'react'
import { useUserAPIs } from '../../hooks/useUserAPIs'
import { useUserStores } from '../../hooks/useUserStores'

interface Props {
  children: ReactNode
}
const UserWatcher = ({ children }: Props) => {
  const { useFindMany } = useUserAPIs()
  const { addUser } = useUserStores()
  const { isLoading } = useFindMany((data) => {
    addUser(data)
  })
  if (isLoading) return 'Loading...'

  return children
}
export default UserWatcher
