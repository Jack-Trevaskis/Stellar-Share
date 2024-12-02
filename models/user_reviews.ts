export interface UserReviewData {
  reviewerId: number
  userId: number
  description: string
  rating: number
}

export interface UserReview extends UserReviewData{
  id: number
}

export type UserReviews = UserReview[]