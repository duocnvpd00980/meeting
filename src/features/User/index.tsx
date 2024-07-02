import { Breadcrumb, Layout, Space, Typography } from 'antd'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import UserCreateModal from './UserCreateModal'
import UserList from './UserList'
import UserUpdateModal from './UserUpdateModal'
import UserWatcher from './UserWatcher'
import { useTranslation } from 'react-i18next'
const { Content } = Layout
const { Title } = Typography

const User: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Content
      style={{
        padding: 24,
        minHeight: '100vh',
      }}
    >
      <Toolbar>
        <Title level={2} style={{ margin: 0 }}>
          {t('user.list-user')}
        </Title>
        <Space>
          <UserCreateModal />
        </Space>
      </Toolbar>
      <Breadcrumb
        style={{ margin: '24px 16px' }}
        items={[
          {
            title: t('home'),
          },
          {
            title: t('user.list-user'),
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
