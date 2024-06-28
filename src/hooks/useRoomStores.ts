import { IRoom } from '../services/roomService'
import { meetingStores } from '../stores/meetingStores'

type State = 'room'
const state = (name: State) => meetingStores((state) => state[name])

type Action = 'addRoom'
const action = (name: Action) => meetingStores((state) => state[name])

export const useRoomStores = () => ({
  room: () => state('room') as IRoom[],
  addRoom: action('addRoom'),
})
