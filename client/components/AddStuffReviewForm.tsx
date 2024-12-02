import React, { useState } from 'react'
import { useCreateStuffReview } from '../hooks/useStuffReviews'
import { StuffReviewData } from '../../models/stuff_reviews'
import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

function AddStuffReviewForm() {
  const { mutate: createDaily, isPending, isError } = useCreateStuffReview()
  const { stuffId } = useParams()
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

    // This should exist, just doing this to make typescript happy
    if(!userFromHook.data){
      return <>Failed to fetch currently logged in user data</>
    }

    const submitData = {
      ...form,
      reviewerId: Number(userFromHook.data.id),
      stuffId: Number(stuffId),
    }
    createDaily(submitData as StuffReviewData) // Trigger the mutation
    console.log(submitData)
  }

  const handleCancel = () => {}

  return (
    <form onSubmit={handleSubmit}>
      <h1>Review</h1>
      <div>
        <label htmlFor="description">Add a comment</label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="Add a comment..."
          value={form.description}
          onChange={handleChange}
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
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddStuffReviewForm
