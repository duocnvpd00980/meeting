import { Breadcrumb, Button, Layout, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Box from '../../components/Box'
import Panel from '../../components/Panel'
import Toolbar from '../../components/Toolbar'
import ReserveCalendar from './ReserveCalendar'
import ReserveList from './ReserveList'
import ReserveRangePicker from './ReserveRangePicker'
import ReserveRoomCreate from './ReserveRoomCreate'
import ReserveWatcher from './ReserveWatcher'
import { FaCalendarDays } from 'react-icons/fa6'
import { FaListAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
const { Content } = Layout
const { Title } = Typography

const Reserves: React.FC = () => {
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
            <Button icon={<FaListAlt />}>{t('booking.booked-room')}</Button>
          </Link>
          <Link to="/reserves">
            <Button icon={<FaCalendarDays />} disabled>
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
