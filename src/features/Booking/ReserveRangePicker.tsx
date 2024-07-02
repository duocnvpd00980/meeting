import { notification, Typography } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ReactNode, useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import { checkBookingHelpers } from '../../helpers/checkBookingHelpers'
import { useManagerStores } from '../../hooks/useManagerStores'
import RangePickerTime from '../../components/RangePickerTime'
import useBookingStores from '../../hooks/useBookingStores'
import {
  groupByDateBookingHelper,
  ICheckBooked,
} from '../../helpers/groupByDateBookingHelper'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { SERVICE } from '../../constants'

dayjs.extend(customParseFormat)

const { Title } = Typography
const ReserveRangePicker = () => {
  const { t } = useTranslation('ns1')
  const { addReserveRoom, reserveRoom } = useManagerStores()
  const { calendar } = useBookingStores()
  const [date, setDate] = useState<any>([])
  const [error, setError] = useState<boolean | null>(null)
  const [api, contextHolder] = notification.useNotification()
  const queryClient = useQueryClient()
  const reserve = reserveRoom()
  const bookersList = calendar()

  const openNotification = (iconReact: ReactNode, description: string) => {
    api.open({
      message: (
        <Title level={4} style={{ lineHeight: 1.2 }}>
          {t('booking.booking-confirmation')}
        </Title>
      ),
      description,
      icon: iconReact,
      placement: 'top',
    })
  }

  const handleRangeChange = async (dates: [Dayjs, Dayjs] | any) => {
    await queryClient.refetchQueries({
      queryKey: [SERVICE.BOOKING.CALENDAR],
      type: 'active',
    })
    const groupByDateBooking = groupByDateBookingHelper(bookersList)
    if (!date) return
    const startDate = dayjs(dates[0].toString()).format('YYYY-MM-DD,HH:mm')
    const endDate = dayjs(dates[1].toString()).format('YYYY-MM-DD,HH:mm')
    const [startDay, startHours] = startDate.split(',')
    const [, endHours] = endDate.split(',')
    const dateBooking: ICheckBooked[] = groupByDateBooking[startDay] ?? [
      {
        bookedTimeStart: '00:00',
        bookedTimeEnd: '00:00',
      },
    ]
    const {
      isInvalidTimeCheck,
      isCheckOverlappingTimes,
      isCheckMinimumMeeting,
    } = checkBookingHelpers(startHours, endHours, dateBooking)

    setDate(dates)
    setError(true)
    addReserveRoom({
      bDate: startDay,
    })
    if (isInvalidTimeCheck) {
      return openNotification(
        <MdError style={{ color: 'red' }} />,
        t('message.invalid-time'),
      )
    }
    if (isCheckMinimumMeeting(30)) {
      return openNotification(
        <MdError style={{ color: 'red' }} />,
        t('message.minimum-meeting'),
      )
    }
    if (isCheckOverlappingTimes) {
      return openNotification(
        <MdError style={{ color: 'red' }} />,
        t('message.overlapping-times'),
      )
    }
    setError(false)
    addReserveRoom({
      bDate: startDay,
      bTimeStart: startHours,
      bTimeEnd: endHours,
      bTimeCompleted: endHours,
    })
    openNotification(
      <FaCheckCircle style={{ color: '#52C41A' }} />,
      t('message.successfully-booked'),
    )
  }
  useEffect(() => {
    if (!reserve.bDate) {
      setDate([])
      setError(null)
    }
  }, [reserve.bDate])

  return (
    <>
      {contextHolder}
      <RangePickerTime
        error={error}
        date={date}
        onChange={handleRangeChange}
        reserve={reserve}
      />
    </>
  )
}

export default ReserveRangePicker
