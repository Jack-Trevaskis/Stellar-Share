export interface StuffData {
  title: string
  name: string
  description: string
  ownerId: string
  price: number
  imageURL?: string
  bond?: number
  condition?: string
}

export interface Stuff extends StuffData{
  id: number
}