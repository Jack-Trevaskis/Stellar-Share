import db from './connection.ts'
import { User } from '../../models/user.ts'

// Get all users from the database (for admin dashboard)
export async function getAllUsers(): Promise<User[]> {
  const users = await db('users').select(
    'auth0_sub as auth0Sub',
    'name',
    'email',
    'picture',
  )
  return users
}

// Get user by their auth0_sub (unique identifier) from the database
export async function getUserById(id: string): Promise<User> {
  const user = await db('users')
    .select('auth0_sub as auth0Sub', 'name', 'email', 'picture')
    .where('auth0_sub', id)
    .first()
  return user
}

// Add new user to the database
export async function addUser(user: User): Promise<User> {
  await db('users').insert({
    auth0_sub: user.auth0Sub,
    name: user.name,
    email: user.email,
    picture: user.picture,
  })
  return getUserById(user.auth0Sub)
}

// Update user info in the database
export async function updateUser(
  id: string,
  updatedUser: Partial<User>,
): Promise<User | null> {
  const updated = await db('users').where('auth0_sub', id).update({
    auth0_sub: id,
    name: updatedUser.name,
    email: updatedUser.email,
    picture: updatedUser.picture,
  })
  if (updated) {
    return getUserById(id)
  }
  return null
}

// Delete user from the database by their auth0_sub (unique identifier)
export async function deleteUserById(id: string): Promise<void> {
  await db('users').where('auth0_sub', id).delete()
}
