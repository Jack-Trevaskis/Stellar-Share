import { addStuff } from "../apis/stuff"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

function AddStuffForm() {

  const { user, isAuthenticated } = useAuth0()

  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/')
    }
  })

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    ownerAuth0Sub: '',
    price: 0,
    imageURL: '',
    bond: 0,
    condition: ''
  })

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    if(isNaN(Number(formState.price))){
      alert('Price must be a number')
      return
    }
    if(isNaN(Number(formState.bond))){
      alert('Bond must be a number')
      return
    }
    const newStuff = await addStuff({
      name: formState.name, 
      description: formState.description, 
      ownerAuth0Sub: user?.auth0Sub, 
      price: formState.price, 
      imageURL: formState.imageURL, 
      bond: formState.bond, 
      condition: formState.condition
    })
    
    alert('Added a new stuff thing!')

    navigate('/stuff/' + newStuff.id)
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