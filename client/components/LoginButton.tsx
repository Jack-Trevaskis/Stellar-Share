import { useAuth0 } from '@auth0/auth0-react'

export function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/register`,
      },
    })
  }

  return (
    <button className="button" onClick={handleSignIn}>
      Login
    </button>
  )
}
