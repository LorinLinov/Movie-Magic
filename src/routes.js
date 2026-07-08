import homeRouter from './controllers/homeController.js';
import movieRouter from './controllers/movieController.js';
import { Router } from 'express';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/movies', movieRouter);

routes.get('/*splat', (req, res) => {
    res.render('404', { layout: 'main', title: 'Page Not Found' });
});


export default routes;