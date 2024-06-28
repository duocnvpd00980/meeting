import { SERVICE } from '../constants'
import APIClient from './apiClient'

export interface IRoom {
  roomID: string
  roomName: string
  roomSeat: string
  roomOption: string
  created: string
  isActive: string
}

export type IFieldRoom = {
  name: string
  seat: string
  opt: string
  rId: string
}

const read = new APIClient<IRoom>(SERVICE.ROOM.READ)
const create = new APIClient<IFieldRoom>(SERVICE.ROOM.CREATE)
const update = new APIClient<IFieldRoom>(SERVICE.ROOM.UPDATE)
export default { read, create, update }
