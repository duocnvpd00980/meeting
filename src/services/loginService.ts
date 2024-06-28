import { SERVICE } from '../constants'
import APIClient from './apiClient'

export interface IUserLogin {
  userID: string
  userName: string
  userEmail: string
  userDep: string
  created: string
  isActive: string
  userRole: number
}
export default new APIClient<IUserLogin | string>(SERVICE.LOGIN)
