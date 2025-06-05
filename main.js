let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');

    const header = document.querySelector('header');
    const aboutSection = document.getElementById('about');
    const headerHeight = header.offsetHeight;
    const scrollY = window.scrollY;
    const aboutTop = aboutSection.offsetTop;

    if (scrollY + headerHeight >= aboutTop) {
        header.classList.add('shadow');
    } else {
        header.classList.remove('shadow');
    }
}

document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartBadge = document.getElementById('cart-badge');
  const cartIcon = document.getElementById('cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartListModal = document.getElementById('cart-items-modal');
  const cartTotalModal = document.getElementById('cart-total-modal');

  function updateCartDisplay() {
    // Update badge
    let totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';

    // Update Modal Cart
    cartListModal.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, idx) => {
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.img}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button onclick="decreaseQty(${idx})">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${idx})">+</button>
          <button class="remove-btn" onclick="removeItem(${idx})">&times;</button>
        </div>
      `;
      cartListModal.appendChild(li);
    });
    cartTotalModal.textContent = total.toFixed(2);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  window.increaseQty = function(idx) {
    cartItems[idx].qty += 1;
    updateCartDisplay();
  };
  window.decreaseQty = function(idx) {
    if (cartItems[idx].qty > 1) {
      cartItems[idx].qty -= 1;
    } else {
      cartItems.splice(idx, 1);
    }
    updateCartDisplay();
  };
  window.removeItem = function(idx) {
    cartItems.splice(idx, 1);
    updateCartDisplay();
  };

  // Add to cart logic with image
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const box = button.closest('.box');
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      const imgElem = box.querySelector('img');
      const img = imgElem ? imgElem.getAttribute('src') : '';
      if (!name || isNaN(price)) return;
      const found = cartItems.find(item => item.name === name);
      if (found) {
        found.qty += 1;
      } else {
        cartItems.push({ name, price, qty: 1, img });
      }
      updateCartDisplay();
    });
  });

  // Open cart
  cartIcon.addEventListener('click', () => {
    cartModal.classList.add('open');
    cartOverlay.style.display = 'block';
  });

  // Close cart
  window.closeCart = function() {
    cartModal.classList.remove('open');
    cartOverlay.style.display = 'none';
  };
  cartOverlay.addEventListener('click', closeCart);

  updateCartDisplay();
});
