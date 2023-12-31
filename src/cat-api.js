import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
const SEARCH = '/images/search';
const API_KEY = "live_Lz9WDGevkw0t245016RCIX5YUMv5hqO3i1fnW8DcH4wxPk7vOVLEkpYHFQJwBDtQ";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
    return axios(`${BASE_URL}${END_POINT}`);
}

export function fetchCatByBreed(breedId) {
    return axios(`${BASE_URL}${SEARCH}?breed_ids=${breedId}`);
}