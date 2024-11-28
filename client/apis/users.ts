import request from 'superagent'
import { Users } from '../../models/users'

const rootUrl = '/api/v1'

// FRONT END API USER FUNCTIONS GO HERE

export async function getUsers(){
const result = await request.get('/api/v1/users')
return result.body as Users[]
}
