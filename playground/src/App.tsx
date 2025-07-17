import { useState, useEffect } from 'react'
import { ContainerToasts, toast } from 'toastini'
import type { ToastPosition, ToastType } from 'toastini'
import './App.css'

const initialOptions = {
  title: 'Event has been created',
  description: 'Monday, January 1st at 12:00 PM',
  position: 'top-right' as ToastPosition,
  type: 'success' as ToastType,
  duration: 5000,
  closeButton: true,
  closeOnClick: true,
  showProgressBar: true,
  draggable: true,
  className: '',
  style: '{}',
}

const CodeSnippet = ({ options }: { options: typeof initialOptions }) => {
  const { type, title, description, style, ...rest } = options

  const highlight = (jsonString: string) => {
    if (!jsonString) return ''
    return jsonString
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*)?)/g, (match) => {
        let cls = 'token-string'
        if (/:$/.test(match)) {
          cls = 'token-key'
        }
        return `<span class="${cls}">${match}</span>`
      })
      .replace(/\b(true|false)\b/g, '<span class="token-boolean">$1</span>')
      .replace(/\b\d+\b/g, '<span class="token-number">$1</span>')
  }

  let styleObject = {}
  try {
    styleObject = JSON.parse(style || '{}')
  } catch {
    //
  }

  const allOptions = { description, ...rest, style: styleObject }

  const optionsToDisplay = Object.fromEntries(
    Object.entries(allOptions).filter(([, value]) => {
      if (typeof value === 'boolean' && value === false) return false
      if (typeof value === 'string' && value === '') return false
      if (JSON.stringify(value) === '{}') return false
      return true
    }),
  )

  const optionsString = JSON.stringify(optionsToDisplay, null, 2)
  const highlightedOptions = highlight(optionsString)

  const methodName = type === 'default' ? 'show' : type
  const isShowMethod = type === 'default'

  let highlightedCode = ''

  if (isShowMethod) {
    const showOptions = { title, ...optionsToDisplay }
    const showOptionsString = JSON.stringify(showOptions, null, 2)
    highlightedCode = `
<span class="token-variable">toast</span><span class="token-punctuation">.</span><span class="token-function">show</span><span class="token-punctuation">(${highlight(showOptionsString)}</span><span class="token-punctuation">);</span>`
  } else {
    highlightedCode = `
<span class="token-variable">toast</span><span class="token-punctuation">.</span><span class="token-function">${methodName}</span><span class="token-punctuation">(</span><span class="token-string">'${title}'</span><span class="token-punctuation">,</span> ${
      highlightedOptions.length > 2
        ? `
${highlightedOptions}`
        : ''
    }
<span class="token-punctuation">);</span>`
  }

  return (
    <div className="code-snippet-container">
      <div className="code-snippet-header">
        <span>bash</span>
        <button className="copy-btn">Copy</button>
      </div>
      <pre
        className="code-snippet"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [activeTab, setActiveTab] = useState('home')
  const [options, setOptions] = useState(initialOptions)
  const [styleError, setStyleError] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleOptionChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    const isNumber = type === 'number'

    if (name === 'style') {
      try {
        JSON.parse(value)
        setStyleError('')
      } catch {
        setStyleError('Invalid JSON format.')
      }
    }

    setOptions((prev) => ({
      ...prev,
      [name]: isCheckbox
        ? (e.target as HTMLInputElement).checked
        : isNumber
          ? Number(value)
          : value,
    }))
  }

  const showCustomToast = () => {
    const { type, title, description, className, style, ...rest } = options
    let styleObject = {}
    try {
      styleObject = JSON.parse(style || '{}')
    } catch {
      toast.error('The custom style has invalid JSON.', {
        description: "Please correct the style object in the 'Customize' tab.",
      })
      return
    }

    const toastOptions = {
      description,
      className: className || undefined,
      style: styleObject,
      ...rest,
    }

    const toastMethod = toast[type]

    if (typeof toastMethod === 'function') {
      if (type === 'default') {
        toast.show({ title, ...toastOptions })
      } else {
        toastMethod(title, toastOptions)
      }
    }
  }

  return (
    <div className="playground-container">
      <ContainerToasts />
      <header className="header">
        <h1>Toastini Playground</h1>
        <p>A simple and opinionated toast component for React.</p>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>

      <main>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={`tab-button ${activeTab === 'customize' ? 'active' : ''}`}
            onClick={() => setActiveTab('customize')}
          >
            Customize
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'home' && (
            <div id="home" className="tab-pane active">
              <div className="home-section">
                <div className="home-section-header">
                  <h2>Live Preview</h2>
                  <p>
                    Use the &apos;Customize&apos; tab to build your toast, then
                    see it here.
                  </p>
                </div>
                <button className="button" onClick={showCustomToast}>
                  Show Toast
                </button>
              </div>
              <CodeSnippet options={options} />
            </div>
          )}

          {activeTab === 'customize' && (
            <div id="customize" className="tab-pane active">
              <h2>Toast Options</h2>
              <form className="customize-form">
                {/* Text Inputs */}
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={options.title}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={options.description}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="className">Custom ClassName</label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    value={options.className}
                    onChange={handleOptionChange}
                  />
                </div>

                {/* Selects */}
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={options.type}
                    onChange={handleOptionChange}
                  >
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="default">Default (Show)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <select
                    id="position"
                    name="position"
                    value={options.position}
                    onChange={handleOptionChange}
                  >
                    <option value="top-right">Top Right</option>
                    <option value="top-center">Top Center</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>

                {/* Number Input */}
                <div className="form-group">
                  <label htmlFor="duration">Duration (ms)</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={options.duration}
                    onChange={handleOptionChange}
                    step="500"
                  />
                </div>

                {/* Text Area for Style */}
                <div className="form-group full-width">
                  <label htmlFor="style">Custom Style (JSON format)</label>
                  <textarea
                    id="style"
                    name="style"
                    value={options.style}
                    onChange={handleOptionChange}
                    rows={5}
                    className={styleError ? 'input-error' : ''}
                  />
                  {styleError && (
                    <small className="error-message">{styleError}</small>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="checkbox-grid">
                  <div className="form-group-checkbox">
                    <input
                      type="checkbox"
                      id="closeButton"
                      name="closeButton"
                      checked={options.closeButton}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="closeButton">Close Button</label>
                  </div>
                  <div className="form-group-checkbox">
                    <input
                      type="checkbox"
                      id="closeOnClick"
                      name="closeOnClick"
                      checked={options.closeOnClick}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="closeOnClick">Close on Click</label>
                  </div>
                  <div className="form-group-checkbox">
                    <input
                      type="checkbox"
                      id="showProgressBar"
                      name="showProgressBar"
                      checked={options.showProgressBar}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="showProgressBar">Progress Bar</label>
                  </div>
                  <div className="form-group-checkbox">
                    <input
                      type="checkbox"
                      id="draggable"
                      name="draggable"
                      checked={options.draggable}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="draggable">Draggable</label>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
