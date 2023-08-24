const express = require('express');
const{ animals} = require('./data/animals.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
// parse incoming data
app.use(express.urlencoded({extended:true}));
app.use(express.json());


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      personalityTraitsArray.forEach(trait => {
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

  function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }

  function createNewAnimal(body, animalsArray) {
    const animal = body;
    // our function's main code will go here
    animalsArray.push(animal);
    fs.writeFileSync(
      path.join(__dirname, './data/animals.json'),
      JSON.stringify({animals: animalsArray}, null, 2)
    );
    return animal;
  }

  // validate data make sure its same data type
  function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return true;
    }
    
  }


// get all animals
    app.get('/api/animals', (req, res) => {
      let results = animals;
      if (req.query) {
        results = filterByQuery(req.query, results);
      }
      res.json(results);
    });
  // get animal by ID
    app.get('/api/animals/:id', (req, res) => {
      const result = findById(req.params.id, animals);
      if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
    });
    
  // POST a animal
  app.post('/api/animals' , (req, res) => {
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
  

app.listen(PORT, () => {
    console.log('API server now on port 3001');
})