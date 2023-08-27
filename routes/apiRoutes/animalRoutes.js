const router = require('express').Router();
const {filterByQuery, findById, createNewAnimal, validateAnimal} =require('../../lib/animals.js');
const {animals} = require('../../data/animals.json');


// get all animals
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
// get animal by ID
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
// POST a animal
router.post('/animals' , (req, res) => {
  // adds new animal, sets id to the length
  req.body.id = animals.length.toString();

  // add validate function to send error if incorrect data is inserted
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal does not fit the request criteria');
  }else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal); 
  }
});

module.exports = router;