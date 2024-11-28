import express from 'express'

import * as db from '../db/stuff.ts'

import { Stuff, StuffData, StuffWithOwnerName } from '../../models/stuff.ts'

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
    const result: StuffWithOwnerName  = await db.getStuffById(id)
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

router.patch('/', async (req, res) => {
  try{
    const stuffData: StuffData = req.body
    const newStuff: Stuff = await db.addStuff(stuffData)
    res.json(newStuff)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

export default router
