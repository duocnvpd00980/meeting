import { SERVICE } from '../constants'
import APIClient from './apiClient'

export interface IBooking {
  bookedID: string
  roomID: string
  userID: string
  bookedTimeStart: string
  bookedTimeEnd: string
  bookedTimeCompleted: string
  bookedDate: string
  bookedComment: string
  bookedActive: string
  bookedStatus: string
  created: string
  isActive: string | null
  roomName?: string
  userName?: string
}

const read = new APIClient<IBooking>(SERVICE.BOOKING.READ_ALL)
const calendar = new APIClient<IBooking>(SERVICE.BOOKING.CALENDAR)
const remove = new APIClient<IBooking>(SERVICE.BOOKING.REMOVE)
const create = new APIClient<IBooking>(SERVICE.BOOKING.CREATE)
export default { read, remove, calendar, create }
