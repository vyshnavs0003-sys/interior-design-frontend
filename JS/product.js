let allProducts = []; // Store fetched data globally

//=================DYNAMIC PRODUCT CARD=========================

function renderProducts(products) {
const container = document.getElementById('productsContainer');
const productCount = document.getElementById('productCount');

container.innerHTML = ''; // Clear loading spinner & old cards

if (products.length === 0) {
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <i class="fas fa-search fa-3x text-muted mb-3"></i>
      <h5 class="text-muted">No products found</h5>
      <p class="text-muted">Try adjusting your search or filters</p>
    </div>
  `;
  productCount.textContent = '0';
  return;
}

products.forEach(product => {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-sm-6 col-lg-3';
  colDiv.dataset.category = product.category;
  
  colDiv.innerHTML = `
    <div class="product-card h-100 position-relative overflow-hidden ${product.ribbon ? '' : ''}">
      ${product.ribbon ? `<div class="product-ribbon">${product.ribbon}</div>` : ''}
      <img src="${product.image}" class="product-img" alt="${product.title}">
      <div class="product-body">
        <h6 class="product-title">${product.title}</h6>
        <p class="product-meta small mb-2">${product.meta}</p>
        <p class="product-price h6 text-gold mb-2">${product.price}</p>
        <a href="contact.html#callback-form" class="btn btn-sm btn-gold w-100">Get Quote</a>
      </div>
    </div>
  `;
  container.appendChild(colDiv);
});

productCount.textContent = products.length;
}

//===============FILTER===================

function applyFilters() {
const searchTerm = document.getElementById('productSearch').value.toLowerCase();
const category = document.getElementById('categoryFilter').value;
const priceFilter = document.getElementById('priceFilter').value;

let filtered = allProducts.filter(product => {
  const matchesSearch = product.title.toLowerCase().includes(searchTerm);
  const matchesCategory = !category || product.category === category;
  
  let matchesPrice = true;
  if (priceFilter) {
    const priceNum = parseInt(product.price.replace(/[^0-9]/g, ''));
    if (priceFilter === 'low' && priceNum > 10000) matchesPrice = false;
    if (priceFilter === 'mid' && (priceNum < 10000 || priceNum > 30000)) matchesPrice = false;
    if (priceFilter === 'high' && priceNum <= 30000) matchesPrice = false;
  }
  
  return matchesSearch && matchesCategory && matchesPrice;
});

renderProducts(filtered);
}

//=============FETCH DATA FROM JSON + INITIAL LOAD==============

fetch('data/products.json')
.then(response => response.json())
.then(data => {
  allProducts = data;
  renderProducts(data); // Initial render
})
.catch(error => {
  console.error('Fetch error:', error);
  document.getElementById('productsContainer').innerHTML = 
    '<div class="col-12 text-center py-5"><p class="text-danger">Error loading products</p></div>';
});

//=============EVENT LISTENERS===========================

document.getElementById('productSearch').addEventListener('input', applyFilters);
document.getElementById('categoryFilter').addEventListener('change', applyFilters);
document.getElementById('priceFilter').addEventListener('change', applyFilters);

