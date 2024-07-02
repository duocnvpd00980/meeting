import { Button, List } from 'antd'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { TbEye } from 'react-icons/tb'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useRoomStores } from '../../hooks/useRoomStores'
import ReserveListWatcher from './ReserveListWatcher'
import { useTranslation } from 'react-i18next'

const ReserveList: React.FC = () => {
  const { t } = useTranslation()
  const { room } = useRoomStores()
  const { addCalendarId, calendarId, addReserveRoom } = useManagerStores()
  const dataSource = room()
  const handleBooking = (id: string) => {
    addCalendarId(id)
    addReserveRoom({ rId: id, bDate: undefined })
  }
  return (
    <ReserveListWatcher>
      <List
        header={<h3>{t('room.list-room')}</h3>}
        style={{ height: 360, overflowY: 'scroll' }}
        bordered
        dataSource={dataSource}
        renderItem={(item) => {
          const isActive = calendarId() === item.roomID
          const style = !isActive
            ? {}
            : {
                border: '1px solid #b7eb8f',
                background: '#f6ffed',
              }
          return (
            <List.Item key={item.roomID} style={style}>
              <List.Item.Meta
                title={item.roomName}
                description={item.roomSeat}
              />
              {!isActive ? (
                <Button
                  shape="round"
                  icon={<TbEye style={{ fontSize: 20 }} />}
                  onClick={() => handleBooking(item.roomID)}
                >
                  {t('room.select-room')}
                </Button>
              ) : (
                <IoCheckmarkCircle style={{ fontSize: 30, color: '#52C41A' }} />
              )}
            </List.Item>
          )
        }}
      />
    </ReserveListWatcher>
  )
}

export default ReserveList
