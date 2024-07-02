import { Button } from 'antd'
import { FaEdit } from 'react-icons/fa'
import { useManagerStores } from '../../hooks/useManagerStores'
import { IRoom } from '../../services/roomService'
import { useTranslation } from 'react-i18next'

interface Props {
  item: IRoom
}
const RoomUpdateButton = ({ item }: Props) => {
  const { t } = useTranslation('ns1')
  const { addRoomId } = useManagerStores()
  return (
    <Button onClick={() => addRoomId(item)} icon={<FaEdit />}>
      {t('action.edit')}
    </Button>
  )
}

export default RoomUpdateButton
