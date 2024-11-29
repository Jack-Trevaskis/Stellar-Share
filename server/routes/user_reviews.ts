import { Router } from 'express'

import * as db from '../db/user_reviews'

const router = Router()

// /api/v1/user_reviews/id'
router.delete('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    await db.deleteUserReview(id)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    } else {
      console.error('Unknown error')
    }
    res.sendStatus(500)
  }
})
export default router
