import movieRepository from '../repositories/movieRepository.js';

async function getAll(searchedParams={}) {
    return await movieRepository.getAllMovies(searchedParams);
}

async function findById(id) {
    return await movieRepository.findMovie(id);
}

async function create(movie) {
    movie.rating = Number(movie.rating);
    await movieRepository.createMovie(movie);
}

const movieService = {
    getAll,
    findById,
    create
};

export default movieService;