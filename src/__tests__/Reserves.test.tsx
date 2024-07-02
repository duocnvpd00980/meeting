import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Reserves from '../features/Booking/Reserve'
const queryClient = new QueryClient()

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})

describe('Home', () => {
  const renderApp = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Reserves />
        </BrowserRouter>
        ,
      </QueryClientProvider>,
    )
  }

  it('should render the heading', () => {
    renderApp()
    const heading = screen.getByRole('heading', {
      name: /booking\.book-meeting-room/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('should render a list of buttons', () => {
    renderApp()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should simulate button click', () => {
    renderApp()
    const button = screen.getByRole('button', { name: /booking\.booked-room/i })
    userEvent.click(button)
  })
})
