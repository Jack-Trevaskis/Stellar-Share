import { useReviewStats } from '../hooks/useReviewStats';

export function ReviewStats() {
  const { data, isPending, isError, error } = useReviewStats();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  console.log("data: ", data)

  return (
    <div>
        {/* <p>{data.stuffGiven}</p>
        <p>{data.userGiven}</p>
        <p>{data.stuffReceived}</p>
        <p>{data.stuffGiven}</p> */}
    </div>
  )}