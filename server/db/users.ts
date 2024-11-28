import db from './connection.ts'
import { User } from '../../models/user.ts'

// All user DB functions go here

export async function getAllUsers(): Promise<User[]> {
 const users = await db('users').select('*')
 return users
}
