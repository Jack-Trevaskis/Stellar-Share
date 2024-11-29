import connection from './connection.ts'
import { StuffReviewsData } from '../../models/stuff_reviews.ts'

// All stuff review DB functions go here

export async function createStuffReview(data: StuffReviewsData) {
    try {
      console.log(data)
      const [newStuffReviewId] = await connection('stuff_review').insert(data).returning('id');
      return { id: newStuffReviewId, ...data };
    } catch (error) {
      console.error("Error creating record:")
      throw error;
    }
  }

export async function deleteThingReview(id: number) {
  const delThing = await connection('stuff_reviews').where('id', id).delete()
  return delThing as number
}

