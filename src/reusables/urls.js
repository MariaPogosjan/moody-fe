const BASE_URL = 'https://moody-bee.herokuapp.com'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const FEELING_URL = (id) => `${BASE_URL}/feelings/${id}`

export const PROFILE_IMAGE_URL= (id) => `${BASE_URL}/users/${id}/avatar`