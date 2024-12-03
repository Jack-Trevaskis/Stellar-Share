import request from 'superagent'
import { UserReviewData, UserReviewWithNames } from '../../models/user_reviews'

const rootURL = new URL('/api/v1', document.baseURI).toString()


export async function getAllReviewsOnUser(userID: number): Promise<UserReviewWithNames[]>  {
    const response = await request.get(`${rootURL}/user_reviews/${userID}`)
    return response.body as UserReviewWithNames[]
}

export async function createUserReview(userReviewData: UserReviewData) {
  try {
    console.log(userReviewData)
    const response = await request
      .post('/api/v1/user_reviews/')
      .send(userReviewData)
    return response.body
  } catch (error) {
    console.error('Error creating daily record:')
    throw error
  }
}


