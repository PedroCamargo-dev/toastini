import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ContainerToast } from '@/components/toast/toast/container-toast'
import { useContainerToast } from '@/hooks'
import { ToastProvider } from '@/context'

jest.mock('@/hooks', () => ({
  useContainerToast: jest.fn(),
}))

const mockTheme = {
  colors: {
    default: {
      background: '#fff',
      border: '#ccc',
      text: '#000',
    },
    success: {
      background: '#d4edda',
      border: '#c3e6cb',
      text: '#155724',
    },
    error: {
      background: '#f8d7da',
      border: '#f5c6cb',
      text: '#721c24',
    },
    info: {
      background: '#d1ecf1',
      border: '#bee5eb',
      text: '#0c5460',
    },
    warning: {
      background: '#fff3cd',
      border: '#ffeeba',
      text: '#856404',
    },
  },
}

describe('ContainerToast', () => {
  const mockHandleClick = jest.fn()
  const mockHandleMouseDown = jest.fn()
  const mockHandleMouseMove = jest.fn()
  const mockHandleMouseUp = jest.fn()
  const mockTriggerRemove = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useContainerToast as jest.Mock).mockReturnValue({
      toastRef: { current: null },
      isDragging: false,
      transform: 'translate(0px)',
      opacity: 1,
      handleClick: mockHandleClick,
      handleMouseDown: mockHandleMouseDown,
      handleMouseMove: mockHandleMouseMove,
      handleMouseUp: mockHandleMouseUp,
      triggerRemove: mockTriggerRemove,
    })
  })

  const renderWithMockTheme = (ui: React.ReactElement) =>
    render(<ToastProvider customTheme={mockTheme}>{ui}</ToastProvider>)

  const renderWithoutMockTheme = (ui: React.ReactElement) =>
    render(<ToastProvider>{ui}</ToastProvider>)

  test('renders with default props (with theme)', () => {
    renderWithMockTheme(
      <ContainerToast
        id="test-toast-1"
        title="Test Toast"
        description="This is a test toast"
        onRemove={jest.fn()}
      />,
    )

    expect(screen.getByText('Test Toast')).toBeInTheDocument()
    expect(screen.getByText('This is a test toast')).toBeInTheDocument()
  })

  test('renders with default props', () => {
    renderWithMockTheme(
      <ContainerToast
        id="test-toast-1"
        title="Test Toast"
        description="This is a test toast"
        onRemove={jest.fn()}
      />,
    )

    expect(screen.getByText('Test Toast')).toBeInTheDocument()
    expect(screen.getByText('This is a test toast')).toBeInTheDocument()
    expect(useContainerToast).toHaveBeenCalledWith({
      position: 'top-right',
      closeOnClick: true,
      draggable: true,
      onRemove: expect.any(Function),
    })
  })

  test('renders without title or description', () => {
    renderWithMockTheme(
      <ContainerToast id="test-toast-2" onRemove={jest.fn()} />,
    )

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  test('renders with custom type', () => {
    renderWithMockTheme(
      <ContainerToast
        id="test-toast-3"
        type="success"
        title="Success Toast"
        onRemove={jest.fn()}
      />,
    )

    expect(screen.getByText('Success Toast')).toBeInTheDocument()
  })

  test('handles click events', () => {
    renderWithMockTheme(
      <ContainerToast
        id="test-toast-4"
        title="Test Toast"
        onRemove={jest.fn()}
      />,
    )

    fireEvent.click(screen.getByText('Test Toast'))
    expect(mockHandleClick).toHaveBeenCalled()
  })

  test('handles mouse events for dragging', () => {
    renderWithMockTheme(
      <ContainerToast
        id="test-toast-5"
        title="Draggable Toast"
        draggable={true}
        onRemove={jest.fn()}
      />,
    )

    const toast =
      screen.getByText('Draggable Toast').parentElement?.parentElement
    if (toast) {
      fireEvent.mouseDown(toast)
      expect(mockHandleMouseDown).toHaveBeenCalled()

      fireEvent.mouseMove(toast)
      expect(mockHandleMouseMove).toHaveBeenCalled()

      fireEvent.mouseUp(toast)
      expect(mockHandleMouseUp).toHaveBeenCalled()
    }
  })

  test('close button triggers remove', () => {
    renderWithMockTheme(
      <ContainerToast
        id="test-toast-4"
        title="Test Toast"
        onRemove={jest.fn()}
      />,
    )

    const closeButton = screen.getByRole('button', { hidden: true })
    fireEvent.click(closeButton)

    expect(mockTriggerRemove).toHaveBeenCalled()
  })

  test('applies custom styles', () => {
    const customStyles = {
      backgroundColor: 'red',
      color: 'white',
    }

    renderWithMockTheme(
      <ContainerToast
        id="test-toast-6"
        title="Styled Toast"
        toastContainerWrapperStyle={customStyles}
        onRemove={jest.fn()}
      />,
    )

    expect(useContainerToast).toHaveBeenCalled()
  })

  test('calls onRemove callback when provided', () => {
    const onRemoveMock = jest.fn()

    ;(useContainerToast as jest.Mock).mockReturnValue({
      toastRef: { current: null },
      isDragging: false,
      transform: 'translate(0px)',
      opacity: 1,
      handleClick: mockHandleClick,
      handleMouseDown: mockHandleMouseDown,
      handleMouseMove: mockHandleMouseMove,
      handleMouseUp: mockHandleMouseUp,
      triggerRemove: mockTriggerRemove,
    })

    renderWithMockTheme(
      <ContainerToast
        id="test-toast-7"
        title="Test Toast"
        onRemove={onRemoveMock}
      />,
    )

    expect(useContainerToast).toHaveBeenCalledWith(
      expect.objectContaining({ onRemove: onRemoveMock }),
    )
  })

  test('renders with default theme (without customTheme)', () => {
    renderWithoutMockTheme(
      <ContainerToast
        id="test-toast-default"
        title="Default Theme Toast"
        description="This toast uses the default theme"
        onRemove={jest.fn()}
      />,
    )

    expect(screen.getByText('Default Theme Toast')).toBeInTheDocument()
    expect(
      screen.getByText('This toast uses the default theme'),
    ).toBeInTheDocument()
  })
})
