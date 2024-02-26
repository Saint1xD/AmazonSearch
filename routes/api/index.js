var express = require('express');
var scrapeRouter = require('./scrape');
var router = express.Router();

router.use('/scrape', scrapeRouter);

module.exports = router;
