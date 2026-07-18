import movieRepository from '../repositories/movieRepository.js';

async function getAll(searchedParams={}) {
    return await movieRepository.getAllMovies(searchedParams);
}

async function findById(id) {
    id=Number(id);
    return await movieRepository.findMovie(id);
}

async function create(movie) {
    movie.rating = Number(movie.rating);
    movie.year = Number(movie.year);
    await movieRepository.createMovie(movie);
}

async function createArtist(artist) {
    artist.age = Number(artist.age);
    await movieRepository.createArtist(artist);
}

async function getAllArtists(){
    const artists=await movieRepository.getAllArtists();
    return artists;
}

async function attachArtist(movieId, name) {
    movieId=Number(movieId);
    await movieRepository.attachArtist(movieId, name)
}

async function artistsInMovie(movieId) {
    movieId=Number(movieId);
    const artists=await movieRepository.artistsInMovie(movieId);
    return artists;
}

const movieService = {
    getAll,
    findById,
    create,
    createArtist,
    getAllArtists,
    attachArtist,
    artistsInMovie
};

export default movieService;