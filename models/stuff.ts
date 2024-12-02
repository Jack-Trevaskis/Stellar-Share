export interface StuffData {
  name: string
  description: string
  ownerId: number
  price: number
  imageUrl?: string
  bond?: number
  condition?: string
}

export interface Stuff extends StuffData{
  id: number
}

export interface StuffWithOwnerName extends Stuff {
  ownerName: string
}