import connection from './connection.ts'
import { StuffReviews } from '../../models/stuff_reviews.ts'

// All stuff review DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }
export async function deleteThingReview(id: number) {
  const delThing = await connection('stuff_reviews').where('id', id).delete()
  return delThing as number
}
