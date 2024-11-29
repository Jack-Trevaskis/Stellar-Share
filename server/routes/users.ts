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

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const user = await db.getUserById(userId)
    if (!user) {
      return res.sendStatus(404)
    }
    // console.log("Fetched user from DB:", user);
    res.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Could not get user!')
      res.sendStatus(500)
    }
  }
})

// Update user info
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const updatedUser = await db.updateUser(userId, req.body)
    if (!updatedUser) {
      return res.sendStatus(404)
    }
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Could not update user!')
      res.sendStatus(500)
    }
  }
})

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    await db.deleteUserById(userId)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Could not delete user!')
      res.sendStatus(500)
    }
  }
})

export default router
