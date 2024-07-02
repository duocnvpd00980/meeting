import { ReactNode } from 'react'
import { useUserAPIs } from '../../hooks/useUserAPIs'
import { useUserStores } from '../../hooks/useUserStores'
import _ from 'lodash'

interface Props {
  children: ReactNode
}
const UserWatcher = ({ children }: Props) => {
  const { useFindMany } = useUserAPIs()
  const { addUser } = useUserStores()
  const { isLoading } = useFindMany((data) => {
    let sorted
    if (typeof data !== 'string')
      sorted = _.orderBy(data, ['created'], ['desc'])
    addUser(sorted ?? [])
  })
  if (isLoading) return 'Loading...'

  return children
}
export default UserWatcher
