export interface StuffReviewsData {
  reviewerId: number
  stuffId: number
  description: string
  rating: number
}

export interface StuffReviews extends StuffReviewsData {
  id: number
}

