import { ReactNode } from 'react'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { useRoomStores } from '../../hooks/useRoomStores'

interface Props {
  children: ReactNode
}
const RoomWatcher = ({ children }: Props) => {
  const { useFindMany } = useRoomAPIs()
  const { addRoom } = useRoomStores()
  const { isLoading } = useFindMany((data) => {
    addRoom(data)
  })

  if (isLoading) return 'Loading...'
  return children
}
export default RoomWatcher
