import { Router } from 'express'

import * as db from '../db/stuff.ts'
import { StuffWithOwnerName } from '../../models/stuff.ts'

const router = Router()

// Routes for stuff goes here

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