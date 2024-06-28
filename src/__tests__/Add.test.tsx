import { render, screen } from '@testing-library/react'
import Add from '../features/Booking/Add'
import userEvent from '@testing-library/user-event'

describe('Booking', () => {
  const renderBooking = () => {
    const onChange = vi.fn()
    render(<Add />)
    return {
      datePicker: screen.getByPlaceholderText(/Start date/i),
      message: screen.getByRole('heading'),
      user: userEvent.setup(),
      button: screen.getByRole('button'),
      onChange,
    }
  }

  it('renders date picker and check time button', () => {
    const { datePicker, button } = renderBooking()
    expect(datePicker).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/check/i)
  })

  it('performs time checking when button is clicked', async () => {
    const { button, user, datePicker, message } = renderBooking()
    user.clear(datePicker) // Clear any existing value first
    user.type(datePicker, '2024-06-26 06:40 - 2024-06-26 08:54')
    await user.click(button)
    expect(message).toHaveTextContent(/Trùng/i)
  })
})
