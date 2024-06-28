import { useMutation, useQuery } from '@tanstack/react-query'
import { SERVICE } from '../constants'
import bookingService, { IBooking } from '../services/bookingService'

export const useBookingAPIs = () => {
  return {
    useFindBookedByUser: (
      params: { userID: string; dateToday: string },
      saveStore: (data: IBooking[]) => void,
    ) =>
      useQuery({
        queryKey: [SERVICE.BOOKING.READ_ALL],
        queryFn: bookingService.read.findByUser(params, saveStore),
      }),
    useDeleteOne: () =>
      useMutation({
        mutationFn: bookingService.remove.deleteOne,
      }),
    useInsertMany: () =>
      useMutation({
        mutationFn: bookingService.create.insertMany,
      }),
    useFindBookedByNow: (
      today: string,
      saveStore: (data: IBooking[]) => void,
    ) =>
      useQuery({
        queryKey: [SERVICE.BOOKING.CALENDAR],
        queryFn: bookingService.calendar.findByBooked(today, saveStore),
      }),
  }
}
