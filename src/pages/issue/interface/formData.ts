export default interface formData {
  id: false | string
  video: {
      src: string
      poster: string
      id: string
  } | false
  info: {
      name: string
      area: Array<string>
      director: Array<string>
      actor: Array<string>
      type: Array<string>
      time: string | number
      description: string
  } | false
  image: Array<IImageList>
}

interface IImageList {
  img: string,
  id: string
}