import { meetingStores } from '../stores/meetingStores'

type stateUser = 'user'
const state = (name: stateUser) => meetingStores((state) => state[name])

type ActionUser = 'addUser' | 'clearUserId' | 'clearUser'
const action = (name: ActionUser) => meetingStores((state) => state[name])

export const useUserStores = () => ({
  user: () => state('user'),
  addUser: action('addUser'),
})
