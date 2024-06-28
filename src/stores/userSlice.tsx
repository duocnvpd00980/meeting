import { StateCreator } from 'zustand'
import { IUser } from '../services/userService'

interface UserState {
  user: IUser[]
}

interface UserActions {
  addUser: (newUser: IUser[]) => void
  clearUser: (userID: IUser[]) => void
}

export type IUserSlice = UserState & UserActions

const initialState: UserState = {
  user: [],
}

const userSlice: StateCreator<IUserSlice> = (set) => ({
  ...initialState,
  addUser: (newUser) => set({ user: newUser }),
  clearUser: () =>
    set({
      user: [],
    }),
})

export default userSlice
