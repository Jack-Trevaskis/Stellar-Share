import db from './connection.ts'
import { Users } from '../../models/users.ts'

// All user DB functions go here

export async function getAllUsers(): Promise<Users[]> {
  return await db('users').select()
}
