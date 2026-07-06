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

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000...');
});