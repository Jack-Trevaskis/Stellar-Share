import db from './connection.ts'
import { StuffReviewWithNames } from '../../models/stuff_reviews.ts'
import { StuffReviewData } from '../../models/stuff_reviews.ts'

// All stuff review DB functions go here

export async function getReviewsByStuffId(stuffId: number): Promise<StuffReviewWithNames[]> {
  // console.log('db fn hit')
  return await db('stuff_reviews')
    .join('stuff', 'stuff_reviews.stuff_id', 'stuff.id')
    .join('users as reviewers', 'stuff_reviews.reviewer_id', 'reviewers.id')
    .where('stuff_reviews.stuff_id', stuffId)
    .select(
      'stuff_reviews.id as id',
      'stuff.id as stuffId',
      'stuff.name as stuffName',
      'reviewer_id as reviewerId',
      'reviewers.name as reviewerName',
      'stuff_reviews.description as description',
      'stuff_reviews.rating as rating',
    )
}

export async function getAllReviewsOnUserStuff(userId: number): Promise<StuffReviewWithNames[]> {
  return db('stuff_reviews')
    .leftJoin('stuff', 'stuff_reviews.stuff_id', 'stuff.id')
    .leftJoin('users as owners', 'stuff.owner_id', 'owners.id')
    .leftJoin('users as reviewers', 'stuff_reviews.reviewer_id', 'reviewers.id')
    .where('owners.id', userId)
    .select(
      'stuff_reviews.id as id', 
      'stuff.id as stuffId',
      'stuff.name as stuffName',
      'reviewers.id as reviewerId', 
      'reviewers.name as reviewerName',
      'owners.id as ownerId',
      'owners.name as ownerName',
      'stuff_reviews.description as description', 
      'stuff_reviews.rating as rating'
    );
}

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }
// import connection from './connection.ts'

// All stuff review DB functions go here

export async function createStuffReview(data: StuffReviewData) {
  try {
    console.log(data)
    const [newStuffReviewId] = await db('stuff_reviews')
      .insert({
        reviewer_id: data.reviewerId,
        stuff_id: data.stuffId,
        description: data.description,
        rating: data.rating,
      })
      .returning('id')
    return { id: newStuffReviewId, ...data }
  } catch (error) {
    console.error('Error creating record:')
    throw error
    try {
      console.log(data)
      const [newStuffReviewId] = await db('stuff_review')
        .insert(data)
        .returning('id')
      return { id: newStuffReviewId, ...data }
    } catch (error) {
      console.error('Error creating record:')
      throw error
    }
  }
}

export async function deleteThingReview(id: number) {
  const delThing = await db('stuff_reviews').where('id', id).delete()
  return delThing as number
}
