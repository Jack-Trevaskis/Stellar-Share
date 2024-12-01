import connection from './connection.ts'
import { UserReview, UserReviewData } from '../../models/user_reviews.ts'


export async function getAllUserReviews(): Promise<UserReview> {
  //not really a useful function, but I'll add it anyway - for science!
  return await connection('user_reviews').select(
    'id',
    'reviewer_auth0_sub' as 'reviewerAuth0Sub',
    'user_auth0_sub' as 'userAuth0Sub',
    'description',
    'rating',
  )
}

//this is the main function to be used on the front-end - get all the reviews for a specific user
export async function getAllReviewsOnUser(
  auth0Sub: string,
): Promise<UserReview> {
  return await connection('user_reviews')
    .where('user_auth0_sub', auth0Sub)
    .select(
      'id',
      'reviewer_auth0_sub' as 'reviewerAuth0Sub',
      'user_auth0_sub' as 'userAuth0Sub',
      'description',
      'rating',
    )
}

//ToDo: add a function that gets all reviews that a user has written

export async function addUserReview(review: UserReviewData) {
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
