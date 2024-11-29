import { useParams } from "react-router-dom"
import { getStuffById } from "../apis/stuff"
import { useQuery } from "@tanstack/react-query"
import { useStuffById } from "../hooks/useStuff"

function SingleStuffPage() {

  const { stuffId } = useParams()

  const { data: stuff, error, isPending } = useStuffById(Number(stuffId))

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
        <li>Item listed by: {stuff.ownerName}</li>
        <li>Name: {stuff.name}</li>
        <li>Description: {stuff.description}</li>
        <li>Price: {stuff.price}</li>
        <li>Bond: {stuff.bond}</li>
        <li>Condition: {stuff.condition}</li>
      </ul>
      <img src={stuff.imageURL} alt="Stuff"></img>
    </div>
  )
}

export default SingleStuffPage
