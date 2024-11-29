import express from 'express'
import knex from 'knex'
import * as db from '../db/stuff_reviews'

const router = express.Router()

// Routes for stuff reviews go here

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