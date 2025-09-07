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
    
    static async getMovies(page: number = 0, size: number = 10){
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page': page,
                'size': size,
            }
        })
    }

    static async getMoviesById(id: number) {
        return client.get(`/movie/${id}`)
    }
}