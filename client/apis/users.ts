import request from 'superagent'
import { User, UserData } from '../../models/user'

const rootUrl = '/api/v1'

interface GetUserFunction {
  token: string
}

export async function getAllUserInfo(): Promise<User[] | null> {
  const res =  await request.get(`${rootUrl}/users/all`) 
  return res.body as User[]
}

export async function getUser({
  token,
}: GetUserFunction): Promise<User | null> {
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
