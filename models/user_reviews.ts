export interface UserReviewsData {
  userId: number
  rating: number
  reviewBody: string
}

export interface UserReviews extends UserReviewsData{
  id: number
}