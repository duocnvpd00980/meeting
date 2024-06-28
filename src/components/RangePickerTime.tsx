import { DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { GetProps } from 'antd'
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
const { RangePicker } = DatePicker
dayjs.extend(customParseFormat)

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  const today = dayjs().startOf('day')
  return current && dayjs(current).isBefore(today, 'day')
}

const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => {
        const startHour = _.hour()
        const disabledHours = []
        if (dayjs().isSame(_, 'day')) {
          for (let i = 0; i < 24; i++) {
            if (i < 6 || i > 21 || i < startHour) {
              disabledHours.push(i)
            }
          }
        }
        return disabledHours
      },
      disabledMinutes: (selectedHour) => {
        if (dayjs().isSame(_, 'day') && selectedHour === dayjs().hour()) {
          return [...Array(dayjs().minute()).keys()]
        }
        return []
      },
    }
  }
  if (type === 'end') {
    return {
      disabledHours: () => {
        const startHour = _.hour()
        const disabledHours = []
        if (dayjs().isSame(_, 'day')) {
          for (let i = 0; i < 24; i++) {
            if (i < 6 || i > 21 || i < startHour) {
              disabledHours.push(i)
            }
          }
        }
        return disabledHours
      },
      disabledMinutes: (selectedHour) => {
        if (dayjs().isSame(_, 'day') && selectedHour === dayjs().hour()) {
          return [...Array(dayjs().minute()).keys()]
        }
        return []
      },
    }
  }
  return {}
}

interface Props {
  error: boolean | null
  date: any
  onChange: (dates: [Dayjs, Dayjs] | any) => void
  reserve: object
}

export const RangePickerTime = ({ error, date, onChange, reserve }: Props) => {
  let inputCheck = {}

  if (error === true)
    inputCheck = {
      border: '1px solid #ffccc7',
      background: '#fff2f0',
    }
  if (error === false) {
    inputCheck = {
      border: '1px solid #b7eb8f',
      background: '#f6ffed',
    }
  }
  return (
    <RangePicker
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      showTime={{
        hideDisabledOptions: false,
        defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('11:59', 'HH:mm')],
        minuteStep: 5,
      }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      style={inputCheck}
      value={date}
      disabled={!('rId' in reserve)}
      allowEmpty
    />
  )
}

export default RangePickerTime
