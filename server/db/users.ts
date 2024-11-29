import db from './connection.ts'
import { User } from '../../models/user.ts'

// All user DB functions go here

export async function getAllUsers(): Promise<User[]> {
  const users = await db('users').select(
    'auth0_sub as auth0Sub',
    'name',
    'email',
    'picture',
  )
  return users
}
