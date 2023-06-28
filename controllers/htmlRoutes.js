const router = require('express').Router();
const path = require('path');



router.get('/notes', (req, res) => {
  console.log('grabbing the notes');
    res.sendFile( path.join(__dirname, '../public/notes.html'));
  });

      //  should return the index.html file
router.get('*', (req, res) => {
  console.log('grabbing the index file');
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = router;