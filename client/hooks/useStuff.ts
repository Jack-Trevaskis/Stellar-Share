import { useQuery } from '@tanstack/react-query'
// import request from 'superagent'
import * as API from '../apis/stuff'

export function useAllStuff() {
  return useQuery({
    queryKey: ['stuff'],
    queryFn: async () => API.getAllStuff(),
  })
}

export function useStuffById(id: number) {
  return useQuery({
    queryKey: ['stuff'],
    queryFn: async () => API.getStuffById(id),
  })
}
