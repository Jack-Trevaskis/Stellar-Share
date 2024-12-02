import { UserData, User } from '../../models/user.ts'
import connection from './connection.ts'

// PUBLIC ROUTES

export async function getAllUserInfo(): Promise<UserData[]> {
  return connection('users').select(
    'id', 
    'name',
    'email',
    'picture'
  )
}

export async function getUserInfoById(id: number): Promise<User> {
  return connection('users').where('id', id).select(
    'id', 
    'name',
    'email',
    'picture'
  ).first() 
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

// OTHER FUNCTIONS NOT IN USE YET

// Update user info in the database
// export async function updateUser(
//   id: string,
//   updatedUser: Partial<User>,
// ): Promise<User | null> {
//   const updated = await connection('users').where('auth0_sub', id).update({
//     auth0_sub: id,
//     name: updatedUser.name,
//     email: updatedUser.email,
//     picture: updatedUser.picture,
//   })
//   if (updated) {
//     return getUserByAuth0Sub(id)
//   }
//   return null
// }

// Delete user from the database by their auth0_sub (unique identifier)
// export async function deleteUserById(id: string): Promise<void> {
//   await connection('users').where('auth0_sub', id).delete()
// }
