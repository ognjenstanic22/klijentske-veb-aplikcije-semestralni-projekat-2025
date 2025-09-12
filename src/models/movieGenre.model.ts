import { GenreModel } from "./genre.model"

export interface MovieGenreModel {
    movieGenreId: number
    movieId: number
    genreId: number
    genre: GenreModel
}

