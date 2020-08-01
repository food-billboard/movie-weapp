export default interface formData {
  _id?: string
  video: {
    poster: string
    src: string
  }
  info: {
    name: string
    district: Array<string>
    director: Array<string>
    actor: Array<string>
    classify: Array<string>
    screen_time: string | number
    description: string
    language: Array<string>
    author_rate?: number
    alias?: Array<string>
    author_description?: string
  }
  images: Array<string>
}