import request from 'superagent'

const rootUrl = '/api/v1'

import { StuffData, Stuff } from '../../models/stuff'

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