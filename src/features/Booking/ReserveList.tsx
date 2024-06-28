import { Button, List } from 'antd'
import React from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { TbEye } from 'react-icons/tb'
import { useManagerStores } from '../../hooks/useManagerStores'
import { useRoomStores } from '../../hooks/useRoomStores'
import ReserveListWatcher from './ReserveListWatcher'

const ReserveList: React.FC = () => {
  const { room } = useRoomStores()
  const { addCalendarId, calendarId, addReserveRoom } = useManagerStores()
  const dataSource = room()
  const handleBooking = (id: string) => {
    addCalendarId(id)
    addReserveRoom({ rId: id, bDate: '' })
  }
  return (
    <ReserveListWatcher>
      <List
        header={<h3>List room</h3>}
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
                  Select room
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
