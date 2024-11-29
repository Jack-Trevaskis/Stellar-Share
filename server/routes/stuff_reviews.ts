import express from 'express'
import knex from 'knex'
import * as db from '../db/stuff_reviews'

const router = express.Router()


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

router.post('/', async (req, res) => {

    try {
        const newReview = await db.createStuffReview(req.body)
        res.status(201).json({
            message: 'New Stuff Review created',
            ...newReview
          });

    } catch (error) {

        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Failed to create record' })
    }
})

export default router

