import { ReactNode } from 'react'
import { useBookingAPIs } from '../../hooks/useBookingAPIs'
import useBookingStores from '../../hooks/useBookingStores'
import moment from 'moment'
import _ from 'lodash'

interface Props {
  children: ReactNode
}

const ReserveWatcher = ({ children }: Props) => {
  const today = moment().format('YYYY-MM-DD')
  const { useFindBookedByNow } = useBookingAPIs()
  const { addCalendar } = useBookingStores()
  const { isLoading } = useFindBookedByNow(today, (data) => {
    let sorted
    if (typeof data !== 'string')
      sorted = _.orderBy(data, ['created'], ['desc'])
    addCalendar(sorted ?? [])
  })

  if (isLoading) return 'Loading...'
  return children
}

export default ReserveWatcher
