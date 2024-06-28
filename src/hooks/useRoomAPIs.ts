import { useMutation, useQuery } from '@tanstack/react-query'
import roomService, { IRoom } from '../services/roomService'
import { SERVICE } from '../constants'

export const useRoomAPIs = () => {
  return {
    useFindMany: (saveStore: (data: IRoom[]) => void) =>
      useQuery({
        queryKey: [SERVICE.ROOM.READ],
        queryFn: roomService.read.findMany(saveStore),
      }),
    useInsertOne: () =>
      useMutation({
        mutationFn: roomService.create.insertMany,
      }),
    useUpdateOne: () =>
      useMutation({
        mutationFn: roomService.update.updateMany,
      }),
  }
}
