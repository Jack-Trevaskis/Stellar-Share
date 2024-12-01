import request from 'superagent'
import { UserReviews } from '../../models/user_reviews'

const rootURL = new URL('/api/v1', document.baseURI).toString()


export async function getAllReviewsOnUser(userAuth0Sub: string): Promise<UserReviews>  {
    const response = await request.get(`${rootURL}/user_reviews/${userAuth0Sub}`)
    
    return response.body as UserReviews
  }
  