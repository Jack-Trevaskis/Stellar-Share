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
      "image_url": stuffData.imageUrl, 
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
  const allStuff = await connection('stuff').select(
    'id',
    'name',
    'description',
    'owner_id as ownerId',
    'price',
    'image_url as imageUrl',
    'bond',
    'condition',
  )
  return allStuff as Stuff[]
}

// delete by id
export async function deleteStuffById(id: number) {
  const delStuff = await connection('stuff').where('id', id).delete()
  return delStuff as number
}


export async function updateStuff(item:Partial<Stuff>): Promise<Stuff | null> {
  if (item.id === undefined) {
     throw new Error('Item ID is required') }
  const updatedCount = await connection('stuff')
    .where('id', item.id)
    .update({
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: item.imageUrl,
      bond: item.bond,
      condition: item.condition
    })
  if (!updatedCount) {
    throw new Error(`Failed to update item with ID ${item.id}`)
  }
  return await getStuffById(item.id);
}