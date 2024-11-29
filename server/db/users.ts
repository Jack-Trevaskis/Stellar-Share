import { UserData, User } from '../../models/user.ts'
import connection from './connection.ts'

// PUBLIC ROUTES

export async function getAllUserInfo(): Promise<User[]> {
  return connection('users').select(
    'id', 
    'name'
  )
}

// PROTECTED ROUTES

export async function getUserByAuth0Sub(auth0Sub: string): Promise<UserData> {
  return connection('users')
    .select(
      'name', 
      'email'
    )
    .where('auth0_sub', auth0Sub)
    .first()
}

export async function addUser(newUser: User): Promise<UserData[]> {
  return connection('users')
    .insert({
      'auth0_sub': newUser.auth0Sub, 
      'name': newUser.name,
      'email': newUser.email,
      'picture': newUser.picture
    }
    )
    .returning(['name', 'email'])
}
