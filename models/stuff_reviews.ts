export interface StuffReviewsData {
  reviewerAuth0Sub: string
  stuffId: number
  description: string
  rating: number
}

export interface StuffReviews extends StuffReviewsData {
  id: number
}

