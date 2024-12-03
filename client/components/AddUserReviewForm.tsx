import React, { useState } from 'react'
import { useCreateUserReview } from '../hooks/useUserReviews'
import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { UserReviewData } from '../../models/user_reviews'

function AddUserReviewForm() {
  const { mutate: createDaily, isPending, isError } = useCreateUserReview()
  const { userId } = useParams()
  const userFromHook = useUser()
  const [form, setForm] = useState({
    description: '',
    rating: 0,
  })

  if (isPending === true) {
    return <div>Loading...</div>
  }

  if (isError === true) {
    return <div>Error loading page...</div>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleRating = (rating: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      rating,
    }))
    console.log(form)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(form.rating == 0){
      alert('You must select a rating!')
      return
    }

    // This should exist, just doing this to make typescript happy
    if(!userFromHook.data){
      return <>Failed to fetch currently logged in user data</>
    }

    const submitData = {
      ...form,
      reviewerId: Number(userFromHook.data.id),
      userId: Number(userId),
    }
    createDaily(submitData as UserReviewData) // Trigger the mutation
    console.log(submitData)
  }

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "16px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      margin: "10px"
    }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Add a comment: </label>
          <br />
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="text-input"
            style={{
              border: "1px solid blue",
              borderRadius: "5px",
              width: "100%"
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '5px', margin: '10px 0' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleRating(star)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: star <= form.rating ? '#FFD700' : '#ccc', // Yellow for selected, grey otherwise
              }}
            >
              ★
            </button>
          ))}
        </div>
        <div>
          <button className="button" type="submit">Add Review</button>
        </div>
      </form>
    </div>
  )
}

export default AddUserReviewForm
