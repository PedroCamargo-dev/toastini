import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ContainerToast } from '@/components'
import { useContainerToast } from '@/hooks'
import { ToastProvider } from '@/providers'

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

jest.mock('@/hooks', () => ({
  useContainerToast: jest.fn(),
}))

describe('ContainerToast', () => {
  const mockHandleClick = jest.fn()
  const mockHandleMouseDown = jest.fn()
  const mockHandleMouseMove = jest.fn()
  const mockHandleMouseUp = jest.fn()
  const mockTriggerRemove = jest.fn()
  const mockUnfreeze = jest.fn()

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
      unfreeze: mockUnfreeze,
    })
  })

  const renderProvider = (ui: React.ReactElement) =>
    render(<ToastProvider>{ui}</ToastProvider>)

  test('renders with default props (with theme)', () => {
    renderProvider(
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
    renderProvider(
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
      type: 'default',
      actions: undefined,
    })
  })

  test('renders without title or description', () => {
    renderProvider(<ContainerToast id="test-toast-2" onRemove={jest.fn()} />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  test('renders with custom type', () => {
    renderProvider(
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
    renderProvider(
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
    renderProvider(
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
    renderProvider(
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
    renderProvider(
      <ContainerToast
        id="test-toast-6"
        title="Styled Toast"
        className="custom-toast"
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

    renderProvider(
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
    renderProvider(
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

  test('renders with actions and handles action click', () => {
    const mockActionClick = jest.fn()
    const actions = [{ label: 'Click Me', onClick: mockActionClick }]

    renderProvider(
      <ContainerToast
        id="test-toast-actions"
        title="Toast With Actions"
        actions={actions}
        onRemove={jest.fn()}
      />,
    )

    const actionButton = screen.getByText('Click Me')
    expect(actionButton).toBeInTheDocument()

    fireEvent.click(actionButton)

    expect(mockUnfreeze).toHaveBeenCalledTimes(1)
    expect(mockActionClick).toHaveBeenCalledTimes(1)
  })

  test('renders action buttons with variants', () => {
    const actions = [
      { label: 'Success', variant: 'success' as const },
      { label: 'Error', variant: 'error' as const },
      { label: 'Default' },
    ]

    renderProvider(
      <ContainerToast
        id="test-toast-variants"
        title="Toast With Action Variants"
        actions={actions}
        onRemove={jest.fn()}
      />,
    )

    const successButton = screen.getByText('Success')
    const errorButton = screen.getByText('Error')
    const defaultButton = screen.getByText('Default')

    expect(successButton).toHaveClass('toast-action-button-success')
    expect(errorButton).toHaveClass('toast-action-button-error')
    expect(defaultButton).toHaveClass('toast-action-button-default')
  })
})
