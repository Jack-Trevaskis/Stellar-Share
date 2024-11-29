import connection from './connection.ts'
import { StuffReviews } from '../../models/stuff_reviews.ts'

// All stuff review DB functions go here


export async function createStuffReview(data: StuffReviews) {
    try {
      console.log(data)
      const [newStuffReviewId] = await connection('daily').insert(data).returning('review_id');
      return { id: newDailyId, ...data };
    } catch (error) {
      console.error("Error creating record:")
      throw error;
    }
  }
