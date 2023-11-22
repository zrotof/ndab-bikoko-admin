export interface Rubric {
  id : number,
  name: string,
  description ?: string,
  isActive: Boolean,
  order ?: number,
  userId ?: number
}