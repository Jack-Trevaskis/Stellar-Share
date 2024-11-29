import connection from './connection.ts'
import { UserReviewsData } from '../../models/user_reviews.ts'

// All user review DB functions go here

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }
export async function addUserReview(review: UserReviewsData) {
  const addReview = await connection('user_reviews').insert({
    description: review.description,
    rating: review.rating,
    userAuth0Sub: review.userAuth0Sub,
    reviewerAuth0Sub: review.reviewerAuth0Sub,
  })
  return addReview as number[]
}

export async function deleteUserReview(id: number) {
  const delUserReview = await connection('user_reviews')
    .where('id', id)
    .delete()
  return delUserReview as number
}
