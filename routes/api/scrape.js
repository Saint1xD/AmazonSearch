var express = require('express');
var axios = require('axios').default; // Importing axios with default settings
var router = express.Router();
const cheerio = require('cheerio');

router.get('/', async function(req, res, next) {
  let search = req.query.keyword;
  let products = [];
  // Using axios to make a GET request to the Amazon search page
  await axios.get(`https://www.amazon.com/s?k=${search}`, {
    headers: {
      "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36`,
      "Accept": "text/html,application/xhtml+xml,application/xml",
    } // After 500 tries, I found that this Headers works to bypass the 503 error on Amazon search page
  })
    .then(response => {
      const $ = cheerio.load(response.data);
      const productsElements = $('[data-component-type="s-search-result"]');
      productsElements.each((i, el) => {
        const image = $(el).find("img.s-image").prop("src"); // Getting the image URL
        const title = $(el).find("h2 span.a-text-normal").text(); // Getting the title
        const link = $(el).find("h2 a.a-link-normal").prop("href"); // Getting the link
        const rating = $(el).find("span.a-icon-alt").text(); // Getting the rating
        const reviews = $(el).find('[data-csa-c-slot-id="alf-reviews"]').text(); // Getting the reviews
        const price = $(el).find("span.a-price span").first().text(); // Getting the price (I know its not needed but I wanted to get it too)
        const product = {
          image: image,
          title: title,
          link: "https://www.amazon.com" + link, // Adding the domain to the link, if its not there It will redirect to localhost:3000
          rating: rating,
          reviews: reviews,
          price: price
        }
        products.push(product); // Pushing the product to the products array
      });

      res.json(products); // Sending the products array as a JSON response
    }).catch(err => {
      console.log(err);
      res.send(`ERROR: ${err}`);
    });
});
module.exports = router;
