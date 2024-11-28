import { Router } from 'express'

import * as db from '../db/stuff.ts'
import { Stuff, StuffData } from '../../models/stuff.ts'

const router = Router()

// Routes for stuff goes here

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