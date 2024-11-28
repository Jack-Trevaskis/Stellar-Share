import connection from './connection.ts'

import { StuffWithOwnerName, Stuff, StuffData } from '../../models/stuff.ts'

// All stuff DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }


export async function addStuff(stuffData: StuffData): Promise<Stuff> {
  return await connection('stuff').insert(
    {
      "name": stuffData.name,
      "description": stuffData.description, 
      "owner_auth0_sub": stuffData.ownerAuth0Sub, 
      "price": stuffData.price, 
      "image_url": stuffData.imageURL, 
      "bond": stuffData.bond, 
      "condition": stuffData.condition
    }, ['*']
  ) as Stuff
}

export async function getStuffById(stuffId: number): Promise<StuffWithOwnerName> {
  return connection('stuff').leftJoin('users', 'users.auth0_sub', 'stuff.owner_auth0_sub').where({'stuff.id': stuffId})
  .select(
    'stuff.id as id', 
    'stuff.name as name', 
    'stuff.description as description', 
    'stuff.owner_auth0_sub as ownerAuth0Sub', 
    'stuff.price as price', 
    'stuff.image_url as imageUrl', 
    'stuff.bond as bond', 
    'stuff.condition as condition', 
    'users.name as ownerName'
  ).first()
}

export async function getAllStuff() {
  const allStuff = await connection('stuff').select()
  return allStuff as Stuff[]
}