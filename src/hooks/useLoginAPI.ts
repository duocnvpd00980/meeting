import { useMutation } from '@tanstack/react-query'
import loginService from '../services/loginService'

export const useLoginAPI = () =>
  useMutation({
    mutationFn: loginService.login,
  })
