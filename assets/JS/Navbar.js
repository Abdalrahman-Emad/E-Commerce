document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//Dark Mode
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const navbar = document.querySelector(".navbar");

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  navbar.classList.toggle("dark-mode");
});



document.addEventListener("DOMContentLoaded", function () {
  // Store fetched products globally
  let allProducts = [];

  // Function to display products
  function displayProducts(products) {
    const productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = ""; // Clear the container

    products.forEach((product) => {
      const productCard = `
        <div class="col-md-3">
          <div class="card h-100 shadow-sm" style="border-radius: 15px;" data-product-id="${product.id}">
            <div class="image-container" style="overflow: hidden; border-top-left-radius: 15px; border-top-right-radius: 15px;">
              <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height:250px; object-fit: contain; background-color: rgba(209, 231, 22120, 0.3);">
            </div>
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-warning text-dark"><i class="bi bi-star-fill"></i> ${product.rating}</span>
                <a href="#" class="btn btn-outline-success" style="border-radius: 50%; padding: 8px;">
                  <i class="bi bi-cart"></i>
                </a>
              </div>
              <h5 class="card-title">${product.title}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <p class="card-text text-muted small">${product.category}</p>
                <p class="card-text fw-bold">£ ${product.price}</p>
              </div>
            </div>
          </div>
        </div>
      `;
      productsContainer.insertAdjacentHTML("beforeend", productCard);
    });

    // Add click event listener to each card
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id");
        fetchProductDetails(productId);
      });
    });
  }

  // Fetch all products
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data.products; 
      displayProducts(allProducts); 
    });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().startsWith(query)
    );
    displayProducts(filteredProducts); 
  });

  // Function to filter products by category
  function filterByCategory(category) {
    if (category === "All Products") {
      displayProducts(allProducts); 
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      displayProducts(filteredProducts); 
    }
  }

  // Add event listeners to category links
  document.querySelectorAll(".cat-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const category = this.textContent.trim();
      filterByCategory(category); 
    });
  });

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const category = this.textContent.trim();
      filterByCategory(category); 
    });
  });

  
  // Sorting Logic
  document.getElementById('sortLowToHigh').addEventListener('click', function () {
    const sortedProducts = allProducts.slice().sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
  });

  document.getElementById('sortHighToLow').addEventListener('click', function () {
    const sortedProducts = allProducts.slice().sort((a, b) => b.price - a.price);
    displayProducts(sortedProducts);
  });

  // Function to toggle the visibility of the price filter view
  window.togglePriceFilter = function() {
    const priceFilterView = document.getElementById('price-filter-view');
    priceFilterView.style.display = priceFilterView.style.display === 'none' ? 'block' : 'none';
  };
});
