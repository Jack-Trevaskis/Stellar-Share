import connection from './connection.ts'
import { Stuff } from '../../models/stuff.ts'

// All stuff DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }

export async function getStuffById(stuffId: number): Promise<Stuff> {
  return connection('stuff').where({'id': stuffId}).first()
}
