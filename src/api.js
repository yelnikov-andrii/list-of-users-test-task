const baseUrl = 'https://jsonplaceholder.typicode.com/';

export const getPosts = (userId) => {
  return fetch(`${baseUrl}users/${userId}/posts`)
    .then(response => {
      return response.json()
    })
};

export const getUsers = () => {
  return fetch(`${baseUrl}users`)
    .then(response => {
      return response.json()
    })
};

export const getAlbums = (userId) => {
  return fetch(`${baseUrl}users/${userId}/albums`)
    .then(response => {
      return response.json()
    })
};