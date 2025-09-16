import axios from 'axios'

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'KVA/2025' // custom header pocinje sa X
    },
    validateStatus: (status: number) => {
        return status === 200
        // Samo ako je 200 vrati response
        // U ostalim slucajevima baci izuzetak
    }
})


export class MovieService{
    
    static async getMovies(){
        return client.request({
            url: '/movie',
            method: 'GET',
        })
    }

    static async getMoviesByShortUrl(url: string) {
        return client.get(`/movie/short/${url}`)
    }

    static async getMoviesRuntimeUnique(){
        return client.get(`/movie/runtime`)
    }

    static async getMovieGenres() {
        return client.get(`/genre`)
    }

    static async getMovieActors() {
        return client.get(`/actor`)
    }

    static async getMovieGenresById(id: number) {
        return client.get(`/genre/${id}`)
    }

    static async getMoviesById(id: number) {
        return client.get(`/movie/${id}`)
    }
}