import { Avatar, Flex, Layout, Menu, Popconfirm, Typography } from 'antd'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaCalendarPlus, FaUser } from 'react-icons/fa'
import { MdMeetingRoom } from 'react-icons/md'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AppStyle from './components/AppStyle'
import Reserves from './features/Booking/Reserve'
import { useTranslation } from 'react-i18next'
import { useAuth } from './hooks/useAuth'
import Authenticated from './features/Login/Authenticated'
const { Sider } = Layout
const { Title } = Typography

const App = () => {
  const { t } = useTranslation('ns1')
  const { user, logout, isAdmin } = useAuth()
  const exit = logout()
  const { pathname } = useLocation()
  const menuSelected =
    pathname === '/' ? 'reserves' : pathname.slice(1).toLowerCase()

  const menu = [
    {
      key: 'reserves',
      icon: <FaCalendarPlus />,
      label: <Link to="reserves">{t('booking.book-meeting-room')}</Link>,
    },
    ...(() => {
      const room = {
        key: 'room',
        icon: <MdMeetingRoom />,
        label: <Link to="room">{t('room.list-room')}</Link>,
      }
      const user = {
        key: 'user',
        icon: <FaUser />,
        label: <Link to="user">{t('user.list-user')}</Link>,
      }
      return isAdmin ? [room, user] : []
    })(),
  ]
  return (
    <Authenticated>
      <AppStyle>
        <Sider trigger={null} collapsible>
          <Flex
            align="center"
            style={{ padding: '28px 12px', cursor: 'pointer' }}
          >
            <Popconfirm
              title={t('logout.title')}
              description={t('logout.description')}
              onConfirm={exit}
              okText={t('logout.yes')}
              cancelText={t('logout.no')}
            >
              <Avatar
                shape="square"
                size="small"
                icon={<AiOutlineLogout />}
                style={{ backgroundColor: 'red', verticalAlign: 'middle' }}
              >
                {user.userName}
              </Avatar>
            </Popconfirm>
            <Title
              level={5}
              color="white"
              style={{ color: 'red', margin: '0 0 0 10px' }}
            >
              {user.userName}
            </Title>
          </Flex>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[menuSelected]}
            items={menu}
          />
        </Sider>
        <Layout>
          {pathname === '/' && <Reserves />}
          <Outlet />
        </Layout>
      </AppStyle>
    </Authenticated>
  )
}

export default App
