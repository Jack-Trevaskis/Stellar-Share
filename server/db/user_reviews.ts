import connection from './connection.ts'
import { UserReviews } from '../../models/user_reviews.ts'

// All user review DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }

export async function deleteUserReview(id: number) {
  const delUserReview = await connection('user_reviews')
    .where('id', id)
    .delete()
  return delUserReview as number
}
