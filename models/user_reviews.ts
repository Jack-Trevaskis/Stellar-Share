export interface UserReviewData {
  reviewerId: number
  userId: number
  description: string
  rating: number
}

export interface UserReview {
  id: number
  userID: string
  reviewerName: string
  reviewerId: number
  description: string
  rating: number
}

export type UserReviews = UserReview[]

