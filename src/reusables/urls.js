const BASE_URL = 'https://moody-be-77tqxxowdq-lz.a.run.app'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const FEELING_URL = (id) => `${BASE_URL}/feelings/${id}`

export const PROFILE_IMAGE_URL= (id) => `${BASE_URL}/users/${id}/avatar`

export const USERNAME_UPDATE_URL= (id) => `${BASE_URL}/users/${id}/username`

export const PASSWORD_UPDATE_URL= (id) => `${BASE_URL}/users/${id}/password`

export const FRIEND_PROFILE = (id) => `${BASE_URL}/users/${id}`

export const FRIEND_FEELING = (id) => `${BASE_URL}/friendfeeling/${id}`

export const THOUGHTS_URL = (page, perPage) => `${BASE_URL}/thoughts?page=${page}&size=${perPage}`

export const THOUGHT_HUG = (id) => `${BASE_URL}/thoughts/${id}/hug`

export const THOUGHT_COMMENT = (id) => `${BASE_URL}/thoughts/${id}/comment`


