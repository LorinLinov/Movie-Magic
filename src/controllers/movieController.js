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

    const artists = await movieService.artistsInMovie(movieId);
    res.render('movies/details', { layout: 'main', title: 'Movie Details', movie: movie, artists });
});

movieRouter.get('/artist-create', (req, res) => {
    res.render('movies/artist-create', { layout: 'main', title: 'Create Cast' });
});

movieRouter.post('/artist-create', async (req, res) => {
    const { name, age, born, nameInMovie, imageUrl } = req.body;

    await movieService.createArtist({
        name,
        age,
        born,
        imageUrl
    });

    res.redirect('/');
});

movieRouter.get('/artist-attach/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.findById(movieId);

    const artists = await movieService.getAllArtists();
    res.render('movies/artist-attach', { layout: 'main', title: 'Attach Cast', movie: movie, artists });
});

movieRouter.post('/artist-attach/:id', async (req, res) => {
    const movieId=req.params.id;
    const {cast}=req.body;

    await movieService.attachArtist(movieId, cast);

    res.redirect(`/movies/details/${movieId}`);
})

export default movieRouter;