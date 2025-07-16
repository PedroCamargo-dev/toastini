import { useState, useEffect } from 'react'
import { ContainerToasts, toast } from 'toastini'
import './App.css'

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{
      fill: 'var(--github-icon-color, #24292f)',
      transition: 'fill 0.2s',
    }}
  >
    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
  </svg>
)

const ThemeToggle = ({
  theme,
  setTheme,
}: {
  theme: string
  setTheme: (theme: string) => void
}) => (
  <button
    className="theme-toggle"
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  >
    Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
  </button>
)

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const showPromiseResolve = () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve({ name: 'User' }), 2000),
    )
    toast.promise(promise, {
      loading: 'Fetching user...',
      success: (data) => `Welcome back, ${(data as { name: string }).name}!`,
      error: 'Failed to fetch user.',
    })
  }

  const showPromiseReject = () => {
    const promise = new Promise((_, reject) =>
      setTimeout(() => reject('Server Error 500'), 2000),
    )
    toast.promise(promise, {
      loading: 'Processing payment...',
      success: {
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      },
      error: (err) => `Payment failed: ${err}`,
    })
  }

  const showActionToast = () => {
    let toastId = ''
    toastId = toast.show({
      title: 'File moved to trash',
      description: 'You can restore it from the trash folder.',
      actions: [
        {
          label: 'Undo',
          onClick: () => {
            toast.success('File restored successfully!')
          },
          variant: 'warning',
        },
        {
          label: 'Close',
          onClick: () => toast.remove(toastId),
        },
      ],
    })
  }

  return (
    <div className="playground-container">
      <ContainerToasts />
      <header className="header">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <h1>Toastini</h1>
        <p>A simple and opinionated toast component for React.</p>
        <a
          href="https://github.com/PedroCamargo-dev/toastini"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <GithubIcon />
          <span>GitHub</span>
        </a>
      </header>

      <main className="toast-sections">
        <section className="toast-section">
          <h2>Types</h2>
          <div className="button-grid">
            <button
              className="button"
              onClick={() =>
                toast.success('Sucesso', {
                  description: 'Event has been created.',
                })
              }
            >
              Success
            </button>
            <button
              className="button"
              onClick={() =>
                toast.error('Error', {
                  description: 'Could not update your profile.',
                })
              }
            >
              Error
            </button>
            <button
              className="button"
              onClick={() =>
                toast.info('Info', {
                  description: 'A new software update is available.',
                })
              }
            >
              Info
            </button>
            <button
              className="button"
              onClick={() =>
                toast.warning('Warning', {
                  description: 'Your session is about to expire.',
                })
              }
            >
              Warning
            </button>
          </div>
        </section>

        <section className="toast-section">
          <h2>Promise</h2>
          <div className="button-grid">
            <button className="button" onClick={showPromiseResolve}>
              Promise Resolve
            </button>
            <button className="button" onClick={showPromiseReject}>
              Promise Reject
            </button>
          </div>
        </section>

        <section className="toast-section">
          <h2>Actions & Custom</h2>
          <div className="button-grid">
            <button className="button" onClick={showActionToast}>
              With Actions
            </button>
            <button
              className="button"
              onClick={() =>
                toast.show({
                  title: 'Custom Styled Toast',
                  description: 'This toast has a custom gradient background.',
                  position: 'top-left',
                  style: {
                    background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
                    color: '#fff',
                    border: 'none',
                  },
                })
              }
            >
              Custom Style
            </button>
          </div>
        </section>
      </main>

      <footer className="installation-section">
        <h2>Installation</h2>
        <pre>
          <code>npm install toastini</code>
        </pre>
      </footer>
    </div>
  )
}

export default App
