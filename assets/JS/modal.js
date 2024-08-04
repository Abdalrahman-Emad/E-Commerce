//Get each product with ID

function fetchProductDetails(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const productDetails = `
          <div class="product-detail-view d-flex flex-column align-items-center">
            <div class="row w-100">
              <div class="col-md-6 d-flex flex-column align-items-center">
                <img src="${
                  product.thumbnail
                }" class="img-fluid main-image mb-3 bg-secondary-subtle" alt="${
        product.title
      }">
                <div class="image-thumbnails mt-3 d-flex flex-wrap justify-content-center">
                  ${product.images
                    .map(
                      (img) =>
                        `<img src="${img}" class="img-thumbnail me-2 mb-2 bg-secondary-subtle" style="width: 100px; height: 100px;">`
                    )
                    .join("")}
                </div>
              </div>
              <div class="col-md-6">
                <div class="product-info">
                  <div class="product-header mb-3">
                    <h3>${product.title}</h3>
                    <div class="rating">
                      ${"★".repeat(Math.round(product.rating))} 
                      ${"☆".repeat(5 - Math.round(product.rating))} 
                      (${product.rating})
                    </div>
                  </div>
                  <p class="product-description">${product.description}</p>
                  <p><strong>Category:</strong> ${product.category}</p>
                  <p><strong>Brand:</strong> ${product.brand}</p>
                  <p><strong>SKU:</strong> ${product.sku}</p>
                  <p><strong>Price:</strong> £${product.price}</p>
                  <p><strong>Discount:</strong> ${
                    product.discountPercentage
                  }%</p>
                  <p><strong>Stock:</strong> ${
                    product.stock > 0 ? product.stock : "Out of stock"
                  }</p>
                  <p><strong>Weight:</strong> ${product.weight} kg</p>
                  <p><strong>Dimensions:</strong> ${
                    product.dimensions.width
                  } x ${product.dimensions.height} x ${
        product.dimensions.depth
      } cm</p>
                  <p><strong>Warranty:</strong> ${
                    product.warrantyInformation
                  }</p>
                  <p><strong>Shipping:</strong> ${
                    product.shippingInformation
                  }</p>
                  <p><strong>Return Policy:</strong> ${product.returnPolicy}</p>
                  <div class="quantity-and-cart d-flex align-items-center mb-3">
                    <div class="quantity-selector d-flex align-items-center">
                      <button class="btn btn-outline-secondary quantity-decrease">-</button>
                      <input type="number" class="form-control mx-2 text-center quantity-input" value="1" min="1" style="width: 60px;">
                      <button class="btn btn-outline-secondary quantity-increase">+</button>
                    </div>
                     <button class="btn btn-warning btn-sm add-to-cart ms-3" style="border-radius: 25px; padding: 0.5rem 1.5rem; font-weight: 600;">
                      Add to cart (£<span class="total-price">${
                        product.price
                      }</span>)
                        </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="reviews mt-4 w-100">
              <h5>Reviews</h5>
              ${product.reviews
                .map(
                  (review) => `
                <div class="review mb-2 p-3 rounded shadow-sm d-flex align-items-start bg-secondary-subtle">
                  <img src="../assets/images/image-amyrobson.png" alt="${
                    review.reviewerName
                  }" class="rounded-circle me-3" style="width: 50px; height: 50px;">
                  <div>
                    <strong>${review.reviewerName}</strong> 
                    <span class="text-muted">(${new Date(
                      review.date
                    ).toLocaleDateString()})</span>
                    <div class="rating mb-2">
                      ${"★".repeat(Math.round(review.rating))} 
                      ${"☆".repeat(5 - Math.round(review.rating))}
                    </div>
                    <p>${review.comment}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;
      document.getElementById("productDetails").innerHTML = productDetails;

      const decreaseBtn = document.querySelector(".quantity-decrease");
      const increaseBtn = document.querySelector(".quantity-increase");
      const quantityInput = document.querySelector(".quantity-input");
      const totalPriceElement = document.querySelector(".total-price");

      const updateTotalPrice = () => {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = (product.price * quantity).toFixed(2);
        totalPriceElement.textContent = totalPrice;
      };

      decreaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
          updateTotalPrice();
        }
      });

      increaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        updateTotalPrice();
      });

      quantityInput.addEventListener("input", () => {
        if (quantityInput.value < 1) quantityInput.value = 1;
        updateTotalPrice();
      });


      // Add to cart functionality
      const addToCartButton = document.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
        const quantity = parseInt(quantityInput.value);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += quantity;
        } else {
          cart.push({ ...product, quantity });
        }

        function showToast() {
          const toast = document.getElementById("toast");
          toast.style.display = "block";

          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast.style.display = "none";
          }, 3000);
        }

        // Update your cart functionality
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showToast();
      });

      const productModal = new bootstrap.Modal(
        document.getElementById("productModal")
      );
      productModal.show();
    });
}

// Function to update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length;
  document.querySelector(".badge").textContent = cartCount;
}

updateCartCount();
