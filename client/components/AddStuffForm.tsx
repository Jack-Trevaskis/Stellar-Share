import { addStuff } from '../apis/stuff'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useAuth0 } from '@auth0/auth0-react'

function AddStuffForm() {
  const userFromHook = useUser()

  const { isAuthenticated } = useAuth0()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  })

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    ownerId: '',
    price: 0,
    imageURL: '',
    bond: 0,
    condition: '',
  })

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    if (isNaN(Number(formState.price))) {
      alert('Price must be a number')
      return
    }
    if (isNaN(Number(formState.bond))) {
      alert('Bond must be a number')
      return
    }

    // These will always exist at this point, just doing this so typescript is happy
    if (!userFromHook.data) {
      return
    }
    if (!userFromHook.data.id) {
      return
    }

    const newStuff = await addStuff({
      name: formState.name,
      description: formState.description,
      ownerId: userFromHook.data.id,
      price: formState.price,
      imageUrl: formState.imageURL,
      bond: formState.bond,
      condition: formState.condition,
    })

    alert('Added a new stuff thing!')

    navigate('/stuff/' + newStuff.id)
  }

  return (
    <div className="add-stuff-form-container">
      <form onSubmit={handleSubmit} className="add-stuff-form">
        Name:{' '}
        <input
          id="name"
          name="name"
          placeholder="item name"
          value={formState.name}
          onChange={handleChange}
        />
        <br />
        Description:{' '}
        <input
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
        <br />
        Price:{' '}
        <input
          id="price"
          name="price"
          value={formState.price}
          onChange={handleChange}
        />
        <br />
        ImageURL:{' '}
        <input
          id="imageURL"
          name="imageURL"
          value={formState.imageURL}
          onChange={handleChange}
        />
        <br />
        Bond:{' '}
        <input
          id="bond"
          name="bond"
          value={formState.bond}
          onChange={handleChange}
        />
        <br />
        Condition:{' '}
        <input
          id="condition"
          name="condition"
          value={formState.condition}
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="form-submit-button">
          Add Stuff
        </button>
      </form>
    </div>
  )
}

export default AddStuffForm
