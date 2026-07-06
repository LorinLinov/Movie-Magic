import express from 'express';
// import handlebars from 'express-handlebars';


const app = express();

// app.engine('handlebars', handlebars.engine());
// app.set('view engine', 'handlebars');

app.use(express.static('./src/public'));


app.set('views', './src/views');

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: './src/views' });
});

app.get('/create', (req, res) => {
    res.sendFile('create.html', { root: './src/views' });
});

app.get("/search", (req, res) => {
    res.sendFile('search.html', { root: './src/views' });
});

app.get('/details/:id', (req, res) => {
    res.sendFile('details.html', { root: './src/views' });
});

app.get('/about', (req, res) => {
    res.sendFile('about.html', { root: './src/views' });
});

app.get('/*splat', (req, res) => {
    res.sendFile('404.html', { root: './src/views' });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000...');
});