import request from 'superagent'

import { Stuff } from '../../models/stuff'

export async function getAllStuff() {
  const response = await request.get('/api/v1/stuff')

  return response.body as Stuff[]
}

export async function getStuffById(id: number) {
  const result = await request.get(`/api/v1/stuff/${id}`)

  console.log(result)

  return result.body as Stuff
}
