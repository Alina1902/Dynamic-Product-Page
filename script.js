const products = {
  shirts: {
      name: 'Classic T-Shirts  ',
      colors: ['maroon', 'royalblue', 'black'],
      sizes: ['S', 'M', 'L', 'XL'],
      prices: {S: 40, M: 45, L: 50, XL: 55},
      images: {
          maroon: 'images/Men/Shirts/casual_red.jpg',
          royalblue: 'images/Men/Shirts/casual_blue.jpg',
          black: 'images/Men/Shirts/casual_black.jpg'
      },
      availability: 'In Stock',
      rating: 4.5,
  },
  dresses: {
    name: 'Elegant Dresses  ',
    colors: ['yellow', 'orange', 'pink'],
    sizes: ['S', 'M', 'L', 'XL'],
    prices: {S: 20, M: 25, L: 30, XL: 35},
    images: {
        yellow: 'images/Kids/frowk1.jpg',
        orange: 'images/Kids/frowk2.jpg',
        pink: 'images/Kids/frowk3.jpg'
    },
    availability: 'In Stock',
    rating: 4.6,
},
hijabs: {
  name: 'Stylish Hijabs  ',
  colors: ['maroon', 'pink', 'royalblue'],
  sizes: ['S', 'M', 'L', 'XL'],
  prices: {S: 10, M: 15, L: 20, XL: 25},
  images: {
      maroon: 'images/Women/Hijab1.jpg',
      pink: 'images/Women/Hijab2.jpg',
      royalblue: 'images/Women/Hijab3.jpg'
  },
  availability: 'In Stock',
  rating: 3.7,
},
shorts: {
  name: 'Comfortable Shorts  ',
  colors: ['skyblue', 'pink', 'black'],
  sizes: ['S', 'M', 'L', 'XL'],
  prices: {S: 40, M: 45, L: 56, XL: 60},
  images: {
      skyblue: 'images/Kids/shorts1.jpg',
      pink: 'images/Kids/shorts2.jpg',
      black: 'images/Kids/shorts3.jpg'
  },
  availability: 'In Stock',
  rating: 4.8,
},
};

let currentProduct = null;
let currentColor = null;
let currentSize = null;
const cart = [];
function updateProductDisplay(productType) {
  const displayElement = document.getElementById('product-display');
  
  // Fade out
  displayElement.classList.remove('fade-in');
  
  // Wait for fade out to complete
  setTimeout(() => {
      currentProduct = products[productType];
      
      // Update product name
      document.getElementById('product-name').textContent = currentProduct.name;
      
      // Update product image
      const productImage = document.getElementById('product-image');
      productImage.src = currentProduct.images[currentProduct.colors[0]];
      productImage.alt = currentProduct.name;
       // Update availability
       document.getElementById('product-availability').textContent = currentProduct.availability;
        
       // Update rating
       const ratingStars = document.querySelector('#product-rating .stars');
       const ratingValue = document.querySelector('#product-rating .rating-value');
       ratingStars.textContent = '★'.repeat(Math.floor(currentProduct.rating)) + '☆'.repeat(5 - Math.floor(currentProduct.rating));
       ratingValue.textContent = currentProduct.rating.toFixed(1);
       
       // Update color options
       updateColorOptions();
       
       // Update size options
       updateSizeOptions();
       
       // Select first color and size by default
       selectColor(currentProduct.colors[0]);
       selectSize(currentProduct.sizes[0]);
        // Fade in
        displayElement.classList.add('fade-in');
    }, 250); // Half of the transition time for a smooth crossfade effect
}
function updateColorOptions() {
  const colorOptions = document.getElementById('color-options');
  colorOptions.innerHTML = '';
  currentProduct.colors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'color-option';
      colorDiv.style.backgroundColor = color;
      colorDiv.addEventListener('click', () => selectColor(color));
      colorOptions.appendChild(colorDiv);
  });
}
function updateSizeOptions() {
  const sizeOptions = document.getElementById('size-options');
  sizeOptions.innerHTML = '';
  currentProduct.sizes.forEach(size => {
      const sizeDiv = document.createElement('div');
      sizeDiv.className = 'size-option';
      sizeDiv.textContent = size;
      sizeDiv.addEventListener('click', () => selectSize(size));
      sizeOptions.appendChild(sizeDiv);
  });
}

function selectColor(color) {
  currentColor = color;
  document.getElementById('product-image').src = currentProduct.images[color];
  document.querySelectorAll('.color-option').forEach(option => {
      option.classList.remove('selected');
      if (option.style.backgroundColor === color) {
          option.classList.add('selected');
      }
  });
}

function selectSize(size) {
  currentSize = size;
  document.getElementById('product-price').textContent = `$${currentProduct.prices[size]}`;
  document.querySelectorAll('.size-option').forEach(option => {
      option.classList.remove('selected');
      if (option.textContent === size) {
          option.classList.add('selected');
      }
  });
}

function addToCart() {
  if (currentProduct && currentColor && currentSize) {
      cart.push({
          name: currentProduct.name,
          color: currentColor,
          size: currentSize,
          price: currentProduct.prices[currentSize],
          image: currentProduct.images[currentColor]
      });
      updateCartCount();
      showCartPopup();
  }
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// ... (previous code remains the same)

function showCartPopup() {
  const cartPopup = document.getElementById('cart-popup');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
          <img src="${currentProduct.images[item.color]}" alt="${item.name}">
          <div class="cart-item-details">
              <h3>${item.name}</h3>
              <p>Color: ${item.color}</p>
              <p>Size: ${item.size}</p>
              <p>Price: $${item.price}</p>
          </div>
      `;
      cartItems.appendChild(li);
      total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
  cartPopup.classList.remove('hidden');
}

// Add event listener for cart icon
document.getElementById('cart-icon-btn').addEventListener('click', showCartPopup);

// ... (rest of the code remains the same)

document.querySelectorAll('.product-btn').forEach(btn => {
  btn.addEventListener('click', () => updateProductDisplay(btn.dataset.product));
});

document.getElementById('add-to-cart').addEventListener('click', addToCart);
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-popup').classList.add('hidden');
});

// Initialize with the first product
updateProductDisplay('shirts');
const dynamicTextContent = document.querySelector('.dynamic-text-content');
const phrases = ['with glory', 'with style', 'with confidence'];
let currentIndex = 0;

function changeDynamicText() {
  dynamicTextContent.textContent = phrases[currentIndex];
  currentIndex = (currentIndex + 1) % phrases.length;
}

setInterval(changeDynamicText, 2000);