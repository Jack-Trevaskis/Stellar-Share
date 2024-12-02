import connection from './connection.ts'

import { StuffWithOwnerName, Stuff, StuffData } from '../../models/stuff.ts'

// All stuff DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }


export async function addStuff(stuffData: StuffData): Promise<Stuff> {
  const res =  await connection('stuff').insert(
    {
      "name": stuffData.name,
      "description": stuffData.description, 
      "owner_id": stuffData.ownerId, 
      "price": stuffData.price, 
      "image_url": stuffData.imageURL, 
      "bond": stuffData.bond, 
      "condition": stuffData.condition
    }, ['*']
  )

  return res[0] as Stuff
}

export async function getStuffById(
  stuffId: number,
): Promise<StuffWithOwnerName> {
  return connection('stuff')
    .leftJoin('users', 'users.id', 'stuff.owner_id')
    .where({ 'stuff.id': stuffId })
    .select(
      'stuff.id as id',
      'stuff.name as name',
      'stuff.description as description',
      'stuff.owner_id as ownerId',
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
