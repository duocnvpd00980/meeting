import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

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
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )
    return {
      heading: screen.getByRole('heading'),
    }
  }

  it('should render the heading', () => {
    const { heading } = renderApp()
    expect(heading).toBeInTheDocument()
  })
})
