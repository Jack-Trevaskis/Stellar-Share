export interface UserReviewsData {
  reviewerId: string
  userId: string
  description: string
  reviewScore: string
}

export interface UserReviews extends UserReviewsData{
  id: number
}