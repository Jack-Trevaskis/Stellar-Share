import { Link } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'

function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4">
        Welcome to Stellar Share
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <img src="/images/Homepage/TrolleGuy.png" alt="Trolley" />
      </div>

      <p className="text-lg text-end mb-6">
        Here at Stellar Share, we pride ourselves on delivering the finest
        products throughout the galaxy. But we don`t stop there—our innovative
        marketplace also allows you to rent and share items with other users
        from across the stars! Whether you are looking for cutting-edge tech,
        rare minerals, or artisanal goods, Stellar Share connects you to the
        galaxy`s best. Need a tool, ship upgrade, or exotic commodity for a
        short-term project? Rent it directly from other users in our secure
        system.
        <br />
        <span className="font-bold">Your needs! </span>
        <span className="font-bold">Your way!</span> <br />
        At Stellar Share, we are not just about trade—we are about building a
        connected galaxy, one exchange at a time. Use, trade, rent, and
        explore—all with the freedom to shape your journey, your way.
      </p>

      <div className="flex flex-col items-center space-y-4">
        <Link to="/stuff" className="button bg-white hover:underline">
          Find astro equipment here
        </Link>
        <Link to="/users" className="button text-blue-500 hover:underline">
          See all our good (and not-so-good) space-cadets here
        </Link>
        <IfAuthenticated>
          <Link to="/addStuff" className="text-blue-500 hover:underline">
            Add your own items here
          </Link>
        </IfAuthenticated>
      </div>
    </>
  )
}

export default Home
