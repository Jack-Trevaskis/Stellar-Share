import { Users } from "../../models/users"
import { useAuth0 } from "@auth0/auth0-react"
import { addStuff } from "../apis/stuff"
import { ChangeEvent, FormEvent, useState } from "react"

function AddStuffForm() {

  const [formState, setFormState] = useState({
    title: '',
    name: '',
    description: '',
    ownerId: '',
    price: 0,
    imageURL: '',
    bond: 0,
    condition: ''
  })

  // const { user, isAuthenticated } = useAuth0()
  const user: Users = {
    id: 0,
    auth0Sub: 'placeholder_sub',
    name: 'placeholder_name',
    email: 'placeholder@gmail.com'
  }

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    if(isNaN(Number(formState.price))){
      alert('Price must be a number')
      return
    }
    if(isNaN(Number(formState.bond))){
      alert('Bond must be a number')
      return
    }
    addStuff({
      title: formState.title,
      name: formState.name, 
      description: formState.description, 
      ownerId: user.auth0Sub, 
      price: formState.price, 
      imageURL: formState.imageURL, 
      bond: formState.bond, 
      condition: formState.condition
    })
  }

  return (
    <div className="add-stuff-form">
      <form onSubmit={handleSubmit}>
        Title: <input id="title" name="title" value={formState.title} onChange={handleChange} />
        <br />
        Name: <input id="name" name="name" value={formState.name} onChange={handleChange} />
        <br />
        Description: <input id="description" name="description" value={formState.description} onChange={handleChange} />
        <br />
        Price: <input id="price" name="price" value={formState.price} onChange={handleChange} />
        <br />
        ImageURL: <input id="imageURL" name="imageURL" value={formState.imageURL} onChange={handleChange} />
        <br />
        Bond: <input id="bond" name="bond" value={formState.bond} onChange={handleChange} />
        <br />
        Condition: <input id="condition" name="condition" value={formState.condition} onChange={handleChange} />
        <br />

        <button type="submit">Add Stuff</button>
      </form>
    </div>
  )
}

export default AddStuffForm