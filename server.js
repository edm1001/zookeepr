import express from 'express';
import { animals } from './data/animals.json';

const app = express();
app.get('/api/animals', (req, res) => {
    res.json(animals)
})

app.listen(3001, () => {
    console.log('API server now on port 3001')
})