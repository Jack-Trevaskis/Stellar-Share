import connection from './connection.ts'
import { UserReview, UserReviewData, UserReviewWithNames } from '../../models/user_reviews.ts'


export async function getAllUserReviews(): Promise<UserReview> {
  //not really a useful function, but I'll add it anyway - for science!
  return await connection('user_reviews').select(
    'id',
    'reviewer_id' as 'reviewerId',
    'user_id' as 'userId',
    'description',
    'rating',
  )
}

//this is the main function to be used on the front-end - get all the reviews for a specific user
export async function getAllReviewsOnUser(
  userId: number,
): Promise<UserReviewWithNames> {
  return await connection('user_reviews as ur')
    .join('users as reviewers', 'ur.reviewer_id', 'reviewers.id')
    .where('user_id', userId)
    .select(
      'ur.id',
      'user_id as userId',
      'reviewers.name as reviewerName',
      'reviewers.id as reviewerId',
      'description',
      'rating',
    )
}


//ToDo: add a function that gets all reviews that a user has written

export async function addUserReview(review: UserReviewData) {
  const addReview = await connection('user_reviews').insert({
    description: review.description,
    rating: review.rating,
    'user_id': review.userId,
    'reviewer_id': review.reviewerId,
  })
  return addReview as number[]
}

export async function deleteUserReview(id: number) {
  const delUserReview = await connection('user_reviews')
    .where('id', id)
    .delete()
  return delUserReview as number
}
