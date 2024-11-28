import { useAuth0 } from '@auth0/auth0-react'

const useIsAuthenticated = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  return isLoading ? null : isAuthenticated
}

interface Props {
  children: React.ReactNode
}

export function IfAuthenticated(props: Props): React.ReactNode {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <>{props.children}</>
  }

  return null
}

export function IfNotAuthenticated(props: Props): React.ReactNode {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <>{props.children}</>
  }

  return null
}
