const Joi = require('joi');
const express = require('express')
const app = express()

app.use(express.json());


const movies = [
    { id: 1, name: "Romance" },
    { id: 2, name: "Thriller" },
    { id: 3, name: "Horror" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Action" },
];

app.get('/', (req, res) => {
    res.send("Welcome to Movie World");
});

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.post('/api/movies', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    
    const movie = {
        id: movies.length + 1,
        name: req.body.name
    };
    movies.push(movie);
    res.send(movie);
});

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The course with the given ID was not found");

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    
    movie.name = req.body.name;
    res.send(movie);
});

app.delete('/api/movies/:id', (req, res) => {
     const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The course with the given ID was not found");
    
    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given ID was not found");
    res.send(movie);
});

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(movie, schema);
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening to port ${port}...`));


