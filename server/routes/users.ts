import { Router } from 'express'
import * as db from '../db/users.ts'

const router = Router()

// Routes for users go here

router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    // console.log("Fetched users from DB:", users);
    res.json(users)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Could not get users!')
      res.sendStatus(500)
    }
  }
})

export default router
