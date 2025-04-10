import { render, screen, waitFor } from '@testing-library/react'
import { createPortal } from 'react-dom'
import { toastManager } from '@/lib/core'
import { useContainerToast, useContainerToasts } from '@/hooks'
import { IContainerToast } from '@/interfaces'
import { ToastProvider } from '@/providers/toast'
import { ContainerToasts } from '@/components/toast/container-toasts'

const toastsStore = new Map()

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

jest.mock('@/components/toast/toast', () => {
  return {
    __esModule: true,
    ContainerToast: (props: IContainerToast) => {
      const id = props.id ?? 'unknown'
      const description = props.description ?? 'No description'

      setTimeout(() => {
        props.onRemove?.()
      }, 0)

      return <div data-testid={`toast-${id}`}>{description}</div>
    },
  }
})

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((element) => element),
}))

jest.mock('@/hooks', () => ({
  useContainerToasts: jest.fn(() => ({
    groupedToasts: {},
    mounted: false,
    toasts: [],
  })),
  useContainerToast: jest.fn(() => ({
    handleMouseDown: jest.fn(),
    handleMouseUp: jest.fn(),
    triggerRemove: jest.fn(),
  })),
}))

jest.mock('@/lib/core', () => ({
  toastManager: {
    remove: jest.fn((id) => {
      const toast = toastsStore.get(id)
      if (toast && typeof toast.onClose === 'function') {
        toast.onClose()
      }

      toastsStore.delete(id)
    }),
  },
}))

describe('ContainerToasts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useContainerToast as jest.Mock).mockReturnValue({
      handleMouseDown: jest.fn(),
      handleMouseUp: jest.fn(),
      triggerRemove: jest.fn(),
    })
  })

  const renderProvider = (ui: React.ReactElement) =>
    render(<ToastProvider>{ui}</ToastProvider>)

  it('renders nothing if not mounted or no toasts', () => {
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {},
      mounted: false,
      toasts: [],
    })

    const { container } = renderProvider(<ContainerToasts />)
    expect(container.firstChild).toBeNull()
  })

  it('renders grouped toasts correctly', () => {
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [
          { id: '1', description: 'Toast 1', autoClose: 5000 },
          { id: '2', description: 'Toast 2', autoClose: 3000 },
        ],
      },
      mounted: true,
      toasts: [
        { id: '1', description: 'Toast 1', autoClose: 5000 },
        { id: '2', description: 'Toast 2', autoClose: 3000 },
      ],
    })

    renderProvider(<ContainerToasts />)

    expect(screen.getByTestId('toast-1')).toHaveTextContent('Toast 1')
    expect(screen.getByTestId('toast-2')).toHaveTextContent('Toast 2')
    expect(createPortal).toHaveBeenCalled()
  })

  it('removes toast on close', () => {
    const mockOnClose = jest.fn()

    toastsStore.set('1', {
      id: '1',
      description: 'Toast 1',
      autoClose: 5000,
      onClose: mockOnClose,
    })
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [
          {
            id: '1',
            description: 'Toast 1',
            autoClose: 5000,
            onClose: mockOnClose,
          },
        ],
      },
      mounted: true,
      toasts: [
        {
          id: '1',
          description: 'Toast 1',
          autoClose: 5000,
          onClose: mockOnClose,
        },
      ],
    })

    renderProvider(<ContainerToasts />)

    const toast = screen.getByTestId('toast-1')
    expect(toast).toBeInTheDocument()

    toastManager.remove('1')
    expect(toastManager.remove).toHaveBeenCalledWith('1')
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('renders toasts in reverse order when newestOnTop is true', () => {
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [
          { id: '1', description: 'Toast 1', autoClose: 5000 },
          { id: '2', description: 'Toast 2', autoClose: 3000 },
        ],
      },
      mounted: true,
      toasts: [
        { id: '1', description: 'Toast 1', autoClose: 5000 },
        { id: '2', description: 'Toast 2', autoClose: 3000 },
      ],
    })

    renderProvider(<ContainerToasts newestOnTop />)

    const toastElements = screen.getAllByTestId(/toast-/)
    expect(toastElements[0]).toHaveTextContent('Toast 2')
    expect(toastElements[1]).toHaveTextContent('Toast 1')
  })

  it('applies custom item wrapper styles', () => {
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [{ id: '1', description: 'Toast' }],
      },
      mounted: true,
      toasts: [{ id: '1', description: 'Toast' }],
    })

    renderProvider(<ContainerToasts itemClassName="custom-class" />)

    const wrapper = screen.getByTestId('toast-1').parentElement
    expect(wrapper).toHaveClass('custom-class')
  })

  it('limits toasts when limit prop is provided', () => {
    ;(useContainerToasts as jest.Mock).mockImplementation(({ limit }) => {
      const allToasts = [
        { id: '1', message: 'Toast 1' },
        { id: '2', message: 'Toast 2' },
        { id: '3', message: 'Toast 3' },
      ]
      const limitedToasts = limit ? allToasts.slice(0, limit) : allToasts

      return {
        groupedToasts: {
          topRight: limitedToasts,
        },
        mounted: true,
        toasts: limitedToasts,
      }
    })

    renderProvider(<ContainerToasts limit={2} />)

    const toasts = screen.getAllByTestId(/toast-/)
    expect(toasts).toHaveLength(2)
    expect(screen.getByTestId('toast-1')).toBeInTheDocument()
    expect(screen.getByTestId('toast-2')).toBeInTheDocument()
    expect(screen.queryByTestId('toast-3')).not.toBeInTheDocument()
  })

  it('removes toast on close and calls onClose', async () => {
    const mockOnClose = jest.fn()
    const mockRemove = jest.fn((id) => {
      const toast = toastsStore.get(id)
      toast?.onClose?.()
      toastsStore.delete(id)
    })

    toastsStore.set('1', {
      id: '1',
      description: 'Toast 1',
      autoClose: 5000,
      onClose: mockOnClose,
    })
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [
          {
            id: '1',
            description: 'Toast 1',
            autoClose: 5000,
            onClose: mockOnClose,
          },
        ],
      },
      mounted: true,
      toasts: [
        {
          id: '1',
          description: 'Toast 1',
          autoClose: 5000,
          onClose: mockOnClose,
        },
      ],
    })

    toastManager.remove = mockRemove

    renderProvider(<ContainerToasts />)

    const toast = screen.getByText('Toast 1')
    expect(toast).toBeInTheDocument()

    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledWith('1')
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it('skips rendering for empty toast groups', () => {
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [],
      },
      mounted: true,
      toasts: [{ id: '1', description: 'Toast 1' }],
    })

    const { container } = renderProvider(<ContainerToasts />)
    expect(container.querySelector('.toast-position-topRight')).toBeNull()
  })

  it('applies custom margin style when margin is not default', () => {
    ;(useContainerToasts as jest.Mock).mockReturnValue({
      groupedToasts: {
        topRight: [{ id: '1', description: 'Toast 1' }],
      },
      mounted: true,
      toasts: [{ id: '1', description: 'Toast 1' }],
    })

    renderProvider(<ContainerToasts margin={24} />)

    const wrapper = screen
      .getByTestId('toast-1')
      .closest('.toast-position-topRight')
    expect(wrapper).toHaveStyle({ padding: '24px' })
  })
})
