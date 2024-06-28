import { Breadcrumb, Layout, Space, Typography } from 'antd'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import UserCreateModal from './UserCreateModal'
import UserList from './UserList'
import UserUpdateModal from './UserUpdateModal'
import UserWatcher from './UserWatcher'
const { Content } = Layout
const { Title } = Typography

const User: React.FC = () => {
  return (
    <Content
      style={{
        padding: 24,
        minHeight: '100vh',
      }}
    >
      <Toolbar>
        <Title level={2} style={{ margin: 0 }}>
          List user
        </Title>
        <Space>
          <UserCreateModal />
        </Space>
      </Toolbar>

      <Breadcrumb
        style={{ margin: '24px 16px' }}
        items={[
          {
            title: 'Home',
          },
          {
            title: 'List user',
          },
        ]}
      />
      <UserWatcher>
        <UserUpdateModal />
        <UserList />
      </UserWatcher>
    </Content>
  )
}

export default User
