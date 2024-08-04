document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  updateCartCount();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
    return;
  }

  let totalPrice = 0;

  cart.forEach((product) => {
    const productTotal = product.price * product.quantity;
    totalPrice += productTotal;

    const cartItem = `
      <div class="cart-item d-flex align-items-center p-3 mb-3 border rounded">
        <img src="${product.thumbnail}" alt="${
      product.title
    }" class="img-fluid" style="width: 100px; height: auto; object-fit: cover; border-radius: 0.5rem;">
        <div class="cart-item-details ms-3">
          <h5>${product.title}</h5>
          <p class="text-muted">${product.description}</p>
          <p class="price">£${product.price} x ${
      product.quantity
    } = £${productTotal.toFixed(2)}</p>
        </div>
        <div class="ms-auto d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary quantity-decrease" data-id="${
            product.id
          }">-</button>
          <input type="number" class="form-control mx-1 text-center quantity-input" value="${
            product.quantity
          }" min="1" style="width: 60px;" data-id="${product.id}">
          <button class="btn btn-sm btn-outline-secondary quantity-increase" data-id="${
            product.id
          }">+</button>
        </div>
      </div>
    `;
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItem);
  });

  const totalPriceElement = `
    <div class="d-flex justify-content-between p-3 border-top">
      <h5>Total Price:</h5>
      <h5>£${totalPrice.toFixed(2)}</h5>
    </div>
  `;
  cartItemsContainer.insertAdjacentHTML("beforeend", totalPriceElement);

  document.querySelectorAll(".quantity-decrease").forEach((button) => {
    button.addEventListener("click", () =>
      updateQuantity(button.dataset.id, -1)
    );
  });

  document.querySelectorAll(".quantity-increase").forEach((button) => {
    button.addEventListener("click", () =>
      updateQuantity(button.dataset.id, 1)
    );
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", () =>
      updateQuantity(input.dataset.id, 0, input.value)
    );
  });

  const clearCartBtn = document.querySelector(".fa-trash-can");
  clearCartBtn.addEventListener("click", () => {
    clearCart(cart);
  });

  const checkoutBtn = document.querySelector(".checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    checkout();
    clearCart(cart);
  });
});

function updateQuantity(productId, change, newQuantity = null) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (productIndex !== -1) {
    if (newQuantity !== null) {
      cart[productIndex].quantity = parseInt(newQuantity);
    } else {
      cart[productIndex].quantity += change;
    }

    if (cart[productIndex].quantity < 1) {
      cart = cart.filter((product) => product.id !== parseInt(productId));
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  location.reload();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length; // Number of unique products
  document.querySelector(".badge").textContent = cartCount;
}

function checkout() {
  alert("Proceeding to checkout...");
}

function clearCart(cart) {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  location.reload();
}
