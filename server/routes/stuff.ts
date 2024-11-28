import express from 'express'

import * as db from '../db/stuff.ts'

const router = express.Router()

// GET /api/v1/stuff
router.get('/', async (req, res) => {
  try {
    const allStuff = await db.getAllStuff()
    res.json(allStuff)
  } catch (err) {
    console.error('Error fetching stuff:', err)
    res.sendStatus(500)
  }
})

// GET /api/v1/stuff/:id
router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    const result = await db.getStuffById(id)
    res.json(result)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    } else {
      console.error('Unknown error')
    }
    res.sendStatus(500)
  }
})
// Delete /api/v1/stuff/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.deleteStuffById(Number(id))
    res.sendStatus(200)
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
