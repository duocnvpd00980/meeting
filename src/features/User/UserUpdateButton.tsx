import { Button } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { useManagerStores } from '../../hooks/useManagerStores'
import { IUser } from '../../services/userService'
import { useTranslation } from 'react-i18next'

interface Props {
  item: IUser
}
const UserUpdateButton = ({ item }: Props) => {
  const { t } = useTranslation()
  const { addUserId } = useManagerStores()
  return (
    <Button onClick={() => addUserId(item)} icon={<FaEdit />}>
      {t('action.edit')}
    </Button>
  )
}

export default UserUpdateButton
