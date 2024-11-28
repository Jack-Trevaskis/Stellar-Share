import connection from './connection.ts'
import { Stuff } from '../../models/stuff.ts'

// All stuff DB functions go here

export async function getAllStuff() {
  const allStuff = await connection('stuff').select()
  return allStuff as Stuff[]
}
export async function getStuffById(id: number) {
  const result = await connection('stuff')
    .where('id', id)
    .select(
      'name',
      'description',
      'owner_auth0_sub as ownerAuth0Sub',
      'price',
      'image_url as imageURL',
      'bond',
      'condition',
      'id',
    )

  return result as Stuff[]
}
