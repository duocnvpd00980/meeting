import { ICheckBooked } from './groupByDateBookingHelper'

export const checkBookingHelpers = (
  startTime?: string,
  endTime?: string,
  bookers?: ICheckBooked[],
) => {
  if (!startTime || !endTime || !bookers)
    return {
      isInvalidTimeCheck: true,
      isCheckOverlappingTimes: true,
      isCheckMinimumMeeting: () => true,
    }

  let isInvalidTimeCheck
  if (endTime < startTime) {
    isInvalidTimeCheck = true
  }
  const isCheckRoom = bookers.every(
    (booked) =>
      startTime >= booked.bookedTimeEnd || endTime <= booked.bookedTimeStart,
  )
  const isCheckMinimumMeeting = (time = 30) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const minute = (minutes + time) % 60
    const hour = hours + Math.floor((minutes + time) / 60)
    const minTime =
      hour.toString().padStart(2, '0') +
      ':' +
      minute.toString().padStart(2, '0')
    console.log(minTime, endTime)
    return minTime <= endTime ? false : true
  }

  return {
    isInvalidTimeCheck,
    isCheckOverlappingTimes: !isCheckRoom,
    isCheckMinimumMeeting,
  }
}
