var express = require('express');
var axios = require('axios').default;
var router = express.Router();
var axiosInstance = axios.create({
  headers: {
    'authority': 'www.amazon.com',
    "Host": "www.amazon.com",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Pragma": "no-cache",
    "TE": "trailers",
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36`,
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "pt-BR,pt;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  }
})

router.get('/', function(req, res, next) {
  let search = req.query.keyword;
  axiosInstance.get(`https://www.amazon.com/s?field-keywords=${search}`)
    .then(response => {
      // res.send(response.request);
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  res.send(search);
});
module.exports = router;
