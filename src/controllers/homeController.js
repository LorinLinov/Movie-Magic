import {Router} from 'express';
import movieService from '../services/movieServices.js';

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const movies = await movieService.getAll();
    res.render('home', { layout: 'main', title: 'Movie Magic', movies: movies });
});

homeRouter.get('/about', (req, res) => {
    res.render('about', { layout: 'main', title: 'About Us' });
});

export default homeRouter;