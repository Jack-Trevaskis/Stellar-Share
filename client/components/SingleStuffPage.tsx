import { useParams } from "react-router-dom"
import { getStuffById } from "../apis/stuff"
import { useQuery } from "@tanstack/react-query"

function SingleStuffPage() {

  const { stuffId } = useParams()

  const { data: stuff, error, isPending } = useQuery({queryKey: ['stuff'], queryFn: () => getStuffById(Number(stuffId))})

  if (isPending) {
    return <p>Is loading...</p>
  }

  if (error) {
    return <p>Error.. {error.message}</p>
  }

  console.log(SingleStuffPage)

  return (
    <div className="single-stuff-page">
      <ul>
        <li>Name: {stuff.name}</li>
        <li>Description: {stuff.description}</li>
        <li>Price: {stuff.price}</li>
      </ul>
    </div>
  )
}

export default SingleStuffPage
