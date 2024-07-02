import Cookies from 'js-cookie'
import moment from 'moment'
import { create } from 'zustand'
import {
  createJSONStorage,
  devtools,
  persist,
  StateStorage,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import bookingSlice, { IBookingSlice } from './bookingSlice'
import loginSlice, { ILoginSlice } from './loginSlice'
import managerSlice, { IManagerSlice } from './managerSlice'
import roomSlice, { IRoomSlice } from './roomSlice'
import userSlice, { IUserSlice } from './userSlice'

// encode base64
const encodeObject = (obj: any) => {
  const jsonString = JSON.stringify(obj)
  const encodedString = btoa(jsonString)
  return encodedString
}
// decode base64
const decodeObject = (encodedString: string) => {
  const jsonString = atob(encodedString)
  const obj = JSON.parse(jsonString)
  return obj
}

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const str = localStorage.getItem(name)
    return decodeObject(str as string)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    localStorage.setItem(name, encodeObject(value))
  },
  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name)
  },
}

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
        // storage: createJSONStorage(() => localStorage),
        storage: createJSONStorage(() => storage),
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
