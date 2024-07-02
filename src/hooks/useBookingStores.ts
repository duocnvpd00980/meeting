import { meetingStores } from '../stores/meetingStores'

type State = 'booking' | 'calendar'
const state = (name: State) => meetingStores((state) => state[name])

type Action = 'addBooking' | 'addCalendar'
const action = (name: Action) => meetingStores((state) => state[name])

const calendar = () => {
  const { calendar, calendarId } = meetingStores((state) => ({
    calendar: state.calendar,
    calendarId: state.manager.calendarId,
  }))
  if (typeof calendar === 'string') return []
  if (!calendarId) return []
  const result = calendar.filter((item) => item.roomID === calendarId)
  if (!result.length) return []
  return result
}

const useBookingStores = () => ({
  booking: () => state('booking'),
  calendar: () => calendar(),
  addBooking: action('addBooking'),
  addCalendar: action('addCalendar'),
})

export default useBookingStores
