import React, { useState } from 'react'
import { useCreateStuffReview } from '../hooks/useStuffReviews'
import { StuffReviewsData } from '../../models/stuff_reviews'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

function AddStuffReviewForm() {
  const { mutate: createDaily, isPending, isError } = useCreateStuffReview()
  const { stuffId } = useParams()
  const { user } = useAuth0()
  const [form, setForm] = useState({
    reviewerAuth0Sub: '',
    stuffId: 0,
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
    const submitData = {
      ...form,
      reviewerAuth0Sub: user?.sub,
      stuffId: Number(stuffId as string),
    }
    createDaily(submitData as StuffReviewsData) // Trigger the mutation
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
