import { StateCreator } from 'zustand'
import { IUserLogin } from '../services/loginService'

export interface ILoginState {
  login: IUserLogin
}

interface LoginActions {
  setLogin: (user: IUserLogin) => void
  setLogout: (user: IUserLogin) => void
}

export type ILoginSlice = ILoginState & LoginActions

const initialState: ILoginState = {
  login: {
    userID: '',
    userName: '',
    userEmail: '',
    userDep: '',
    created: '',
    isActive: '',
    userRole: 0,
  },
}

const loginSlice: StateCreator<ILoginSlice> = (set) => ({
  ...initialState,
  setLogin: (user) => set({ login: user }),
  setLogout: () =>
    set({
      login: {
        userID: '',
        userName: '',
        userEmail: '',
        userDep: '',
        created: '',
        isActive: '',
        userRole: 0,
      },
    }),
})

export default loginSlice
