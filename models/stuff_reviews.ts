export interface StuffReviewsData {
  reviewerId: string
  stuffId: number
  description: string
  reviewScore: number
}

export interface StuffReviews extends StuffReviewsData {
  id: number
}

