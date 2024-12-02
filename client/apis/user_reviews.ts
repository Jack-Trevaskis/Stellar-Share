import request from 'superagent'
import { UserReviewWithNames } from '../../models/user_reviews'

const rootURL = new URL('/api/v1', document.baseURI).toString()


export async function getAllReviewsOnUser(userID: number): Promise<UserReviewWithNames[]>  {
    const response = await request.get(`${rootURL}/user_reviews/${userID}`)
    return response.body as UserReviewWithNames[]
}
