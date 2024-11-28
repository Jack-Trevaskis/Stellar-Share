import connection from './connection.ts'
import { StuffWithOwnerName, Stuff } from '../../models/stuff.ts'

// All stuff DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }

export async function getStuffById(
  stuffId: number,
): Promise<StuffWithOwnerName> {
  return connection('stuff')
    .leftJoin('users', 'users.auth0_sub', 'stuff.owner_auth0_sub')
    .where({ 'stuff.id': stuffId })
    .select(
      'stuff.id as id',
      'stuff.name as name',
      'stuff.description as description',
      'stuff.owner_auth0_sub as ownerAuth0Sub',
      'stuff.price as price',
      'stuff.image_url as imageUrl',
      'stuff.bond as bond',
      'stuff.condition as condition',
      'users.name as ownerName',
    )
    .first()
}

export async function getAllStuff() {
  const allStuff = await connection('stuff').select()
  return allStuff as Stuff[]
}

// delete by id
export async function deleteStuffById(id: number) {
  const delStuff = await connection('stuff').where('id', id).delete()
  return delStuff as number
}
