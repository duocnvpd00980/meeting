import { Button } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { useManagerStores } from '../../hooks/useManagerStores'
import { IRoom } from '../../services/roomService'

interface Props {
  item: IRoom
}
const RoomUpdateButton = ({ item }: Props) => {
  const { addRoomId } = useManagerStores()
  return (
    <Button onClick={() => addRoomId(item)} icon={<FaEdit />}>
      Edit
    </Button>
  )
}

export default RoomUpdateButton
