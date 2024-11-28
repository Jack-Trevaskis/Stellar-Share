import connection from './connection.ts'
import { Stuff } from '../../models/stuff.ts'

// All stuff DB functions go here

export async function getAllStuff() {
  const allStuff = await connection('stuff').select()
  return allStuff as Stuff[]
}

// delete by id
export async function deleteStuffById(id: number) {
  const delStuff = await connection('stuff').where('id', id).delete()
  return delStuff as number
}
