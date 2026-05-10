import { StrictMode } from 'react'
// import {Provider} from "react-redux"
// import { store } from "./storertk"
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <App />
  </StrictMode>,
)