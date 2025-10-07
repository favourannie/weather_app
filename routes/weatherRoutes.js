const router = require('express').Router();
const { weather } = require('../controllers/weatherController');

router.get('/weather', weather);

module.exports = router;