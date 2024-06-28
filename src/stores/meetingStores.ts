import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import bookingSlice, { IBookingSlice } from './bookingSlice'
import managerSlice, { IManagerSlice } from './managerSlice'
import roomSlice, { IRoomSlice } from './roomSlice'
import userSlice, { IUserSlice } from './userSlice'

export const meetingStores = create<
  IRoomSlice & IUserSlice & IBookingSlice & IManagerSlice
>()(
  devtools(
    persist(
      immer((...create) => ({
        ...roomSlice(...create),
        ...userSlice(...create),
        ...bookingSlice(...create),
        ...managerSlice(...create),
      })),
      {
        name: 'MeetingStoreUserToken',
        partialize: (state) => ({ login: state.login }),
      },
    ),
    { name: 'MeetingStore' },
  ),
)
