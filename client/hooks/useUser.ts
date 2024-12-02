import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from '../apis/users.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useUser() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return API.getUser({ token })
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddUser(),
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return mutation
}

export function useAddUser() {
  return useUserMutation(API.addUser)
}
