import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import Router from './routes'
import ThemeProvider from "./theme/index"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router/>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
