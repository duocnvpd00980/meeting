import { StateCreator } from 'zustand'
import { IRoom } from '../services/roomService'

interface RoomState {
  room: IRoom[]
}

interface RoomActions {
  addRoom: (newRoom: IRoom[]) => void
  clearRoom: (roomID: IRoom[]) => void
}

export type IRoomSlice = RoomState & RoomActions

const initialState: RoomState = {
  room: [],
}

const roomSlice: StateCreator<IRoomSlice> = (set) => ({
  ...initialState,
  addRoom: (newRoom) => set({ room: newRoom }),
  clearRoom: () =>
    set({
      room: [],
    }),
})

export default roomSlice
