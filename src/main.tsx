import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/scss/main.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <div className='page'> */}
      <App />
    {/* </div> */}
  </StrictMode>,
)
