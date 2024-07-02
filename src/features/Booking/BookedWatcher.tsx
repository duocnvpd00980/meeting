import _ from 'lodash'
import moment from 'moment'
import { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import useBookingStores from '../../hooks/useBookingStores'

interface Props {
  children: ReactNode
}

const BookedWatcher = ({ children }: Props) => {
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
      let sorted
      if (typeof data !== 'string')
        sorted = _.orderBy(data, ['created'], ['desc'])
      addBooking(sorted ?? [])
    },
  )

  if (isLoading) return 'Loading...'

  return children
}

export default BookedWatcher
