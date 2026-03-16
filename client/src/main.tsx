import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// import browser router dari react-router
import { BrowserRouter } from 'react-router'

// import query client dan query client provider dari react-query/tanstack query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import auth provider untuk konteks autentikasi
import { AuthProvider } from './context/AuthContext.tsx'

// init queryclient
const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryclient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
