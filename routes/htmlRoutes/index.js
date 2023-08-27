const router = require('express').Router();
const path = require('path');

// home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
// animals page
router.get('/animals', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/animals.html'));
  });

// caretakerpage
router.get('/zookeepers', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });

router.get('*', (req,res) => {
    res.send(path.join(__dirname, './public/index.html'));
  });

module.exports = router;