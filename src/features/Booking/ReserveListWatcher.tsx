import { ReactNode } from 'react'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { useRoomStores } from '../../hooks/useRoomStores'

interface Props {
  children: ReactNode
}
const ReserveListWatcher = ({ children }: Props) => {
  const { useFindMany } = useRoomAPIs()
  const { addRoom } = useRoomStores()
  const { isLoading } = useFindMany((data) => {
    addRoom(data)
  })
  return !isLoading && children
}

export default ReserveListWatcher
