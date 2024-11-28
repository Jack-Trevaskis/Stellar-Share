import express from 'express'

import * as db from '../db/stuff.ts'

import { StuffWithOwnerName } from '../../models/stuff.ts'

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


router.get('/:stuffId', async (req, res) => {
  try {
    const { stuffId } = req.params
    const stuff: StuffWithOwnerName = await db.getStuffById(Number(stuffId))
    res.json(stuff)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router

