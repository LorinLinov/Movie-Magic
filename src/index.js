import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';

const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('./src/public'));

app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000...');
});