export interface UserReviewsData {
  reviewerAuth0Sub: string
  userAuth0Sub: string
  description: string
  rating: number
}

export interface UserReviews extends UserReviewsData{
  id: number
}