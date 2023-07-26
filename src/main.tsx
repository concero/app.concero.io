import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/fonts/Poppins/typography.css'
import './styles/index.css'
import { PostHogProvider } from 'posthog-js/react'
import App from './App'

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)
