// Các giá trị hằng số:
export const MAX_ATTEMPTS = 3

// Các chuỗi hằng số:
export const SERVICE = {
  BOOKING: {
    READ_ALL: 'getAllBook',
    REMOVE: 'delBooked',
    CALENDAR: 'getCurrentDateBook',
    CREATE: 'addBook',
  },
  USER: {
    READ: 'getUser',
    CREATE: 'addUser',
    UPDATE: 'updateUser',
  },
  ROOM: {
    READ: 'getRoom',
    CREATE: 'addRoom',
    UPDATE: 'updateRoom',
  },
  LOGIN: 'login',
}

export const ROUTER = {
  RESERVE: 'reserves',
  USER: 'user',
  ROOM: 'room',
  BOOKED: 'booked',
  LOGIN: 'login',
  ADD: 'add',
}

// Các số hằng số:
export const DEFAULT_TIMEOUT = 5000 // milliseconds

// Các mã lỗi:
export const ERROR_CODES = {
  NOT_AUTHORIZED: 401,
  SERVER_ERROR: 500,
}

// Thông số cấu hình:
export const APP_CONFIG = {
  version: '1.0.0',
  environment: 'production',
}
