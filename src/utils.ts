import _ from 'lodash'

import moment from 'moment'
import { IBooking } from './services/bookingService'

export const filterBookingsByMonthAndUserName = (bookings: IBooking[]) => {
  return _.chain(bookings)
    .map((booking: IBooking) => ({
      month: moment(booking.bookedDate).format('YYYY-MM-DD'),
      userName: booking.userName,
    }))
    .value()
}
