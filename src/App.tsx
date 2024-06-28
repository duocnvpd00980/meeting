import {
  Avatar,
  Flex,
  Layout,
  Menu,
  Popconfirm,
  PopconfirmProps,
  Typography,
  message,
} from 'antd'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaCalendarPlus, FaUser } from 'react-icons/fa'
import { MdMeetingRoom } from 'react-icons/md'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AppStyle from './components/AppStyle'
import useLogin from './hooks/useLogin'
import Reserves from './features/Booking/Reserve'
const { Sider } = Layout
const { Title } = Typography

const App = () => {
  const { useAuth } = useLogin()
  const { isAuthenticated, user, navigate } = useAuth()
  const location = useLocation()
  if (isAuthenticated) {
    navigate()
  }

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    message.success('Click on Yes')
  }
  return (
    <AppStyle>
      <Sider trigger={null} collapsible>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Flex
            align="center"
            style={{ padding: '28px 12px', cursor: 'pointer' }}
          >
            <Avatar
              shape="square"
              size="small"
              icon={<AiOutlineLogout />}
              style={{ backgroundColor: 'red', verticalAlign: 'middle' }}
            >
              {user.userName}
            </Avatar>
            <Title
              level={5}
              color="white"
              style={{ color: 'red', margin: '0 0 0 10px' }}
            >
              Book Room
            </Title>
          </Flex>
        </Popconfirm>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FaCalendarPlus />,
              label: <Link to="reserves">Book meeting room</Link>,
            },
            {
              key: '4',
              icon: <MdMeetingRoom />,
              label: <Link to="room">Room List</Link>,
            },
            {
              key: '6',
              icon: <FaUser />,
              label: <Link to="user">User List</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        {location.pathname === '/' && <Reserves />}
        <Outlet />
      </Layout>
    </AppStyle>
  )
}

export default App
