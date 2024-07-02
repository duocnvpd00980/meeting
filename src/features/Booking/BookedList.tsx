import { Table, TableProps } from 'antd'
import useBookingStores from '../../hooks/useBookingStores'
import { IBooking } from '../../services/bookingService'
import moment from 'moment'
import BookedDelete from './BookedDelete'

const columns: TableProps<IBooking>['columns'] = [
  {
    title: 'Room',
    dataIndex: 'roomName',
    key: 'roomName',
  },
  {
    title: 'Date',
    dataIndex: 'created',
    key: 'created',
    render: (_, item: IBooking) => {
      const date = moment(item.bookedDate)
      return date.format('YYYY-MM-DD')
    },
  },
  {
    title: 'Time Start',
    dataIndex: 'bookedTimeStart',
    key: 'bookedTimeStart',
    render: (_, item: IBooking) => {
      const date = moment(item.bookedTimeStart, 'HH:mm:ss')
      return date.format('HH:mm')
    },
  },
  {
    title: 'Time End',
    dataIndex: 'bookedTimeEnd',
    key: 'bookedTimeEnd',
    render: (_, item: IBooking) => {
      const date = moment(item.bookedTimeEnd, 'HH:mm:ss')
      return date.format('HH:mm')
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 180,
    key: 'action',
    render: (_, item: IBooking) => <BookedDelete bookedID={item.bookedID} />,
  },
]

const BookedList = () => {
  const { booking } = useBookingStores()
  let dataSource = booking()
  if (typeof dataSource === 'string') dataSource = []
  return <Table columns={columns} dataSource={dataSource} rowKey="bookedID" />
}

export default BookedList
