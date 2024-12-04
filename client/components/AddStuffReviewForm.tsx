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

    if (form.rating == 0) {
      alert('You must select a rating!')
      return
    }

    // This should exist, just doing this to make typescript happy
    if (!userFromHook.data) {
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

  return (
    <div className="add-user-review-form-container">
      <form onSubmit={handleSubmit} className="add-user-review-form">
        <div className="from-group">
          <label htmlFor="description" className="form-label">
            Add a comment:{' '}
          </label>
          <br />
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="text-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating" className="form-label">
            Rating:
          </label>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleRating(star)}
                className="rating-star"
                style={{
                  color: star <= form.rating ? '#FFD700' : '#ccc', // Yellow for selected, grey otherwise
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <button className="form-submit-button" type="submit">
            Add Review
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddStuffReviewForm
