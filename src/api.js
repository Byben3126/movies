import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/'; // Remplacez par l'URL de votre API

const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: '07cb8e4e76353ce143c6c0aeb5282f2f',
  },
});


export const discoverMovies = async (page = 1, genreId = null, query = null) => {
  try {
    let response;

    if (query) {
      // Rechercher des films par nom
      response = await api.get('search/movie', {
        params: {
          query: query,
          page: page,
        },
      });
    } else {
      // Filtrer les films par genre et/ou page
      const params = { page };

      if (genreId) {
        params.with_genres = genreId;
      }

      response = await api.get('discover/movie', { params });
    }
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la découverte ou de la recherche des films:', error);
  }
};

export const getGenres = async () => {
  try {
    let response;
   
    response = await api.get('genre/movie/list', {
      params: {},
    });
   
    return response.data.genres;
  } catch (error) {
    console.error('Erreur lors de la découverte ou de la recherche des films:', error);
  }
};

export const getMovieDetails = async (id) => {
  try {
    let response;
   
    response = await api.get(`movie/${id}`, {
      params: {},
    });
   
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la découverte ou de la recherche des films:', error);
  }
}

export const getMovieReviews = async (id) => {
  try {
    let response;
   
    response = await api.get(`movie/${id}/reviews`, {
      params: {},
    });
   
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la découverte ou de la recherche des films:', error);
  }
}

export default api;