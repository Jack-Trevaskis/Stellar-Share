import { User } from "../../models/user"
import { addStuff } from "../apis/stuff"
import { ChangeEvent, FormEvent, useState } from "react"

function AddStuffForm() {

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    ownerAuth0Sub: '',
    price: 0,
    imageURL: '',
    bond: 0,
    condition: ''
  })

  // const { user, isAuthenticated } = useAuth0()

  // PLACE HOLDER USER, REPLACE WITH LINE ABOVE WHEN AUTH IS DONE
  const user: User = {
    auth0Sub: 'auth0|neo123456',
    name: 'NeoByte_42',
    email: 'neo42@example.com'
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
      name: formState.name, 
      description: formState.description, 
      ownerAuth0Sub: user.auth0Sub, 
      price: formState.price, 
      imageURL: formState.imageURL, 
      bond: formState.bond, 
      condition: formState.condition
    })
  }

  return (
    <div className="add-stuff-form">
      <form onSubmit={handleSubmit}>
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