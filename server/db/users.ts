import { UserData, User } from '../../models/user.ts'
import connection from './connection.ts'

// All user DB functions go here

export async function getUserByAuth0Sub(auth0Id: string): Promise<UserData> {
  return connection('users')
    .select(
      'name', 
      'email'
    )
    .where('auth0Id', auth0Id)
    .first()
}

export async function addUser(newUser: User): Promise<UserData[]> {
  return connection('preferences')
    .insert(newUser)
    .returning(['name', 'email'])
}
