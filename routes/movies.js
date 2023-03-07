const Joi = require('joi');
const express = require('express');
const router = express.Router();

const movies = [
    { id: 1, name: "Romance" },
    { id: 2, name: "Thriller" },
    { id: 3, name: "Horror" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Action" },
];


router.get('/', (req, res) => {
    res.send(movies);
});

router.post('/', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    
    const movie = {
        id: movies.length + 1,
        name: req.body.name
    };
    movies.push(movie);
    res.send(movie);
});

router.put('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The course with the given ID was not found");

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    
    movie.name = req.body.name;
    res.send(movie);
});

router.delete('/:id', (req, res) => {
     const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The course with the given ID was not found");
    
    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});

router.get('/:id', (req, res) => {
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

module.exports = router;