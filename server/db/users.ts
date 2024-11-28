import db from './connection.ts'
import { Users } from '../../models/users.ts'

// All user DB functions go here

export async function getAllUsers(): Promise<Users[]> {
 const users = await db('users').select(
  'id',
  'username',
  'auth0sub',
  'phone',
  'credits',
  'picture',
 )
 return users
}
