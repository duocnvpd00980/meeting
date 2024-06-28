import { Breadcrumb, Layout, Space, Typography } from 'antd'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import RoomCreateModal from './RoomCreateModal'
import RoomList from './RoomList'
import RoomWatcher from './RoomWatcher'
import RoomUpdateModal from './RoomUpdateModal'
const { Content } = Layout
const { Title } = Typography

const Room: React.FC = () => {
  return (
    <Content
      style={{
        padding: 24,
        minHeight: '100vh',
      }}
    >
      <Toolbar>
        <Title level={2} style={{ margin: 0 }}>
          List room
        </Title>
        <Space>
          <RoomCreateModal />
        </Space>
      </Toolbar>

      <Breadcrumb
        style={{ margin: '24px 16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'List room',
          },
        ]}
      />
      <RoomWatcher>
        <RoomUpdateModal />
        <RoomList />
      </RoomWatcher>
    </Content>
  )
}

export default Room
