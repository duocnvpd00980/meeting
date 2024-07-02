import { Rule } from 'antd/es/form'

export const schemaLogin: Rule[] = [
  { required: true, message: 'Please enter your email address.' },
  { type: 'email', message: 'Your email is valid.' },
]

export const schemaRoomName: Rule[] = [
  { required: true, message: 'Please input the room name!' },
  { type: 'string', min: 3 },
]

export const schemaRoomSeats: Rule[] = [
  { required: true, message: 'Please input the number of seats!' },
  {
    type: 'number',
    min: 1,
    max: 50,
    message: 'Seats number must be between 1 and 50',
    transform: (value) => {
      return isNaN(Number(value)) ? 0 : Number(value)
    },
  },
]

export const schemaUsername: Rule[] = [
  { required: true, message: 'Please input the user name!' },
  { type: 'string', min: 3 },
]

export const schemaEmail: Rule[] = [
  { required: true, message: 'Please enter your email address.' },
  { type: 'email', message: 'Your email is valid.' },
]

export const schemaTeam: Rule[] = [
  { required: true, message: 'Please input the team!' },
  { type: 'string', min: 1 },
]
