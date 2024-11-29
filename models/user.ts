export interface UserData {
  name: string
  email: string
  picture?: string
}

export interface User extends UserData {
  auth0Sub: string
}