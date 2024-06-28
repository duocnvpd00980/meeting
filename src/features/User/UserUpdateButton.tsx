import { Button } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { useManagerStores } from '../../hooks/useManagerStores'
import { IUser } from '../../services/userService'

interface Props {
  item: IUser
}
const UserUpdateButton = ({ item }: Props) => {
  const { addUserId } = useManagerStores()
  return (
    <Button onClick={() => addUserId(item)} icon={<FaEdit />}>
      Edit
    </Button>
  )
}

export default UserUpdateButton
