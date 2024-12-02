export interface StuffReviewData {
  reviewerId: number
  stuffId: number
  description: string
  rating: number
}

export interface StuffReview extends StuffReviewData {
  id: number
}

export interface StuffReviewWithNames extends StuffReview {
  reviewerName: string
  stuffName: string
  ownerId: number
  ownerName: string
}

