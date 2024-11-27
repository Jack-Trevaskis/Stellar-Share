export interface UserReviewsData {
  reviewerId: number
  userId: number
  description: string
  reviewScore: string
}

export interface UserReviews extends UserReviewsData{
  id: number
}