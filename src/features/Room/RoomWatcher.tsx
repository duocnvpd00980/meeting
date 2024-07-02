import { ReactNode } from 'react'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { useRoomStores } from '../../hooks/useRoomStores'
import _ from 'lodash'

interface Props {
  children: ReactNode
}
const RoomWatcher = ({ children }: Props) => {
  const { useFindMany } = useRoomAPIs()
  const { addRoom } = useRoomStores()
  const { isLoading } = useFindMany((data) => {
    let sorted
    if (typeof data !== 'string')
      sorted = _.orderBy(data, ['created'], ['desc'])
    addRoom(sorted ?? [])
  })

  if (isLoading) return 'Loading...'
  return children
}
export default RoomWatcher
