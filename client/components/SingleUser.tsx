import { useParams } from 'react-router-dom'
import { getUserInfoById } from '../apis/users'
import { useQuery } from '@tanstack/react-query'
import UserReviewsByUser from './UserReviewsByUser'
import ReviewsOnUser from './ReviewsOnUser'
import StuffReviewsByUser from './StuffReviewsByUser'
import ReviewsOnUserStuff from './ReviewsOnUserStuff'
import UserStuff from './UserStuff'
import AddUserReviewForm from './AddUserReviewForm'
import { IfAuthenticated } from './Authenticated'
import { useUser } from '../hooks/useUser'
import { useReviewStats } from '../hooks/useReviewStats'

const customHideEmail = (email: string | undefined) => {
  if (!email || !email.includes('@')) return 'N/A'
  const [local, domain] = email.split('@')
  return `${'*'.repeat(local.length)}@${domain}`
}



export function SingleUser() {
  const { userId } = useParams()
  const userFromHook = useUser()


  //---mean rating---- toDo: create models for stats
  const { data,
    // statsPending, isStatsError, statsError
  } = useReviewStats()
  interface UserReviewStat {
    user_id: string
    recieved_avg_user_rating: number
  }
  const userRatingData = data?.userReceived.find((stat:UserReviewStat) => stat.user_id === userId)
  const meanRating = userRatingData ? userRatingData.recieved_avg_user_rating.toFixed(1) :null


  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const users = await getUserInfoById(Number(userId))
      return users
    },
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading user</div>

  // Check if this is the page of the currently logged in user and stop them from leaving a review on themself
  let myPage = false
  if(!userFromHook.data){
    console.log('Could not get info on currently logged in user')
  }else{
    if(userFromHook.data.id == userId){
      myPage = true
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-center my-4">{user?.name}</h1>
      <div className="flex flex-col items-center">
        <img
          src={user?.picture}
          alt="user avatar"
          className="rounded-full w-24 h-24 aspect-square object-cover"
        />
      </div>
      <h2 className="text-x1 font-bold text-center"> {meanRating}{Array(Math.round(meanRating)).fill('⭐').join('')}</h2>
      <div className="flex flex-col items-center">
      <p className="text-x2 font-bold text-center mb-4">{customHideEmail(user?.email)} </p>
      </div>
      

      {/* USER STUFF LISTINGS */}

      <h2 className="text-2xl font-semibold mb-4 text-center">User Listings</h2>
      <div className="w-full">
        <UserStuff />
      </div>

      {/* USER REVIEWS */}

      <h2 className="text-2xl font-semibold mb-4 text-center">User Reviews</h2>
      <div className="flex flex-row gap-4 w-full">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Received</h2>
          <ReviewsOnUser />
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Given</h2>
          <UserReviewsByUser />
        </div>
      </div>

      {/* STUFF REVIEWS  */}

      <h2 className="text-2xl font-semibold mb-4 text-center">Stuff Reviews</h2>
      <div className="flex flex-row gap-4 w-full">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Received</h2>
          <ReviewsOnUserStuff />
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">Given</h2>
          <StuffReviewsByUser />
        </div>
      </div>

      {/* ADD A REVIEW FOR THIS USER */}
      
      {!myPage && <IfAuthenticated>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a review for this user
        </h2>
        <div className="w-full">
          <AddUserReviewForm />
        </div>
      </IfAuthenticated>}

    </div>
  )
}
