import request from 'superagent'
import { User } from '../../models/user'

const rootUrl = '/api/v1'

// FRONT END API USER FUNCTIONS GO HERE

export async function getUsers() {
  const result = await request.get('/api/v1/users')
  return result.body as User[]
}

export async function getUserById(auth0Sub: string): Promise<User> {
  const result = await request.get(`/api/v1/users/${auth0Sub}`)
  return result.body as User
}

export async function getUserByEmail(email: string): Promise<User> {
  const result = await request.get(`/api/v1/users/email/${email}`)
  return result.body as User
}

export async function updateUser(
  id: string,
  updatedUser: Partial<User>,
): Promise<User | null> {
  const updated = await request.patch(rootUrl + '/users').send(updatedUser)
  if (updated) {
    return getUserById(id)
  }
  return null
}

export async function deleteUser(auth0Sub: string): Promise<boolean> {
  const deleted = await request.delete(`/api/v1/users/${auth0Sub}`)
  return deleted.ok
}
