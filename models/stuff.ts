export interface StuffData {
  name: string
  description: string
  ownerAuth0Sub: string
  price: number
  imageURL?: string
  bond?: number
  condition?: string
}

export interface Stuff extends StuffData{
  id: number
}

export interface StuffWithOwnerName extends Stuff {
  ownerName: string
}