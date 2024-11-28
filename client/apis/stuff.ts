import request from 'superagent'

const rootUrl = '/api/v1'

import { StuffWithOwnerName, Stuff, StuffData } from '../../models/stuff'

// FRONT END API STUFF FUNCTIONS GO HERE

// export function getFruits(): Promise<string[]> {
//   return request.get(rootUrl + '/fruits').then((res) => {
//     return res.body.fruits
//   })
// }


export async function addStuff(stuffData: StuffData): Promise<Stuff> {
  const res = await request.patch(rootUrl + '/stuff').send(stuffData)
  return res.body as Stuff
}

export async function getStuffById(stuffId: number): Promise<StuffWithOwnerName> {
  const res = await request.get(rootUrl + '/stuff/' + stuffId)
  return res.body as StuffWithOwnerName

}


export async function getAllStuff() {
  const response = await request.get('/api/v1/stuff')

  return response.body as Stuff[]
}