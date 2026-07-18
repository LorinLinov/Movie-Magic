import fs from 'fs/promises';
import { prisma } from '../../lib/prisma.js';

async function getAllMovies(searchedParams = {}) {
    let movies = await prisma.movies.findMany();

    if (searchedParams.title) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(searchedParams.title.toLowerCase()));
    }

    if (searchedParams.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(searchedParams.genre.toLowerCase()));
    }

    if (searchedParams.year) {
        movies = movies.filter(movie => Number(movie.year) === Number(searchedParams.year));
    }

    return movies;
}

async function findMovie(id) {
    const movies = await getAllMovies();
    return movies.find(movie => movie.id === id);
}

async function createMovie(movie) {
    const movies = await getAllMovies();

    const newMovie = await prisma.movies.create({
        data: {
            title: movie.title,
            category: movie.category,
            genre: movie.genre,
            director: movie.director,
            year: movie.year,
            imageUrl: movie.imageUrl,
            rating: movie.rating,
            description: movie.description
        }
    });

    return newMovie;
}

async function createArtist(artist) {
    const newArtist = await prisma.artists.create({
        data: {
            name: artist.name,
            age: artist.age,
            born: artist.born,
            imageUrl: artist.imageUrl
        }
    });

    return newArtist;
}

async function getAllArtists() {
    const artists = await prisma.artists.findMany();

    return artists;
}

async function findArtistId(name) {
    console.log(name)
    const artist = await getAllArtists();

    return artist.find(artist => artist.name === name).id;
}

async function attachArtist(movieId, name) {
    const artistId = await findArtistId(name);

    const updatedMovie = await prisma.movies.update({
        where: { id: movieId },
        data: {
            artists: {
                connect: { id: artistId }
            }
        }
    });
}

async function artistsInMovie(id){
    const artists=await prisma.artists.findMany({
        where: {
            movies: {
                some: {
                    id:id
                }
            }
        }
    });

    return artists;
}

const movieRepository = {
    getAllMovies,
    findMovie,
    createMovie,
    createArtist,
    getAllArtists,
    attachArtist,
    artistsInMovie
};

export default movieRepository;