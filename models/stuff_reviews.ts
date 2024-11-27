export interface StuffReviewsData {
  reviewerId: number
  stuffId: number
  description: string
  reviewScore: number
}

export interface StuffReviews extends StuffReviewsData {
  id: number
}

