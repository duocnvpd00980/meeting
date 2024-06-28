import { StateCreator } from 'zustand'
import { IBooking } from '../services/bookingService'

interface BookingState {
  booking: IBooking[]
  calendar: IBooking[]
}

interface BookingActions {
  addBooking: (booking: IBooking[]) => void
  addCalendar: (calendar: IBooking[]) => void
  clearBooking: (booking: IBooking[]) => void
}

export type IBookingSlice = BookingState & BookingActions

const initialState: BookingState = {
  booking: [],
  calendar: [],
}

const bookingSlice: StateCreator<IBookingSlice> = (set) => ({
  ...initialState,
  addBooking: (booking) => set({ booking }),
  addCalendar: (calendar) => set({ calendar }),
  clearBooking: () =>
    set({
      booking: [],
    }),
})

export default bookingSlice
