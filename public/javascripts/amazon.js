const keywordInput = document.getElementById("keyword"); // Getting the input element
const searchButton = document.getElementById("search"); // Getting the button element
const resultsContainer = document.getElementById("results"); // Getting the container element

async function search() {
  let keyword = keywordInput.value;
  let response = await fetch(`/api/scrape?keyword=${keyword}`); // Making a GET request to the /api/scrape route
  let products = await response.json(); // Getting the JSON response

  resultsContainer.innerHTML = "";
  products.forEach(product => { // Looping through the products array
    let productContainer = document.createElement("div"); // Creating a div for each product
    productContainer.className = "col-lg-2 col-md-4 col-sm-6 col-12 border m-1"; // Adding a class to the product container
    productContainer.innerHTML = `
      <div class="product mb-2"">
      <img src="${product.image}" />
      <h2>${product.title}</h2>
      <a href="${product.link}">View Product</a>
      <p>Rating: ${product.rating}</p>
      <p>Reviews: ${product.reviews}</p>
      <p>Price: ${product.price}</p>
      </div>
    `;
    resultsContainer.appendChild(productContainer); // Appending the product container to the results container
  });
}
searchButton.addEventListener('click', () => {
  search();
  keywordInput.value = '';
});

document.getElementById('keyword').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    search();
    keywordInput.value = '';
  }
});
