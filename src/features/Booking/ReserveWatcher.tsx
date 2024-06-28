import { ReactNode } from 'react'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import useBookingStores from '../../hooks/useBookingStores'
import moment from 'moment'

interface Props {
  children: ReactNode
}

const ReserveWatcher = ({ children }: Props) => {
  const today = moment().format('YYYY-MM-DD')
  const { useFindBookedByNow } = useBookingAPIs()
  const { addCalendar } = useBookingStores()
  const { isLoading } = useFindBookedByNow(today, (data) => {
    addCalendar(data)
  })

  if (isLoading) return 'Loading...'
  return children
}

export default ReserveWatcher
