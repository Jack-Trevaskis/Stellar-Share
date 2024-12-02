import request from 'superagent'

import { StuffReviewsData } from '../../models/stuff_reviews'

import { StuffReviews } from '../../models/stuff_reviews'

const rootUrl = '/api/v1/stuff_reviews'

// FRONT END API STUFF REVIEW FUNCTIONS GO HERE

export async function fetchStuffReviews(stuffId: number) {
  const result = await request.get(`${rootUrl}/${stuffId}/reviews`)
  console.log('fetched reviews', result.body)

  return result.body as StuffReviews[]
}

// FRONT END API STUFF REVIEW FUNCTIONS GO HERE

export async function createStuffReview(stuffReviewData: StuffReviewsData) {
  try {
    console.log(stuffReviewData)
    const response = await request
      .post('/api/v1/stuff_reviews/')
      .send(stuffReviewData)
    return response.body
  } catch (error) {
    console.error('Error creating daily record:')
    throw error
  }
}
