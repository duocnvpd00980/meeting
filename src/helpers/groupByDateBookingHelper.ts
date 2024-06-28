import { IBooking } from '../services/bookingService'

export interface ICheckBooked {
  bookedTimeStart: string
  bookedTimeEnd: string
}

interface GroupedBookings {
  [key: string]: ICheckBooked[]
}

export const groupByDateBookingHelper = (bookings: IBooking[]) => {
  return bookings.reduce((acc: GroupedBookings, booking: IBooking) => {
    const { bookedDate } = booking
    if (!acc[bookedDate]) {
      acc[bookedDate] = []
    }
    acc[bookedDate].push({
      bookedTimeStart: booking.bookedTimeStart,
      bookedTimeEnd: booking.bookedTimeEnd,
    })
    return acc ?? []
  }, {})
}
