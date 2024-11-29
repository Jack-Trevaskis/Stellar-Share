import { Router } from 'express'

import * as db from '../db/user_reviews.ts'

const router = Router()

// /api/v1/user_reviews/'       add user review
router.post('/', async (req, res) => {
  try {
    const newReview = req.body
    const id = await db.addUserReview(newReview)
    res.json({ ...newReview, id: id[0] })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Unknown error')
    }
    res.sendStatus(500)
  }
})

export default router

// GET /api/v1/user_reviews
router.get('/', async (req, res) => {
    try {
      const reviews = await db.getAllUserReviews()
      res.status(200).json(reviews)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Cannot get user reviews' })
    }
  })
  
  //GET /api/v1/user_reviews/:auth0Sub
  router.get('/:auth0Sub', async (req, res) => {
    const userAuth0Sub = req.params.auth0Sub
    try {
        const reviews = await db.getAllReviewsOnUser(userAuth0Sub)
        if (!reviews) {
        return res.status(404).json({ message: `Cannot find user with Auth0id: ${userAuth0Sub}`})
        }
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error: Unable to access user data.' })
    }
    })

// /api/v1/user_reviews/:id
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