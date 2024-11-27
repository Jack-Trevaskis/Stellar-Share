export interface UsersData {
  auth0Sub: string
  name: string
  email: string
  picture?: string
  nickname?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Users extends UsersData {
  id: number
}