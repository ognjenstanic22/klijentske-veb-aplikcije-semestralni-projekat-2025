import { DirectorModel } from "./director.model"
import { MovieActorsModel } from "./movieActors.model"
import { MovieGenreModel } from "./movieGenre.model"

export interface OrderModel {
    id: number
    shortUrl: string
    title: string
    shortDescription: string
    runTime: number
    movieGenres: MovieGenreModel[]
    director: DirectorModel
    movieActors: MovieActorsModel[]
    createdAt: string
    startDate: string
    count: number
    pricePerItem: number
    status: 'rezervisano' | 'gledano' | 'otkazano'
    rating: null | boolean
}