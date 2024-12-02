import request from 'superagent'
import { UserReviews } from '../../models/user_reviews'

const rootURL = new URL('/api/v1', document.baseURI).toString()


export async function getAllReviewsOnUser(userID: number): Promise<UserReviews>  {
    const response = await request.get(`${rootURL}/user_reviews/${userID}`)
    
    return response.body as UserReviews
  }
  