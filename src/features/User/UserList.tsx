import { Table, type TableProps } from 'antd'
import { useUserStores } from '../../hooks/useUserStores'
import { IUser } from '../../services/userService'
import UserUpdateButton from './UserUpdateButton'

const columns: TableProps<IUser>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Email',
    dataIndex: 'userEmail',
    key: 'userEmail',
  },
  {
    title: 'Team',
    dataIndex: 'userDep',
    key: 'userDep',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 180,
    key: 'action',
    render: (_, item: IUser) => <UserUpdateButton item={item} />,
  },
]

const UserList = () => {
  const { user } = useUserStores()
  return <Table columns={columns} dataSource={user()} rowKey="userID" />
}

export default UserList
