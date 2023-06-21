const router = require('express').Router();
const path = require('path');



router.get('/notes', (req, res) => {
    res.sendFile('notes.html', { root: path.join(__dirname, '../public') });
  });

      // GET * should return the index.html file
router.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
  });

module.exports = router;