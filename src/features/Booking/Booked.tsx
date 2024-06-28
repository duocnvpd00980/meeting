import { Breadcrumb, Button, Layout, Space, Typography } from 'antd'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import BookedList from './BookedList'
import BookedWatcher from './BookedWatcher'
import { Link } from 'react-router-dom'
const { Content } = Layout
const { Title } = Typography

const Booked: React.FC = () => {
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
            <Button disabled>Booked room</Button>
          </Link>
          <Link to="/reserve">
            <Button>Book meeting room</Button>
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
      <BookedWatcher>
        <BookedList />
      </BookedWatcher>
    </Content>
  )
}

export default Booked
