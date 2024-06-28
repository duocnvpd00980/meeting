import moment from 'moment'
import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import useBookingStores from '../../hooks/useBookingStores'

const localizer = momentLocalizer(moment)

const ReserveCalendar: React.FC = () => {
  const { calendar } = useBookingStores()
  const meetings = calendar()
  const events = meetings.map((meeting) => ({
    id: meeting.bookedID,
    title: meeting.userName,
    hello: ' welcome',
    start: new Date(`${meeting.bookedDate}T${meeting.bookedTimeStart}`),
    end: new Date(`${meeting.bookedDate}T${meeting.bookedTimeEnd}`),
  }))

  const dayPropGetter = (date: Date) => {
    const today = moment(date).startOf('day').isBefore(moment().startOf('day'))
    const lastMonth = moment(new Date())
      .subtract(1, 'month')
      .endOf('month')
      .toDate()
    if (today && date > lastMonth) {
      return {
        style: {
          backgroundColor: '#ebebeb',
          opacity: 0.4,
          zIndex: 666,
          pointerEvents: 'none' as any,
        },
      }
    }
    return {}
  }

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ width: '100%', height: 640, paddingLeft: 24 }}
      defaultView={Views.MONTH}
      dayPropGetter={dayPropGetter}
    />
  )
}

export default ReserveCalendar
