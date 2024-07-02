import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'type; charset=utf-8' },
})

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }
  login = (payload: string) =>
    instance.post<T>(this.endpoint, payload).then((res) => res.data)

  findMany = (saveStore?: (data: T[]) => void) => (): Promise<T[]> =>
    instance.get<T[]>(this.endpoint).then((res) => {
      if (saveStore) saveStore(res.data)
      return res.data
    })

  insertOne = (payload: T): Promise<T[]> =>
    instance.post<T[]>(this.endpoint, payload).then((res) => res.data)

  insertMany = (payload: T[]) =>
    instance.post<T>(this.endpoint, payload).then((res) => res.data)

  updateMany = (payload: T[]) =>
    instance.put<T>(this.endpoint, payload).then((res) => res.data)

  deleteOne = (id: string) =>
    instance.delete<T>(`${this.endpoint}/${id}`).then((res) => res.data)

  findByBooked = (now: string, saveStore?: (data: T[]) => void) => () =>
    instance.get<T[]>(`${this.endpoint}/${now}`).then((res) => {
      if (saveStore) saveStore(res.data)
      return res.data
    })

  findByUser =
    (
      { userID, dateToday }: { userID: string; dateToday: string },
      saveStore?: (data: T[]) => void,
    ) =>
    () =>
      instance
        .get<T[]>(`${this.endpoint}/${userID}/${dateToday}`)
        .then((res) => {
          if (saveStore) saveStore(res.data)
          return res.data
        })
}

export default APIClient
