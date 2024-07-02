import { StateCreator } from 'zustand'
import { IRoom } from '../services/roomService'
import { IUser } from '../services/userService'

export interface IReserveRoom {
  rId?: string
  uId?: string
  bTimeStart?: string
  bTimeEnd?: string
  bTimeCompleted?: string
  bDate?: string
  bComment?: string
  bActive?: number
  bStatus?: number
}

export interface IManagerState {
  manager: {
    userId: IUser
    roomId: IRoom
    bookedId: object
    calendarId: string
    reserveRoom: IReserveRoom
  }
}

interface IManagerActions {
  addUserId: (userId: IUser) => void
  addRoomId: (roomId: IRoom) => void
  addBookedId: (bookedId: object) => void
  addCalendarId: (calendarId: string) => void
  addReserveRoom: (reserve: IReserveRoom) => void
  clearUserId: () => void
  clearBookedId: () => void
  clearRoomId: () => void
  clearReserveRoom: () => void
}

export type IManagerSlice = IManagerState & IManagerActions

const initialState: IManagerState = {
  manager: {
    userId: {
      userID: '',
      userName: '',
      userEmail: '',
      userDep: '',
      created: '',
      isActive: '',
    },
    roomId: {
      roomID: '',
      roomName: '',
      roomSeat: '',
      roomOption: '',
      created: '',
      isActive: '',
    },
    bookedId: {},
    calendarId: '',
    reserveRoom: {
      bComment: '',
      bActive: 1,
      bStatus: 0,
    },
  },
}

const managerSlice: StateCreator<IManagerSlice> = (set) => ({
  ...initialState,
  addUserId: (userId) =>
    set((state) => ({
      manager: {
        ...state.manager,
        userId,
      },
    })),
  addRoomId: (roomId) =>
    set((state) => ({
      manager: {
        ...state.manager,
        roomId,
      },
    })),
  addBookedId: (bookedId) =>
    set((state) => ({
      manager: {
        ...state.manager,
        bookedId,
      },
    })),
  addCalendarId: (calendarId) =>
    set((state) => ({
      manager: {
        ...state.manager,
        calendarId,
      },
    })),
  addReserveRoom: (reserve) =>
    set((state) => ({
      manager: {
        ...state.manager,
        reserveRoom: {
          ...state.manager.reserveRoom,
          ...reserve,
        },
      },
    })),
  clearUserId: () =>
    set((state) => ({
      manager: {
        ...state.manager,
        userId: initialState.manager.userId,
      },
    })),
  clearBookedId: () =>
    set((state) => ({
      manager: {
        ...state.manager,
        bookedId: {},
      },
    })),
  clearRoomId: () =>
    set((state) => ({
      manager: {
        ...state.manager,
        roomId: initialState.manager.roomId,
      },
    })),
  clearReserveRoom: () =>
    set((state) => ({
      manager: {
        ...state.manager,
        reserveRoom: {
          rId: state.manager.reserveRoom.rId,
          uId: state.manager.reserveRoom.uId,
          bComment: '',
          bActive: 1,
          bStatus: 0,
        },
      },
    })),
})

export default managerSlice
