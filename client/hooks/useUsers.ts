import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/users'

export function useUserById(userAuth0Sub: string | undefined) {
  const query = useQuery({
    enabled: Boolean(userAuth0Sub),
    queryKey: ['user', userAuth0Sub],
    queryFn: () => API.getUserById(userAuth0Sub!),
  })
  return query
}

export function useAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await API.getUsers()
      // console.log('Fetched users:', users)
      return users
    },
  })
}
