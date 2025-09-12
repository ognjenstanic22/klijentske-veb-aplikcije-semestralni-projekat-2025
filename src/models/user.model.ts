export interface UserModel {
    email: string
    password: string
    orders: {
        shortUrl: string
        title: number
        description: string
        runTime: number
        movieGenres: {
            movieGenreId: number
            movieId: number
            genreId: number
            genre: {
                genreId: number
                name: string
                createdAt: string
            }
        }
        director: {
            directorId: number
            name: string
            createdAt: string
        }
        movieActors: {
            movieActorId: number
            movieId: number
            actorId: number
            actor: {
                actorId: number
                name: string
                createdAt: string
            }
        }
        createdAt: string
        startDate: string
        count: number
        pricePerItem: string
        status: 'rezervisano' | 'gledano' | 'otkazano'
        rating: null | boolean
    }[]
}