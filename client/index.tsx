import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'

import router from './router.tsx'

const queryClient = new QueryClient()
const root = createRoot(document.getElementById('app') as HTMLElement)

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Auth0Provider
      domain="mania-chc-24-daniel.au.auth0.com"
      clientId="jF4daF0zuwiJKvVe07bZmGdUkZrntP0X"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://stuff/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
      ,
    </Auth0Provider>,
  )
})
