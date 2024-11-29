import { Router } from 'express'
import * as db from '../db/users.ts'
import checkJwt from '../auth0.ts'
import { JwtRequest } from '../auth0.js'


const router = Router()

// Routes for users go here

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Sub = req.auth?.sub
    const user = await db.getUserByAuth0Sub(auth0Sub as string)

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newUser = req.body
    const auth0Id = req.auth?.sub
    const [user] = await db.addUser({
      ...newUser,
      auth0Id,
    })

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})


export default router