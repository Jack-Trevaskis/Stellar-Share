import request from 'superagent'
import { StuffReviewsData } from '../../models/stuff_reviews';

// FRONT END API STUFF REVIEW FUNCTIONS GO HERE

export async function createStuffReview(StuffReviewData: StuffReviewsData) {

    try {
  
    const response = await request.post('/api/v1/stuff_reviews').send(StuffReviewData)
    return response.body
  
    } catch (error) {
    
      console.error('Error creating daily record:');
      throw error;
    }
  }