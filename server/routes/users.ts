import { Router } from 'express'
import * as db from '../db/users.ts'
import checkJwt from '../auth0.ts'
import { JwtRequest } from '../auth0.js'
import { UserData } from '../../models/user.ts'
import { UserReviewWithNames } from '../../models/user_reviews.ts'
import { StuffReviewWithNames } from '../../models/stuff_reviews.ts'
import { Stuff } from '../../models/stuff.ts'


const router = Router()

// PUBLIC ROUTES

router.get('/all', async (req, res) => {
  try {
    const users: UserData[] = await db.getAllUserInfo()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    const user: UserData = await db.getUserInfoById(id)
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

router.get('/:userId/stuff', async (req, res) => {
  try {
    const userId = +req.params.userId
    const stuff: Stuff[] = await db.getAllUserStuff(userId)
    res.json(stuff)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

router.get('/user_reviews/:id', async (req, res) => {
  try {
    const id = +req.params.id
    const userReviews: UserReviewWithNames[] = await db.getAllUserReviewsMadeByUser(id)
    res.json(userReviews)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

router.get('/stuff_reviews/:id', async (req, res) => {
  try {
    const id = +req.params.id
    const stuffReviews: StuffReviewWithNames[] = await db.getAllStuffReviewsMadeByUser(id)
    res.json(stuffReviews)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

// PROTECTED ROUTES

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Sub = req.auth?.sub
    const user: UserData = await db.getUserByAuth0Sub(String(auth0Sub))

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newUser = req.body
    const auth0Sub = req.auth?.sub

    const [user] = await db.addUser({
      ...newUser,
      auth0Sub,
    })

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')

  }
})

// OTHER ROUTES NOT IN USE YET

// Update user info
// router.patch('/:id', async (req, res) => {
//   try {
//     const userId = req.params.id
//     const updatedUser = await db.updateUser(userId, req.body)
//     if (!updatedUser) {
//       return res.sendStatus(404)
//     }
//     res.json(updatedUser)
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Could not update user!')
//       res.sendStatus(500)
//     }
//   }
// })

// Delete user
// router.delete('/:id', async (req, res) => {
//   try {
//     const userId = req.params.id
//     await db.deleteUserById(userId)
//     res.sendStatus(204)
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Could not delete user!')
//       res.sendStatus(500)
//     }
//   }
// })

export default router
