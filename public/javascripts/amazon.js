const keywordInput = document.getElementById("keyword"); // Getting the input element
const searchButton = document.getElementById("search"); // Getting the button element
const resultsContainer = document.getElementById("results"); // Getting the container element
const resultsSummary = document.querySelector('.results-summary');

function enableLoading() {
  searchButton.setAttribute("disabled", "disabled");
  const loadingElement =
    `<div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
  resultsSummary.innerHTML = loadingElement; // Adding the loading element
}
function disableLoading() {
  searchButton.removeAttribute("disabled"); // Enabling the button
  resultsSummary.innerHTML = "";  // Clearing the loading element
}

async function search() {
  enableLoading();
  let keyword = keywordInput.value;
  // Making a GET request to the /api/scrape route
  let response = await fetch(`/api/scrape?keyword=${keyword}`)
    .finally(disableLoading);
  let products = await response.json(); // Getting the JSON response
  resultsSummary.innerHTML = `There is ${products.length} results for "${keyword}" `;

  resultsContainer.innerHTML = "";
  products.forEach(product => { // Looping through the products array
    let productContainer = document.createElement("div"); // Creating a div for each product
    productContainer.className = "col-lg-2 col-md-5 col-6 card card-index m-1 shadow"; // Adding a class to the product container
    let reviewsText = product.reviews
      ? `<p>${product.reviews} reviews: ${product.rating}</p>`
      : `0 reviews`;
    productContainer.innerHTML = `
      <div class="product">
        <img src="${product.image}" class="image bg-light-subtle"/>
        <div class="description mt-2">
          <a href="${product.link}"><h6>${product.title}</h2></a>
          <div class="reviews">
            ${reviewsText}
          </div>
          <p class="price">${product.price}</p>
        </div>
      </div>
    `;
    resultsContainer.appendChild(productContainer); // Appending the product container to the results container
  });
}
searchButton.addEventListener('click', () => {
  search();
});

document.getElementById('keyword').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    search();
    }
});
