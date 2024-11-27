export interface StuffData {
  title: string
  description: string
  imageUrl: string
}

export interface Stuff extends StuffData{
  id: number
}