import { IRoom } from '../services/roomService'
import { IUser } from '../services/userService'
import { IReserveRoom } from '../stores/managerSlice'
import { meetingStores } from '../stores/meetingStores'

type State = 'roomId' | 'bookedId' | 'userId' | 'calendarId' | 'reserveRoom'
const state = (name: State) => meetingStores((state) => state.manager[name])

type Action =
  | 'addRoomId'
  | 'clearRoomId'
  | 'addUserId'
  | 'clearUserId'
  | 'addCalendarId'
  | 'addReserveRoom'
  | 'clearReserveRoom'
const action = (name: Action) => meetingStores((state) => state[name])

export const useManagerStores = () => {
  return {
    roomId: () => state('roomId') as IRoom,
    reserveRoom: () => state('reserveRoom') as IReserveRoom,
    bookedId: () => state('bookedId'),
    calendarId: () => state('calendarId') as string,
    userId: () => state('userId') as IUser,
    addRoomId: action('addRoomId') as (room: IRoom) => IRoom,
    clearRoomId: action('clearRoomId') as () => void,
    addUserId: action('addUserId') as (user: IUser) => IUser,
    clearUserId: action('clearUserId') as () => void,
    addCalendarId: action('addCalendarId') as (calendar: string) => string,
    addReserveRoom: action('addReserveRoom') as (
      reserve: IReserveRoom,
    ) => IReserveRoom,
    clearReserveRoom: action('clearReserveRoom') as () => void,
  }
}
