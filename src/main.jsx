// StrictMode is a development-only tool from React.
// It helps me catch potential problems like unsafe lifecycles,
// accidental side effects, and deprecated APIs.
// It does NOT affect production builds.
import { StrictMode } from 'react'

// createRoot is the modern React 18 way of mounting an app.
// It replaces the old ReactDOM.render() approach.
import { createRoot } from 'react-dom/client'

// This imports my global CSS styles.
// Anything in index.css applies app-wide.
import './index.css'

// This is my main application component.
// Everything in my UI ultimately starts here.
import App from './App.jsx'

// Here I’m grabbing the <div id="root"></div> from index.html.
// React needs one real DOM node to attach itself to.
createRoot(document.getElementById('root')).render(

  // StrictMode wraps my entire app in development.
  // It intentionally double-invokes certain lifecycle logic
  // so I can detect side effects early.
  <StrictMode>

    {/* App is the root component.
        This is where my UI, state, routing,
        and pipeline connections actually live. */}
    <App />

  </StrictMode>,
)
