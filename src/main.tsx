import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/router/pages/App'
import './styles/index.css'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
