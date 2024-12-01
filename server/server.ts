import express from 'express'
import * as Path from 'node:path'

import userRoutes from './routes/users.ts'
import stuffRoutes from './routes/stuff.ts'
import userReviewRoutes from './routes/user_reviews.ts'
import stuffReviewRoutes from './routes/stuff_reviews.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/stuff', stuffRoutes)
server.use('/api/v1/stuff_reviews', stuffReviewRoutes)
server.use('/api/v1/user_reviews', userReviewRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
