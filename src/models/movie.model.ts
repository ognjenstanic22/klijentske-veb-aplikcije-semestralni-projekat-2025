import { DirectorModel } from "./director.model"
import { MovieActorsModel } from "./movieActors.model"
import { MovieGenreModel } from "./movieGenre.model"

export interface MovieModel {
    movieId: number
    internalId: string
    corporateId: string
    directorId: number
    title: string
    originalTitle: string
    description: string
    shortDescription: string
    poster: string
    startDate: string
    shortUrl: string
    runTime: number
    active: boolean
    createdAt: string
    updatedAt: null | string
    director: DirectorModel
    movieActors: MovieActorsModel[]
    movieGenres: MovieGenreModel[]
    price: null | number
}
