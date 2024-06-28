import { Breadcrumb, Button, Layout, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Box from '../../components/Box'
import Panel from '../../components/Panel'
import Toolbar from '../../components/Toolbar'
import RoomCreateModal from '../Room/RoomCreateModal'
import ReserveCalendar from './ReserveCalendar'
import ReserveList from './ReserveList'
import ReserveRangePicker from './ReserveRangePicker'
import ReserveRoomCreate from './ReserveRoomCreate'
import ReserveWatcher from './ReserveWatcher'
const { Content } = Layout
const { Title } = Typography

const Reserves: React.FC = () => {
  return (
    <Content
      style={{
        padding: 24,
        minHeight: '100vh',
      }}
    >
      <Toolbar>
        <Title level={2} style={{ margin: 0 }}>
          Book meeting room
        </Title>
        <Space>
          <Link to="/booked">
            <Button>Booked room</Button>
          </Link>
          <Link to="/reserve">
            <Button disabled>Book meeting room</Button>
          </Link>
        </Space>
      </Toolbar>

      <Breadcrumb
        style={{ margin: '24px 16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'List booked',
          },
        ]}
      />

      <Panel horizontal>
        <ReserveWatcher>
          <Space direction="vertical" size="middle">
            <ReserveList />
            <Box width={400}>
              <ReserveRangePicker />
              <ReserveRoomCreate />
            </Box>
          </Space>
          <ReserveCalendar />
        </ReserveWatcher>
      </Panel>
    </Content>
  )
}

export default Reserves
