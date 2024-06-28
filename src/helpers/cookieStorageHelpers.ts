import Cookies from 'js-cookie'

export const cookieStorageHelpers = {
  getItem: (name: string) => {
    const item = Cookies.get(name)
    return item ? JSON.parse(item) : null
  },
  setItem: (name: string, value: any) => {
    Cookies.set(name, value, { expires: 1 }) // Lưu trữ trong 1 ngày
  },
  removeItem: (name: string) => {
    Cookies.remove(name)
  },
}
