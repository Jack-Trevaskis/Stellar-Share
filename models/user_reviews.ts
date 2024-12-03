export interface UserReviewData {
  reviewerId: number
  userId: number
  description: string
  rating: number
}

export interface UserReview {
  id: number
  userId: string
  reviewerId: number
  description: string
  rating: number
}

export interface UserReviewWithNames extends UserReview {
  reviewerName: string
  userName?: string
}

export type UserReviews = UserReview[]