import db from './connection.ts'
import { StuffReviews } from '../../models/stuff_reviews.ts'
import { StuffReviewsData } from '../../models/stuff_reviews.ts'


// All stuff review DB functions go here

export async function getStuffReview(stuffId: number): Promise<StuffReviews[]> {
  // console.log('db fn hit')
  return await db('stuff_reviews')
    .join('stuff', 'stuff_reviews.stuff_id', 'stuff.id')
    .join('users', 'stuff_reviews.reviewer_auth0_sub', 'users.auth0_sub')
    .where('stuff_reviews.stuff_id', stuffId)
    .select(
      'stuff_reviews.id',
      'users.name',
      'reviewer_auth0_sub as reviewerAuth0Sub',
      'stuff_id as stuffId',
      'stuff_reviews.description',
      'stuff_reviews.rating',
    )
    
}

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }
// import connection from './connection.ts'

// All stuff review DB functions go here

export async function createStuffReview(data: StuffReviewsData) {
    try {
      console.log(data)
      const [newStuffReviewId] = await db('stuff_review').insert(data).returning('id');
      return { id: newStuffReviewId, ...data };
    } catch (error) {
      console.error("Error creating record:")
      throw error;
    }
  }

export async function deleteThingReview(id: number) {
  const delThing = await db('stuff_reviews').where('id', id).delete()
  return delThing as number
}

