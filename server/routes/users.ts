import { Router } from 'express'
import * as db from '../db/users.ts'
import checkJwt from '../auth0.ts'
import { JwtRequest } from '../auth0.js'


const router = Router()

// PUBLIC ROUTES

router.get('/all', async (req, res) => {
  try {
    const users = await db.getAllUserInfo()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

// PROTECTED ROUTES

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Sub = req.auth?.sub
    const user = await db.getUserByAuth0Sub(String(auth0Sub))

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


export default router