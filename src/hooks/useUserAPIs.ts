import { useMutation, useQuery } from '@tanstack/react-query'
import userService, { IUser } from '../services/userService'
import { SERVICE } from '../constants'

export const useUserAPIs = () => {
  return {
    useFindMany: (saveStore: (data: IUser[]) => void) =>
      useQuery({
        queryKey: [SERVICE.USER.READ],
        queryFn: userService.read.findMany(saveStore),
      }),
    useInsertOne: () =>
      useMutation({
        mutationFn: userService.create.insertMany,
      }),
    useUpdateOne: () =>
      useMutation({
        mutationFn: userService.update.updateMany,
      }),
  }
}
