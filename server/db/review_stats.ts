import connection from './connection.ts'
  export async function userReviewStats() {
    return await connection('user_reviews')
  .select('reviewer_id')
  .count('* as review_count')
  .avg('rating as given_avg_user_rating')
  .groupBy('reviewer_id');
  }

  export async function stuffReviewStats() {
    return await connection('stuff_reviews')
  .select('reviewer_id')
  .count('* as review_count')
  .avg('rating as given_avg_stuff_rating')
  .groupBy('reviewer_id');
  }

  export async function stuffAverageReview() {
    return await connection('stuff_reviews')
  .select('stuff_id')
  .avg('rating as recieved_avg_stuff_rating')
  .groupBy('stuff_id')
  }

  export async function userAverageReview() {
    return await connection('user_reviews')
  .select('user_id')
  .avg('rating as recieved_avg_user_rating')
  .groupBy('user_id')
  }

console.log({ userReviewStats, stuffReviewStats, stuffAverageReview, userAverageReview });