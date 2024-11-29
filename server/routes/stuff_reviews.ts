import { Router } from 'express'

import * as db from '../db/stuff_reviews'

const router = Router()

router.delete('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    await db.deleteThingReview(id)
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
