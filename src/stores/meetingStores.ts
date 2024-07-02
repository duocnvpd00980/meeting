import Cookies from 'js-cookie'
import moment from 'moment'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import bookingSlice, { IBookingSlice } from './bookingSlice'
import loginSlice, { ILoginSlice } from './loginSlice'
import managerSlice, { IManagerSlice } from './managerSlice'
import roomSlice, { IRoomSlice } from './roomSlice'
import userSlice, { IUserSlice } from './userSlice'

export const meetingStores = create<
  ILoginSlice & IRoomSlice & IUserSlice & IBookingSlice & IManagerSlice
>()(
  devtools(
    persist(
      immer((...create) => ({
        ...loginSlice(...create),
        ...roomSlice(...create),
        ...userSlice(...create),
        ...bookingSlice(...create),
        ...managerSlice(...create),
      })),
      {
        name: 'MeetingStoreUserToken',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ login: state.login }),
      },
    ),
    { name: 'MeetingStore' },
  ),
)

// Authentication & Authenticated
let auth = true
const Authentication = meetingStores.subscribe((state) => {
  const expires = moment().add(30, 'minutes').utc().toDate()
  const get = Cookies.get('Authenticated')
  if (!get && !auth) {
    auth = true
    state.setLogout()
    return Authentication()
  }
  Cookies.set('Authenticated', state.login.userEmail, { expires })
  auth = false
})
