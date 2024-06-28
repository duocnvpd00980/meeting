import { ReactNode } from 'react'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import useBookingStores from '../../hooks/useBookingStores'
import useLogin from '../../hooks/useLogin'
import moment from 'moment'

interface Props {
  children: ReactNode
}

const BookedWatcher = ({ children }: Props) => {
  const { useAuth } = useLogin()
  const { user } = useAuth()
  const today = moment().format('YYYY-MM-DD')
  const { useFindBookedByUser } = useBookingAPIs()
  const { addBooking } = useBookingStores()
  const { isLoading } = useFindBookedByUser(
    {
      userID: user.userID,
      dateToday: today,
    },
    (data) => {
      addBooking(data)
    },
  )

  if (isLoading) return 'Loading...'

  return children
}

export default BookedWatcher
