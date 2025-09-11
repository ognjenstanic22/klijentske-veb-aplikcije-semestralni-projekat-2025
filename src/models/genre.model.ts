export interface GenreModel {
    movieGenreId: number
    movieId: number
    genreId: number
    genre: {
        genreId: number
        name: string
        createdAt: string
    }
}

