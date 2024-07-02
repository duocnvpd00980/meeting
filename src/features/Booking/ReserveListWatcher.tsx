import { ReactNode } from 'react'
import { useRoomAPIs } from '../../hooks/useRoomAPIs'
import { useRoomStores } from '../../hooks/useRoomStores'
import _ from 'lodash'

interface Props {
  children: ReactNode
}
const ReserveListWatcher = ({ children }: Props) => {
  const { useFindMany } = useRoomAPIs()
  const { addRoom } = useRoomStores()
  const { isLoading } = useFindMany((data) => {
    let sorted
    if (typeof data !== 'string')
      sorted = _.orderBy(data, ['created'], ['desc'])
    addRoom(sorted ?? [])
  })
  return !isLoading && children
}

export default ReserveListWatcher
