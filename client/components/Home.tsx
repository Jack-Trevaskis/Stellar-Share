import { Link } from "react-router-dom"

function Home() {

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4">Welcome to Stellar Share</h1>
      <p className="text-lg text-center mb-6">The best place in the Milky-Way Galaxy to rent/borrow your astro gear</p>
      <div className="flex flex-col items-center space-y-4"> 
        <Link to="/stuff" className="text-blue-500 hover:underline">Find astro equipment here</Link>
        <Link to="/users" className="text-blue-500 hover:underline">See all our good (and not-so-good) space-cadets here</Link>
      </div>
    </>
  )
}

export default Home
