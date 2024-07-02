import { Breadcrumb, Button, Layout, Space, Typography } from 'antd'
import React from 'react'
import Toolbar from '../../components/Toolbar'
import BookedList from './BookedList'
import BookedWatcher from './BookedWatcher'
import { Link } from 'react-router-dom'
import { FaCalendarDays } from 'react-icons/fa6'
import { FaListAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
const { Content } = Layout
const { Title } = Typography

const Booked: React.FC = () => {
  const { t } = useTranslation('ns1')
  return (
    <Content
      style={{
        padding: 24,
        minHeight: '100vh',
      }}
    >
      <Toolbar>
        <Title level={2} style={{ margin: 0 }}>
          {t('booking.book-meeting-room')}
        </Title>
        <Space>
          <Link to="/booked">
            <Button icon={<FaListAlt />} disabled>
              {t('booking.booked-room')}
            </Button>
          </Link>
          <Link to="/reserves">
            <Button icon={<FaCalendarDays />}>
              {t('booking.book-meeting-room')}
            </Button>
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
