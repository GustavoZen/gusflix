import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

const imageUrl = 'https://image.tmdb.org/t/p/original/'
const api_key = '60d1a175b89d11e90614a3ffbe5c97ff'

export {api as default, api_key, imageUrl};