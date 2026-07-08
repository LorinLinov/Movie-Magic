import fs from 'fs/promises';
import {v4 as uuid} from 'uuid';

async function getAllMovies(searchedParams={}) {
    const movies = await fs.readFile('./src/db.json', { encoding: 'utf-8' });
    let db = JSON.parse(movies).movies;

    if(searchedParams.title){
        db=db.filter(movie => movie.title.toLowerCase().includes(searchedParams.title.toLowerCase()));
    }

    if(searchedParams.genre){
        db=db.filter(movie => movie.genre.toLowerCase().includes(searchedParams.genre.toLowerCase()));
    }

    if(searchedParams.year){
        db=db.filter(movie => Number(movie.year)===Number(searchedParams.year));        
    }

    return db;
}

async function findMovie(id) {
    const movies = await getAllMovies();
    return movies.find(movie => movie.id === id);
}

async function createMovie(movie){
    const movies = await getAllMovies();
    const newMovie = {
        id: uuid(),
        ...movie
    };
    movies.push(newMovie);
    await fs.writeFile('./src/db.json', JSON.stringify({ movies: movies }, null, 2));
}

const movieRepository = {
    getAllMovies,
    findMovie, 
    createMovie
};

export default movieRepository;