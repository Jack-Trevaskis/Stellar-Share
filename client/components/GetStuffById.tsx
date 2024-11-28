import React from 'react'
import { useStuffById } from '../hooks/useStuff'

export function StuffId(id: number) {
  const { isPending, isError, data } = useStuffById(id)

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error Loading Stuff</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data}</p>
    </div>
  )
}
