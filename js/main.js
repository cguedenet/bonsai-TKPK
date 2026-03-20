/* ========================================
   Verdant Bonsai — Shared JavaScript
   ======================================== */

// Product data
var trees = [
  { id: 0, name: 'Kishu Juniper Bonsai #712', price: 95, badge: '', emoji: '🌲', cat: 'limited', desc: 'A beautiful Kishu juniper shaped in the informal upright style. This tree features compact foliage pads and a gracefully curved trunk, perfect for display on a desk or windowsill.' },
  { id: 1, name: 'European Crabapple Bonsai #756', price: 105, badge: 'new', emoji: '🍎', cat: 'limited', desc: 'This European crabapple produces miniature flowers in spring and tiny fruit in autumn. A seasonal showpiece that brings year-round interest to any collection.' },
  { id: 2, name: 'Winter Jasmine Bonsai #687', price: 85, badge: '', emoji: '🌸', cat: 'potted', desc: 'Winter jasmine blooms bright yellow flowers even in the coldest months. This cascade-style bonsai trails elegantly and thrives indoors near a sunny window.' },
  { id: 3, name: 'Canyon Live Oak Starter', price: 29, badge: '', emoji: '🌳', cat: 'starter', desc: 'A hardy native oak perfect for beginners. Canyon live oaks develop thick trunks quickly and respond well to pruning, making them ideal for learning bonsai techniques.' },
  { id: 4, name: 'Tiger Bark Ficus Starter', price: 25, badge: '', emoji: '🌿', cat: 'starter', desc: 'The tiger bark ficus is one of the most forgiving bonsai species. Its distinctive mottled bark and glossy leaves make it a favorite among new growers.' },
  { id: 5, name: 'Japanese Black Pine #603', price: 175, badge: 'new', emoji: '🌲', cat: 'field', desc: 'Field-grown for over five years, this Japanese black pine features dramatic movement and mature bark. A specimen tree for the serious collector.' },
  { id: 6, name: 'Scots Pine Starter', price: 29, badge: '', emoji: '🎄', cat: 'starter', desc: 'Scots pine is a classic bonsai species with beautiful flaky bark and long needles. This starter is pre-wired and ready for its first styling.' },
  { id: 7, name: 'Sekka Hinoki Cypress Starter', price: 35, badge: '', emoji: '🌴', cat: 'starter', desc: 'A unique variety with fan-shaped foliage that gives it a layered, cloud-like appearance. Low maintenance and slow growing — perfect for patient beginners.' },
  { id: 8, name: 'Zelkova Bonsai Starter', price: 29, badge: '', emoji: '🍂', cat: 'starter', desc: 'The Japanese zelkova develops a beautiful broom-style canopy naturally. Watch it change color through the seasons, from spring green to autumn gold.' },
  { id: 9, name: 'Red Maple Bonsai Starter', price: 29, badge: '', emoji: '🍁', cat: 'starter', desc: 'Famous for its brilliant red autumn foliage, this red maple starter is vigorous and easy to shape. A stunning seasonal display piece.' },
  { id: 10, name: 'One-Gallon Juniper #702', price: 115, badge: 'sold', emoji: '🌲', cat: 'limited', desc: 'A mature one-gallon juniper with excellent trunk movement and jin features. This limited-edition piece has been sold.' },
  { id: 11, name: 'Winter Jasmine Bonsai #675', price: 85, badge: '', emoji: '🌸', cat: 'potted', desc: 'Another lovely winter jasmine in semi-cascade style. Bright yellow blooms appear in late winter, bringing cheer to shorter days.' },
  { id: 12, name: 'Japanese Black Pine #602', price: 125, badge: '', emoji: '🌲', cat: 'field', desc: 'A mid-size field-grown Japanese black pine with strong root spread and developing bark. Ready for its first reduction and detailed wiring.' },
  { id: 13, name: 'Japanese Black Pine #599', price: 145, badge: '', emoji: '🌲', cat: 'field', desc: 'This pine has been field-grown for seven years, developing impressive girth and mature character. Ideal for creating a powerful, masculine bonsai.' },
  { id: 14, name: 'Winter Jasmine Bonsai #683', price: 85, badge: '', emoji: '🌸', cat: 'potted', desc: 'A full-cascade winter jasmine trained over a tall pot. The trailing branches create a waterfall effect that is breathtaking when in bloom.' },
  { id: 15, name: 'One-Gallon Juniper #701', price: 115, badge: '', emoji: '🌲', cat: 'limited', desc: 'This juniper has been grown in a one-gallon container to develop excellent nebari. Ready for transplanting into a bonsai pot and detailed styling.' },
];

var hueMap = {
  '🌲': [120,145], '🍎': [10,25], '🌸': [330,345], '🌳': [100,125],
  '🌿': [140,160], '🎄': [135,155], '🌴': [95,115], '🍂': [35,50], '🍁': [15,35],
};

var catLabels = {
  starter: 'Starter',
  potted: 'Potted Tree',
  limited: 'Limited Release',
  field: 'Field Grown',
};

// Cart (persisted via localStorage)
function getCart() {
  try { return JSON.parse(localStorage.getItem('verdant_cart') || '[]'); }
  catch(e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('verdant_cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(id) {
  var cart = getCart();
  var existing = cart.find(function(item) { return item.id === id; });
  if (existing) { existing.qty++; } else { cart.push({ id: id, qty: 1 }); }
  saveCart(cart);
}
function updateCartCount() {
  var cart = getCart();
  var count = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
  document.querySelectorAll('.cart-count').forEach(function(el) { el.textContent = count; });
}

// Product card HTML
function createCard(item, i) {
  var hues = hueMap[item.emoji] || [120, 145];
  var h1 = hues[0], h2 = hues[1];
  var badgeHTML = '';
  if (item.badge === 'new') badgeHTML = '<span class="product-badge badge-new">New</span>';
  if (item.badge === 'sold') badgeHTML = '<span class="product-badge badge-sold">Sold Out</span>';
  var btnClass = item.badge === 'sold' ? 'add-to-cart-btn sold-out' : 'add-to-cart-btn';
  var btnText = item.badge === 'sold' ? 'Sold Out' : 'Add to Cart';
  var btnAttr = item.badge === 'sold' ? '' : ' onclick="addToCart(' + item.id + ')"';

  return '<div class="product-card fade-up" style="transition-delay:' + Math.min(i * 0.05, 0.3) + 's">' +
    '<a href="product.html?id=' + item.id + '" class="product-link">' +
    '<div class="product-img">' + badgeHTML +
    '<div class="img-placeholder primary" style="background:linear-gradient(145deg, hsl(' + h1 + ',35%,72%) 0%, hsl(' + h2 + ',40%,62%) 100%)"><span>' + item.emoji + '</span></div>' +
    '<div class="img-placeholder hover" style="background:linear-gradient(145deg, hsl(' + h1 + ',40%,65%) 0%, hsl(' + h2 + ',45%,55%) 100%)"><span>' + item.emoji + '</span></div>' +
    '</div>' +
    '</a>' +
    '<div class="product-actions"><button class="' + btnClass + '"' + btnAttr + '>' + btnText + '</button></div>' +
    '<div class="product-info"><a href="product.html?id=' + item.id + '"><div class="product-name">' + item.name + '</div></a>' +
    '<div class="product-price">$' + item.price.toFixed(2) + ' USD</div></div></div>';
}

function renderGrid(containerId, items) {
  var el = document.getElementById(containerId);
  if (el) {
    el.innerHTML = items.map(createCard).join('');
    observeFadeUps();
  }
}

function filterTrees(btn) {
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  var filter = btn.dataset.filter;
  var filtered = filter === 'all' ? trees : trees.filter(function(t) { return t.cat === filter; });
  renderGrid('productGrid', filtered);
}

// Scroll header shadow
function initScrollHeader() {
  window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Fade-up animations
function observeFadeUps() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up:not(.visible)').forEach(function(el) { observer.observe(el); });
}

// Mobile nav toggle
function initMobileNav() {
  var toggle = document.querySelector('.mobile-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
    });
  }
}

// Active nav link
function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  initScrollHeader();
  observeFadeUps();
  updateCartCount();
  initMobileNav();
  setActiveNav();
});
