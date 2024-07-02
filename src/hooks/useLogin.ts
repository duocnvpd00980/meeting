import { MutateOptions } from '@tanstack/react-query'
import { message } from 'antd'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IUserLogin } from '../services/loginService'
import { meetingStores } from '../stores/meetingStores'

export type FormValues = {
  email: string
}
type Mutate = (
  variables: string,
  options?:
    | MutateOptions<string | IUserLogin, Error, string, unknown>
    | undefined,
) => void

const useLogin = () => {
  const setLogin = meetingStores((store) => store.setLogin)
  const navigate = useNavigate()

  return {
    onSubmit: (mutate: Mutate) => {
      const onSubmit: SubmitHandler<FormValues> = (formData) => {
        mutate(formData.email, {
          onSuccess: (data: IUserLogin | string) => {
            if (typeof data === 'string') {
              message.error('Login failed.')
            }
            if (typeof data === 'object' && data.userEmail) {
              setLogin(data)
              message.success('Login successful!')
              navigate('/reserves')
            }
          },
        })
      }
      return onSubmit
    },
  }
}
export default useLogin
