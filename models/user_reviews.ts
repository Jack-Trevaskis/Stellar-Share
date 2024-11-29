export interface UserReviewData {
  reviewerAuth0Sub: string
  userAuth0Sub: string
  description: string
  rating: number
}

export interface UserReview extends UserReviewData{
  id: number
}

export type UserReviews = UserReview[]