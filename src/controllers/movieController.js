import {Router} from 'express';
import movieService from '../services/movieServices.js';

const movieRouter = Router();

movieRouter.get('/create', (req, res) => {
    res.render('movies/create', { layout: 'main', title: 'Create Movie' });
});

movieRouter.post('/create', async (req, res) => {
    const { title, category, genre, director, year, imageUrl, rating, description } = req.body;

    await movieService.create({
        title,
        category,
        genre,
        director,
        year,
        imageUrl,
        rating,
        description
    });
    
    res.redirect('/');
});

movieRouter.get('/search', async (req, res) => {
    const searchedParams = req.query;
    const movies = await movieService.getAll(searchedParams);

    res.render('movies/search', { layout: 'main', title: 'Search Movies', movies, searchedParams });
});

movieRouter.get('/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.findById(movieId);
    console.log(movie);
    res.render('movies/details', { layout: 'main', title: 'Movie Details', movie: movie });
});

export default movieRouter;