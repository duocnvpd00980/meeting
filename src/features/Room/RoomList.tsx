import { Table, type TableProps } from 'antd'
import { useRoomStores } from '../../hooks/useRoomStores'
import { IRoom } from '../../services/roomService'
import RoomUpdateButton from './RoomUpdateButton'

const columns: TableProps<IRoom>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'roomName',
    key: 'roomName',
  },
  {
    title: 'Seat',
    dataIndex: 'roomSeat',
    key: 'roomSeat',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 180,
    key: 'action',
    render: (_, item: IRoom) => <RoomUpdateButton item={item} />,
  },
]

const RoomList = () => {
  const { room } = useRoomStores()
  return <Table columns={columns} dataSource={room()} rowKey="roomID" />
}

export default RoomList
