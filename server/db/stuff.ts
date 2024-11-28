import connection from './connection.ts'
import { Stuff, StuffData } from '../../models/stuff.ts'

// All stuff DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }

export async function addStuff(stuffData: StuffData): Promise<Stuff> {
  return await connection('stuff').insert(
    {
      "title": stuffData.title,
      "name": stuffData.name,
      "description": stuffData.description, 
      "owner_id": stuffData.ownerId, 
      "price": stuffData.price, 
      "imageUrl": stuffData.imageURL, 
      "bond": stuffData.bond, 
      "condition": stuffData.condition
    }, ['*']
  ) as Stuff
}