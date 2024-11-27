export interface UsersData {
  auth0Sub: string
  name: string
  email: string
}

export interface Users extends UsersData {
  id: number
}