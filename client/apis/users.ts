import request from 'superagent'
import { User, UserData } from '../../models/user'
import { UserReviewWithNames } from '../../models/user_reviews'
import { StuffReviewWithNames } from '../../models/stuff_reviews'
import { Stuff } from '../../models/stuff'

const rootUrl = '/api/v1'
// PUBLIC

export async function getAllUserInfo(): Promise<UserData[] | null> {
  const res = await request.get(`${rootUrl}/users/all`)
  return res.body as UserData[]
}

export async function getUserInfoById(
  userId: number,
): Promise<UserData | null> {
  const res = await request.get(`${rootUrl}/users/${userId}`)
  return res.body as UserData
}

export async function getAllUserStuff(userId: number): Promise<Stuff[]> {
  const res = await request.get(`${rootUrl}/users/${userId}/stuff`)
  return res.body as Stuff[]
}

export async function getAllUserReviewsMadeByUser(
  userId: number,
): Promise<UserReviewWithNames[] | null> {
  const res = await request.get(`${rootUrl}/users/user_reviews/${userId}`)
  return res.body as UserReviewWithNames[]
}

export async function getAllStuffReviewsMadeByUser(
  userId: number,
): Promise<StuffReviewWithNames[] | null> {
  const res = await request.get(`${rootUrl}/users/stuff_reviews/${userId}`)
  return res.body as StuffReviewWithNames[]
}

// PROTECTED

interface GetUserFunction {
  token: string
}

export async function getUser({
  token,
}: GetUserFunction): Promise<UserData | null> {
  return await request
    .get(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.user ? res.body.user : null))
    .catch((err) => console.log(err))
}

interface AddUserFunction {
  newUser: UserData
  token: string
}

export async function addUser({
  newUser,
  token,
}: AddUserFunction): Promise<User> {
  return request
    .post(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body)
    .catch((err) => console.log(err))
}

// OTHER FUNCTIONS NOT IN USE RIGHT NOW

// export async function getUserById(auth0Sub: string): Promise<User> {
//   const result = await request.get(`/api/v1/users/${auth0Sub}`)
//   return result.body as User
// }

// export async function getUserByEmail(email: string): Promise<User> {
//   const result = await request.get(`/api/v1/users/email/${email}`)
//   return result.body as User
// }

// export async function updateUser(
//   id: string,
//   updatedUser: Partial<User>,
// ): Promise<User | null> {
//   const updated = await request.patch(rootUrl + '/users').send(updatedUser)
//   if (updated) {
//     return getUserById(id)
//   }
//   return null
// }

// export async function deleteUser(auth0Sub: string): Promise<boolean> {
//   const deleted = await request.delete(`/api/v1/users/${auth0Sub}`)
//   return deleted.ok
// }
