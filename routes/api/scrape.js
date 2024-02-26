var express = require('express');
var axios = require('axios').default;
var router = express.Router();

router.get('/', function(req, res, next) {
  let search = req.query.keyword;
  axios.get(`https://www.amazon.com/s?k=${search}`)
    .then(response => {
      // res.send(response.request);
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
});

module.exports = router;
