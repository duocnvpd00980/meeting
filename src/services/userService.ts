import { SERVICE } from '../constants'
import APIClient from './apiClient'

export interface IUser {
  userID: string
  userName: string
  userEmail: string
  userDep: string
  created: string
  isActive: string
}

export type IFieldUser = {
  name: string
  email: string
  dep: string
}

const read = new APIClient<IUser>(SERVICE.USER.READ)
const create = new APIClient<IFieldUser>(SERVICE.USER.CREATE)
const update = new APIClient<IFieldUser>(SERVICE.USER.UPDATE)

export default { read, create, update }
