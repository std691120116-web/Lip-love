// Love Potion Cosmetics - Application Logic (Vanilla JS SPA)

// --- STATE MANAGEMENT ---
const state = {
    // Current Active Tab
    currentTab: 'home',
    
    // User Profile Information
    user: {
        username: 'NongGoyu',
        email: 'nonggoyu@lovepotion.com',
        phone: '089-123-4567',
        points: 1200,
        address: {
            name: 'คุณ ณิชนันทน์ (NongGoyu)',
            detail: '99/9 หมู่ 5 ถนนงามวงศ์วาน แขวงลาดยาว เขตจตุจักร',
            province: 'กรุงเทพมหานคร',
            zip: '10900',
            phone: '089-123-4567'
        }
    },
    
    // Wishlist item IDs
    wishlist: new Set(),
    
    // Coupon Codes applied
    appliedCoupons: [], // array of strings (e.g. 'LOVE10', 'FREESHIP')
    pointsRedeemed: false, // flag if 1,000 points (100 THB discount) applied
    
    // Shopping Cart
    cart: [
        {
            id: 'love-matte',
            name: 'Love Matte Lipstick',
            price: 299,
            quantity: 1,
            shade: 'Classic Red',
            image: 'images/matte_lipstick.png'
        },
        {
            id: 'glow-tint',
            name: 'Glow Tint',
            price: 249,
            quantity: 2,
            shade: 'Berry Pink',
            image: 'images/glow_tint.png'
        }
    ],
    
    // Reviews
    reviews: [
        { name: 'NongGoyu', rating: 5, text: 'สีสวย ติดทนทั้งวัน' },
        { name: 'คุณนก', rating: 5, text: 'เนื้อลิปนุ่ม ไม่ตกร่อง' },
        { name: 'หมวยเล็ก', rating: 4, text: 'กลอสฉ่ำวาวมากค่ะ ทาแล้วปากดูสุขภาพดีสุดๆ' }
    ],
    
    // Orders list (preset order LP25001 + any new checkouts)
    orders: [
        {
            id: 'LP25001',
            date: '2026-06-23',
            items: [
                { name: 'Love Matte Lipstick', quantity: 1, price: 299 },
                { name: 'Glow Tint', quantity: 2, price: 249 }
            ],
            subtotal: 797,
            shipping: 0,
            discount: 0,
            total: 797,
            statusStep: 3, // 1: Paid, 2: Packing, 3: Shipping, 4: Delivered
            statusText: 'อยู่ระหว่างจัดส่ง',
            estArrival: 'คาดว่าจะถึงภายใน 2 วัน'
        }
    ],
    
    // Currently active selected shade in Velvet Showcase
    selectedVelvetShade: '01'
};

// --- PRODUCT CATALOG ---
const products = [
    {
        id: 'love-matte',
        name: 'Love Matte Lipstick',
        price: 299,
        category: 'matte',
        rating: 4.8,
        reviewsCount: 120,
        image: 'images/matte_lipstick.png',
        tag: 'BEST SELLER',
        desc: 'ลิปสติกเนื้อแมตต์เนียนละเอียด พิกเมนต์แน่นติดทนนาน 12 ชั่วโมง ไม่ทำให้ปากแห้งตึง'
    },
    {
        id: 'glow-tint',
        name: 'Glow Tint',
        price: 249,
        category: 'tint',
        rating: 4.7,
        reviewsCount: 95,
        image: 'images/glow_tint.png',
        tag: 'BEST SELLER',
        desc: 'ลิปทินต์สูตรน้ำ มอบสีสันสดใสเป็นธรรมชาติ บำรุงริมฝีปากให้ชุ่มชื้นแวววาวตลอดวัน'
    },
    {
        id: 'sweet-gloss',
        name: 'Sweet Gloss',
        price: 199,
        category: 'gloss',
        rating: 4.6,
        reviewsCount: 88,
        image: 'images/sweet_gloss.png',
        tag: 'TRENDING',
        desc: 'ลิปกลอสเนื้อใสประกายมุก มอบความฉ่ำวาวอวบอิ่มขั้นสุด กลิ่นสตรอว์เบอร์รี่หอมหวาน'
    },
    {
        id: 'velvet-01',
        name: 'Velvet Kiss #01 Rose Pink',
        price: 295,
        category: 'matte',
        rating: 4.9,
        reviewsCount: 42,
        image: 'images/velvet_kiss.png',
        tag: 'NEW ARRIVAL',
        desc: 'ลิปสติกเนื้อกำมะหยี่สีชมพูกุหลาบหวานละมุน สัมผัสบางเบาสบายปาก ให้ริมฝีปากดูอวบอิ่มธรรมชาติ'
    },
    {
        id: 'velvet-02',
        name: 'Velvet Kiss #02 Cherry Red',
        price: 295,
        category: 'matte',
        rating: 4.9,
        reviewsCount: 38,
        image: 'images/velvet_kiss.png',
        tag: 'NEW ARRIVAL',
        desc: 'ลิปสติกเนื้อกำมะหยี่สีแดงเชอร์รี่สุดเซ็กซี่ ช่วยขับผิวให้สว่างเปล่งประกาย เพิ่มความมั่นใจทุกโอกาส'
    },
    {
        id: 'velvet-03',
        name: 'Velvet Kiss #03 Nude Brown',
        price: 295,
        category: 'matte',
        rating: 4.8,
        reviewsCount: 54,
        image: 'images/velvet_kiss.png',
        tag: 'NEW ARRIVAL',
        desc: 'ลิปสติกเนื้อกำมะหยี่สีน้ำตาลนู้ดสุดคลาสสิก ให้ลุคเรียบหรูดูแพง เหมาะสำหรับ Everyday Look'
    },
    {
        id: 'gift-set-val',
        name: 'Love Potion Gift Set',
        price: 699,
        category: 'set',
        rating: 5.0,
        reviewsCount: 15,
        image: 'images/hero.png',
        tag: 'EXCLSUIVE',
        desc: 'เซ็ตของขวัญสุดพิเศษรวมลิปสติกและทินต์ยอดนิยม บรรจุในกล่องสุดหรู เหมาะสำหรับคนพิเศษ'
    }
];

// Details dictionary for the Velvet Kiss Shade Showcase
const velvetShades = {
    '01': {
        id: 'velvet-01',
        name: 'Velvet Kiss #01 Rose Pink',
        code: 'Shade: #01 Rose Pink',
        desc: 'ลิปสติกเนื้อกำมะหยี่สีชมพูกุหลาบหวานละมุน พิกเมนต์แน่น สัมผัสบางเบาสบายปาก ให้ริมฝีปากดูอวบอิ่มอย่างเป็นธรรมชาติ',
        color: '#e07a5f'
    },
    '02': {
        id: 'velvet-02',
        name: 'Velvet Kiss #02 Cherry Red',
        code: 'Shade: #02 Cherry Red',
        desc: 'ลิปสติกเนื้อกำมะหยี่สีแดงเชอร์รี่สุดเซ็กซี่ ช่วยขับผิวให้สว่างเปล่งประกาย เพิ่มความมั่นใจได้ทุกโอกาส เม็ดสีชัดเจนกลบสีปากมิด',
        color: '#c9184a'
    },
    '03': {
        id: 'velvet-03',
        name: 'Velvet Kiss #03 Nude Brown',
        code: 'Shade: #03 Nude Brown',
        desc: 'ลิปสติกเนื้อกำมะหยี่สีน้ำตาลนู้ดสุดคลาสสิก ให้ลุคเรียบหรูดูแพง เหมาะสำหรับแต่งหน้า Everyday Look หรือแต่งหน้าโทนอุ่นสายฝอ',
        color: '#d4a373'
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Setup Routing from hash or default
    initRouting();
    
    // Set Mobile Navigation menu click
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Setup Velvet shade showcase click listeners
    const swatches = document.querySelectorAll('.swatch-btn');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            const shade = e.target.getAttribute('data-shade');
            selectVelvetShade(shade);
        });
    });

    // Showcase Velvet Lipstick add-to-cart button
    document.getElementById('add-velvet-btn').addEventListener('click', () => {
        const activeShadeInfo = velvetShades[state.selectedVelvetShade];
        addToCart(activeShadeInfo.id, 1, activeShadeInfo.name.split('#')[1]);
    });

    // Review Form submit listener
    const reviewForm = document.getElementById('add-review-form');
    reviewForm.addEventListener('submit', handleReviewSubmit);

    // Products page Search and Filters listeners
    document.getElementById('product-search-input').addEventListener('input', renderProductsPage);
    document.getElementById('product-sort-select').addEventListener('change', renderProductsPage);

    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            renderProductsPage();
        });
    });

    // Initialize display components
    renderBestSellers();
    renderReviews();
    renderProductsPage();
    updateCartUI();
    loadOrderSelectOptions();
    loadOrderTracking('LP25001'); // Load preset order tracking
    renderProfileData();
});

// --- SPA ROUTING ENGINE ---
function initRouting() {
    // Router logic based on location hash
    const handleHashChange = () => {
        let hash = window.location.hash.substring(1);
        if (!hash || !['home', 'products', 'cart', 'track', 'promotions', 'profile'].includes(hash)) {
            hash = 'home';
        }
        navigateTo(hash, false);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger once on load
    handleHashChange();
}

function navigateTo(pageId, updateHash = true) {
    state.currentTab = pageId;

    // Remove active classes
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Activate active tab section
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Fade in animation trigger
        setTimeout(() => {
            targetPage.style.opacity = '1';
        }, 50);
    }

    // Active active nav link
    const targetNavLink = document.querySelector(`.nav-link[data-tab="${pageId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }

    // Close mobile nav menu
    document.querySelector('.nav-menu').classList.remove('open');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash
    if (updateHash) {
        window.location.hash = pageId;
    }

    // Custom re-renders when entering specific tabs
    if (pageId === 'cart') {
        updateCartUI();
    } else if (pageId === 'track') {
        loadOrderSelectOptions();
    } else if (pageId === 'profile') {
        renderProfileData();
    }
}

// --- HOME PAGE INTERACTION ---

// Selected Velvet shade details updating
function selectVelvetShade(shade) {
    state.selectedVelvetShade = shade;
    const info = velvetShades[shade];

    // Swatches UI active update
    const swatches = document.querySelectorAll('.swatch-btn');
    swatches.forEach(sw => {
        if (sw.getAttribute('data-shade') === shade) {
            sw.classList.add('active');
        } else {
            sw.classList.remove('active');
        }
    });

    // Update details texts
    document.getElementById('velvet-title').innerText = info.name;
    document.getElementById('velvet-code').innerText = info.code;
    document.getElementById('velvet-desc').innerText = info.desc;
    
    // Update color glow effect line
    document.getElementById('swatch-glow-effect').style.backgroundColor = info.color;
}

// Render dynamic Best Sellers on Home
function renderBestSellers() {
    const container = document.getElementById('bestsellers-grid');
    if (!container) return;

    // Filter best sellers and trending
    const bestSellers = products.filter(p => p.tag === 'BEST SELLER');
    container.innerHTML = bestSellers.map(p => getProductCardHtml(p)).join('');
    attachProductCardListeners(container);
}

// Render dynamic Reviews
function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    container.innerHTML = state.reviews.map(r => `
        <div class="review-card glass-panel">
            <div class="review-user-row">
                <div class="review-avatar-text">
                    <div class="review-avatar">${r.name.substring(0, 2).toUpperCase()}</div>
                    <span class="review-name">${escapeHtml(r.name)}</span>
                </div>
                <div class="review-stars">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
                    ${'<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating)}
                </div>
            </div>
            <p class="review-comment">“${escapeHtml(r.text)}”</p>
        </div>
    `).join('');
}

// Handle review submissions
function handleReviewSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('review-name');
    const commentInput = document.getElementById('review-text');
    const ratingRadio = document.querySelector('input[name="rating"]:checked');

    if (!nameInput.value || !commentInput.value) return;

    const newReview = {
        name: nameInput.value.trim(),
        rating: parseInt(ratingRadio.value),
        text: commentInput.value.trim()
    };

    state.reviews.unshift(newReview);
    renderReviews();

    // Reset Form
    nameInput.value = '';
    commentInput.value = '';
    document.getElementById('star5').checked = true;

    showToast('ขอบคุณสำหรับความคิดเห็นของท่าน! 💖');
}

// --- PRODUCTS PAGE ---

function renderProductsPage() {
    const container = document.getElementById('all-products-grid');
    if (!container) return;

    const searchVal = document.getElementById('product-search-input').value.toLowerCase().trim();
    const activeCategoryBtn = document.querySelector('.category-btn.active');
    const category = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-category') : 'all';
    const sortVal = document.getElementById('product-sort-select').value;

    let filtered = products;

    // 1. Filter by Search Query
    if (searchVal) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal) || p.desc.toLowerCase().includes(searchVal));
    }

    // 2. Filter by Category
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // 3. Sort
    if (sortVal === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<p class="empty-state-text w-100 text-center">ไม่พบสินค้าตามเงื่อนไขค้นหา</p>`;
        return;
    }

    container.innerHTML = filtered.map(p => getProductCardHtml(p)).join('');
    attachProductCardListeners(container);
}

// Generate Product Card HTML template
function getProductCardHtml(p) {
    const isWishlisted = state.wishlist.has(p.id);
    const wishClass = isWishlisted ? 'active' : '';
    const heartIcon = isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    
    return `
        <div class="product-card" data-id="${p.id}">
            <div class="card-img-wrapper">
                <img src="${p.image}" alt="${p.name}">
                <button class="wishlist-btn ${wishClass}" aria-label="Add to wishlist" data-wishlist-id="${p.id}">
                    <i class="${heartIcon}"></i>
                </button>
                ${p.tag ? `<div class="card-badge-promo">${p.tag}</div>` : ''}
            </div>
            <div class="card-info">
                <span class="card-category">${p.category === 'matte' ? 'ลิปสติกเนื้อแมตต์' : p.category === 'tint' ? 'ลิปทินต์' : p.category === 'gloss' ? 'ลิปกลอส' : 'เซ็ตของขวัญ'}</span>
                <h3 class="card-title">${p.name}</h3>
                <div class="card-rating">
                    <i class="fa-solid fa-star"></i> 
                    <span>${p.rating} (${p.reviewsCount} รีวิว)</span>
                </div>
                <div class="card-footer">
                    <span class="card-price">${p.price} บาท</span>
                    <button class="btn btn-primary btn-xs btn-add-to-cart" data-cart-id="${p.id}">
                        <i class="fa-solid fa-cart-plus"></i> ใส่ตะกร้า
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Bind event listeners to dynamic product cards
function attachProductCardListeners(container) {
    // Add to Cart buttons
    container.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.currentTarget.getAttribute('data-cart-id');
            const item = products.find(p => p.id === id);
            addToCart(item.id, 1, item.name.includes('#') ? item.name.split('#')[1] : null);
        });
    });

    // Wishlist buttons
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.currentTarget.getAttribute('data-wishlist-id');
            toggleWishlist(id);
        });
    });
}

// --- CART LOGIC & DYNAMIC STATE ---

function addToCart(productId, quantity = 1, shade = null) {
    const catalogItem = products.find(p => p.id === productId);
    if (!catalogItem) return;

    // Check if item with exact product ID and shade is already in cart
    const cartItem = state.cart.find(c => c.id === productId && c.shade === shade);
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        state.cart.push({
            id: catalogItem.id,
            name: catalogItem.name,
            price: catalogItem.price,
            quantity: quantity,
            shade: shade || 'Standard',
            image: catalogItem.image
        });
    }

    showToast(`เพิ่ม ${catalogItem.name} ลงในตะกร้าแล้ว! 🛒`);
    updateCartUI();
}

function updateQuantity(id, shade, delta) {
    const item = state.cart.find(c => c.id === id && c.shade === shade);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(id, shade);
    } else {
        updateCartUI();
    }
}

function removeFromCart(id, shade) {
    state.cart = state.cart.filter(c => !(c.id === id && c.shade === shade));
    updateCartUI();
    showToast('ลบสินค้าออกจากตะกร้าแล้ว 🗑️');
}

function clearCart() {
    state.cart = [];
    updateCartUI();
    showToast('ล้างตะกร้าเรียบร้อยแล้ว');
}

// Calculate cart values and render items
function updateCartUI() {
    // 1. Badge count
    const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
        badge.innerText = totalItemsCount;
        if (totalItemsCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }

    // Rendering inside the cart page
    const itemsContainer = document.getElementById('cart-items-container');
    if (!itemsContainer) return;

    if (state.cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="glass-panel text-center padding-50 w-100">
                <i class="fa-solid fa-cart-flatbed" style="font-size: 3rem; color: var(--text-muted); opacity: 0.5; margin-bottom: 15px;"></i>
                <p class="empty-state-text">ตะกร้าสินค้าว่างเปล่าอยู่ ช้อปสินค้าของเราได้เลย!</p>
                <button class="btn btn-primary btn-sm mt-3" onclick="navigateTo('products')">ไปหน้ารายการสินค้า</button>
            </div>
        `;
        document.getElementById('summary-subtotal').innerText = '0 บาท';
        document.getElementById('summary-total').innerText = '0 บาท';
        document.getElementById('summary-shipping').innerText = '0 บาท';
        document.getElementById('applied-discounts-container').innerHTML = '';
        return;
    }

    // Render list of cart items
    itemsContainer.innerHTML = state.cart.map(c => `
        <div class="cart-item-card">
            <div class="cart-item-img">
                <img src="${c.image}" alt="${c.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${c.name}</h4>
                <p class="cart-item-shade">เฉดสี: ${c.shade}</p>
                <p class="cart-item-price-unit">${c.price} บาท</p>
            </div>
            <div class="qty-adjuster">
                <button class="qty-btn" onclick="updateQuantity('${c.id}', '${c.shade}', -1)"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-number">${c.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${c.id}', '${c.shade}', 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <div class="cart-item-price-total">
                ${c.price * c.quantity} บาท
            </div>
            <button class="cart-item-remove-btn" onclick="removeFromCart('${c.id}', '${c.shade}')" aria-label="Remove item">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `).join('');

    calculateTotals();
}

// Calculate totals, discounts (coupon, loyalty points)
function calculateTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shipping = 50; // Standard shipping is 50 THB
    let discountSum = 0;
    const discountTagsHtml = [];

    // Apply Coupon Code: LOVE10 -> 10% Discount
    if (state.appliedCoupons.includes('LOVE10')) {
        const value = Math.round(subtotal * 0.10);
        discountSum += value;
        discountTagsHtml.push(`
            <div class="discount-tag">
                <span>คูปองส่วนลด 10% (LOVE10)</span>
                <span>- ${value} บาท <button onclick="removeCoupon('LOVE10')">&times;</button></span>
            </div>
        `);
    }

    // Apply Coupon Code: FREESHIP -> Shipping = 0
    if (state.appliedCoupons.includes('FREESHIP')) {
        shipping = 0;
        discountTagsHtml.push(`
            <div class="discount-tag">
                <span>คูปองส่งฟรี (FREESHIP)</span>
                <span>- 50 บาท <button onclick="removeCoupon('FREESHIP')">&times;</button></span>
            </div>
        `);
    }

    // Apply Member Loyalty Points Discount (1,000 points = 100 THB)
    if (state.pointsRedeemed) {
        discountSum += 100;
        discountTagsHtml.push(`
            <div class="discount-tag">
                <span>คะแนนสะสม 1,000 แต้ม</span>
                <span>- 100 บาท <button onclick="removePointsDiscount()">&times;</button></span>
            </div>
        `);
        document.getElementById('redeem-points-btn').classList.add('active');
        document.getElementById('redeem-points-btn').innerText = 'ยกเลิกใช้สิทธิ์ส่วนลด';
    } else {
        document.getElementById('redeem-points-btn').classList.remove('active');
        document.getElementById('redeem-points-btn').innerText = 'แลกส่วนลด 100 บาท';
    }

    const finalTotal = Math.max(0, subtotal - discountSum + shipping);

    // Update text fields
    document.getElementById('summary-subtotal').innerText = `${subtotal} บาท`;
    document.getElementById('summary-shipping').innerText = `${shipping} บาท`;
    document.getElementById('summary-total').innerText = `${finalTotal} บาท`;
    document.getElementById('applied-discounts-container').innerHTML = discountTagsHtml.join('');

    // Update User Profile Point Balances displayed in the summary box
    document.getElementById('summary-user-points').innerText = state.user.points.toLocaleString();
}

// Promo Code Inputs
function applyPromoCode() {
    const input = document.getElementById('promo-code-input');
    const feedback = document.getElementById('promo-feedback');
    const code = input.value.toUpperCase().trim();

    if (!code) return;

    feedback.className = 'promo-feedback-msg'; // clear class list
    
    if (code === 'LOVE10') {
        if (state.appliedCoupons.includes('LOVE10')) {
            feedback.innerText = 'คูปองนี้ได้รับการใช้งานแล้ว';
            feedback.classList.add('error');
        } else {
            state.appliedCoupons.push('LOVE10');
            feedback.innerText = 'รหัสคูปองส่วนลด 10% ใช้ได้สำเร็จ!';
            feedback.classList.add('success');
            calculateTotals();
        }
    } else if (code === 'FREESHIP') {
        if (state.appliedCoupons.includes('FREESHIP')) {
            feedback.innerText = 'คูปองส่งฟรีได้รับการใช้งานแล้ว';
            feedback.classList.add('error');
        } else {
            state.appliedCoupons.push('FREESHIP');
            feedback.innerText = 'รหัสคูปองส่งฟรีใช้ได้สำเร็จ!';
            feedback.classList.add('success');
            calculateTotals();
        }
    } else {
        feedback.innerText = 'รหัสคูปองไม่ถูกต้อง';
        feedback.classList.add('error');
    }

    input.value = '';
}

function removeCoupon(code) {
    state.appliedCoupons = state.appliedCoupons.filter(c => c !== code);
    calculateTotals();
    showToast('ลบคูปองส่วนลดเรียบร้อยแล้ว');
}

function togglePointsRedemption() {
    if (state.pointsRedeemed) {
        removePointsDiscount();
    } else {
        if (state.user.points >= 1000) {
            state.pointsRedeemed = true;
            calculateTotals();
            showToast('ใช้ส่วนลดคะแนนสะสม 100 บาท 🪙');
        } else {
            showToast('คะแนนสะสมคงเหลือไม่เพียงพอ (ต้องการ 1,000 คะแนน)');
        }
    }
}

function removePointsDiscount() {
    state.pointsRedeemed = false;
    calculateTotals();
    showToast('ยกเลิกใช้ส่วนลดคะแนนสะสม');
}

// Checkout Button Click Handler
function processCheckout() {
    if (state.cart.length === 0) {
        showToast('กรุณาเลือกซื้อสินค้าก่อนชำระเงิน');
        return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shipping = 50;
    let discountSum = 0;

    if (state.appliedCoupons.includes('LOVE10')) {
        discountSum += Math.round(subtotal * 0.10);
    }
    if (state.appliedCoupons.includes('FREESHIP')) {
        shipping = 0;
    }
    if (state.pointsRedeemed) {
        discountSum += 100;
        state.user.points -= 1000; // Deduct the points now!
    }

    const totalCost = Math.max(0, subtotal - discountSum + shipping);
    
    // Add shopping points for the checkout (1 THB spent = 1 point earned)
    const pointsEarned = totalCost;
    state.user.points += pointsEarned;

    // Generate Order ID sequential/random
    const newOrderId = `LP25${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = {
        id: newOrderId,
        date: new Date().toISOString().split('T')[0],
        items: state.cart.map(c => ({ name: c.name, quantity: c.quantity, price: c.price, shade: c.shade })),
        subtotal: subtotal,
        shipping: shipping,
        discount: discountSum,
        total: totalCost,
        statusStep: 1, // Start at Paid state
        statusText: 'ชำระเงินแล้ว',
        estArrival: 'คาดว่าจะถึงภายใน 3 วัน'
    };

    // Store Order
    state.orders.unshift(newOrder);

    // Reset Cart Status
    state.cart = [];
    state.appliedCoupons = [];
    state.pointsRedeemed = false;

    // Notify user
    showToast(`สั่งซื้อเรียบร้อย! คำสั่งซื้อ: ${newOrderId} รับเพิ่ม +${pointsEarned} คะแนน 💖`);

    // Switch view to Tracking page
    navigateTo('track');
    loadOrderSelectOptions();
    loadOrderTracking(newOrderId);
}

// --- ORDER TRACKING SIMULATOR ---

function loadOrderSelectOptions() {
    const select = document.getElementById('tracking-order-select');
    if (!select) return;

    select.innerHTML = state.orders.map(o => `
        <option value="${o.id}">${o.id} - ${o.statusText} (${o.total} บาท)</option>
    `).join('');
}

function loadOrderTracking(orderId) {
    const dashboard = document.getElementById('tracking-dashboard-content');
    if (!dashboard) return;

    const order = state.orders.find(o => o.id === orderId);
    if (!order) {
        dashboard.innerHTML = `<p class="empty-state-text">กรุณาเลือกคำสั่งซื้อเพื่อติดตามสถานะ</p>`;
        return;
    }

    // Set select value match
    const select = document.getElementById('tracking-order-select');
    if (select) select.value = orderId;

    // Prepare steps
    const step1Class = order.statusStep >= 1 ? (order.statusStep === 1 ? 'active' : 'completed') : '';
    const step2Class = order.statusStep >= 2 ? (order.statusStep === 2 ? 'active' : 'completed') : '';
    const step3Class = order.statusStep >= 3 ? (order.statusStep === 3 ? 'active' : 'completed') : '';
    const step4Class = order.statusStep >= 4 ? (order.statusStep === 4 ? 'active' : 'completed') : '';

    // Status timeline line progress width
    let progressWidth = 0;
    if (order.statusStep === 1) progressWidth = 0;
    else if (order.statusStep === 2) progressWidth = 33;
    else if (order.statusStep === 3) progressWidth = 66;
    else if (order.statusStep === 4) progressWidth = 100;

    // Items list markup
    const itemsListHtml = order.items.map(i => `
        <li>${i.name} ${i.shade && i.shade !== 'Standard' ? `(${i.shade})` : ''} &times; ${i.quantity}</li>
    `).join('');

    dashboard.innerHTML = `
        <div class="order-info-card glass-panel">
            <div class="flex-row justify-between align-center">
                <h3>คำสั่งซื้อ #${order.id}</h3>
                <span class="status-tag ${order.statusStep === 4 ? 'success' : 'shipping'}">${order.statusText}</span>
            </div>

            <div class="order-info-grid">
                <div class="info-block">
                    <span class="label">วันที่สั่งซื้อ</span>
                    <span class="val">${order.date}</span>
                </div>
                <div class="info-block">
                    <span class="label">รายการสินค้า</span>
                    <ul class="val history-items-list" style="list-style: none; padding-left: 0;">
                        ${itemsListHtml}
                    </ul>
                </div>
                <div class="info-block">
                    <span class="label">ยอดชำระสุทธิ</span>
                    <span class="val">${order.total} บาท</span>
                </div>
                <div class="info-block">
                    <span class="label">การจัดส่ง</span>
                    <span class="val">${order.estArrival}</span>
                </div>
            </div>

            <!-- Steps Visual Tracker -->
            <div class="timeline-container">
                <div class="timeline-line">
                    <div class="timeline-line-progress" style="width: ${progressWidth}%;"></div>
                </div>
                <div class="timeline-steps">
                    <div class="timeline-step ${step1Class}">
                        <div class="step-icon"><i class="fa-solid fa-wallet"></i></div>
                        <span class="step-title">ชำระเงินแล้ว</span>
                    </div>
                    <div class="timeline-step ${step2Class}">
                        <div class="step-icon"><i class="fa-solid fa-box-open"></i></div>
                        <span class="step-title">กำลังแพ็คสินค้า</span>
                    </div>
                    <div class="timeline-step ${step3Class}">
                        <div class="step-icon"><i class="fa-solid fa-truck"></i></div>
                        <span class="step-title">อยู่ระหว่างจัดส่ง</span>
                    </div>
                    <div class="timeline-step ${step4Class}">
                        <div class="step-icon"><i class="fa-solid fa-house-chimney-user"></i></div>
                        <span class="step-title">จัดส่งสำเร็จ</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Truck animation block, active only when status is Shipping (Step 3) -->
        ${order.statusStep === 3 ? `
            <div class="shipping-animation-container">
                <h4 style="text-align: center; margin-bottom: 10px;">🚚 พัสดุของคุณกำลังเดินทางอยู่บนถนนงามวงศ์วาน</h4>
                <div class="shipping-track-road">
                    <div class="truck-graphic"><i class="fa-solid fa-truck-fast"></i></div>
                </div>
            </div>
        ` : ''}
    `;
}

// Fast forward simulator
function advanceOrderStatusSim() {
    const select = document.getElementById('tracking-order-select');
    if (!select || !select.value) return;

    const orderId = select.value;
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.statusStep < 4) {
        order.statusStep += 1;
        
        // Update states texts
        if (order.statusStep === 2) {
            order.statusText = 'กำลังแพ็คสินค้า';
            order.estArrival = 'คาดว่าจะถึงภายใน 2-3 วัน';
        } else if (order.statusStep === 3) {
            order.statusText = 'อยู่ระหว่างจัดส่ง';
            order.estArrival = 'คาดว่าจะถึงภายใน 2 วัน';
        } else if (order.statusStep === 4) {
            order.statusText = 'จัดส่งสำเร็จ';
            order.estArrival = 'พัสดุจัดส่งถึงผู้รับเรียบร้อยแล้ว';
        }

        loadOrderSelectOptions();
        loadOrderTracking(orderId);
        showToast(`อัปเดตสถานะของคำสั่งซื้อ ${orderId} แล้ว!`);
    } else {
        showToast('คำสั่งซื้อจัดส่งสำเร็จแล้ว ไม่สามารถอัปเกรดสถานะได้อีก');
    }
}

// --- PROMOTIONS REDEEM SYSTEM ---

function redeemPointsForCoupon() {
    if (state.user.points >= 1000) {
        state.user.points -= 1000;
        showToast('แลกส่วนลดเงินสด 100 บาทสำเร็จ! ได้เพิ่มคูปองลงในหน้าตะกร้าของท่านแล้ว 🪙');
        state.pointsRedeemed = true; // Apply automatically to cart
        renderProfileData();
        
        // Animate count labels
        document.getElementById('reward-current-points').innerText = state.user.points;
        const widthPercent = Math.min(100, (state.user.points / 2000) * 100);
        document.getElementById('points-progress-bar').style.width = `${widthPercent}%`;
    } else {
        showToast('คะแนนสะสมของคุณยังไม่ถึง 1,000 คะแนน');
    }
}

function copyCouponCode(code, btn) {
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'คัดลอกแล้ว!';
        btn.classList.add('btn-secondary');
        btn.classList.remove('btn-primary');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
        }, 2000);
        showToast(`คัดลอกรหัสคูปอง ${code} เรียบร้อย!`);
    }).catch(err => {
        showToast(`ไม่สามารถคัดลอกได้อัตโนมัติ รหัสคูปองคือ: ${code}`);
    });
}

// --- PROFILE CONTROLS ---

function renderProfileData() {
    // 1. Point labels
    document.getElementById('profile-stat-points').innerText = state.user.points.toLocaleString();
    document.getElementById('reward-current-points').innerText = state.user.points.toLocaleString();
    document.getElementById('profile-stat-orders').innerText = state.orders.length;
    document.getElementById('profile-stat-wishlist').innerText = state.wishlist.size;

    // 2. Name details
    document.getElementById('profile-display-name').innerText = state.user.username;

    // 3. Current shipping address
    const addr = state.user.address;
    document.getElementById('address-summary').innerHTML = `
        <strong>${escapeHtml(addr.name)}</strong><br>
        ${escapeHtml(addr.detail)} จังหวัด${escapeHtml(addr.province)} ${escapeHtml(addr.zip)}<br>
        เบอร์โทร: ${escapeHtml(addr.phone)}
    `;

    // 4. Points Progress bar update
    const widthPercent = Math.min(100, (state.user.points / 2000) * 100);
    document.getElementById('points-progress-bar').style.width = `${widthPercent}%`;

    // 5. Order History rendering
    const historyList = document.getElementById('order-history-list');
    if (historyList) {
        if (state.orders.length === 0) {
            historyList.innerHTML = `<p class="empty-state-text">คุณยังไม่มีประวัติการสั่งซื้อ</p>`;
        } else {
            historyList.innerHTML = state.orders.map(o => {
                const totalItemsCount = o.items.reduce((sum, i) => sum + i.quantity, 0);
                const itemsSummary = o.items.map(i => `${i.name} (${i.quantity})`).join(', ');
                
                return `
                    <div class="order-history-card">
                        <div class="history-card-header">
                            <span class="order-num">คำสั่งซื้อ #${o.id}</span>
                            <span class="status-tag ${o.statusStep === 4 ? 'success' : 'shipping'}">${o.statusText}</span>
                        </div>
                        <div class="history-card-body">
                            <div class="history-items-list">
                                <p style="font-weight: 500; color: var(--text-dark);">${itemsSummary}</p>
                                <p style="font-size: 0.8rem; margin-top: 4px;">สั่งซื้อเมื่อ: ${o.date} (${totalItemsCount} ชิ้น)</p>
                            </div>
                            <span class="history-card-total">${o.total} บาท</span>
                        </div>
                        <div style="text-align: right;">
                            <button class="btn btn-outline btn-xs" onclick="navigateTo('track'); loadOrderTracking('${o.id}')">ติดตามสถานะ</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 6. Wishlist favorites rendering
    renderWishlistProfile();
}

function switchProfileTab(tabId, btn) {
    // Buttons active state
    const navBtns = document.querySelectorAll('.quick-nav-btn');
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Tab sections active state
    const tabs = document.querySelectorAll('.profile-sub-tab');
    tabs.forEach(t => t.classList.remove('active'));

    const activeTab = document.getElementById(`profile-sub-${tabId}`);
    if (activeTab) activeTab.classList.add('active');
}

// Shipping Address editing toggler
function toggleAddressEdit() {
    const displayView = document.getElementById('address-display-view');
    const editView = document.getElementById('address-edit-view');
    const editBtn = document.getElementById('edit-address-btn');

    if (editView.classList.contains('hidden')) {
        editView.classList.remove('hidden');
        displayView.classList.add('hidden');
        editBtn.style.display = 'none';

        // Load current state info to form
        const addr = state.user.address;
        document.getElementById('addr-name').value = addr.name;
        document.getElementById('addr-detail').value = addr.detail;
        document.getElementById('addr-province').value = addr.province;
        document.getElementById('addr-zip').value = addr.zip;
        document.getElementById('addr-phone').value = addr.phone;
    } else {
        editView.classList.add('hidden');
        displayView.classList.remove('hidden');
        editBtn.style.display = 'inline-block';
    }
}

// Save Address Changes
function saveAddress(e) {
    e.preventDefault();
    state.user.address = {
        name: document.getElementById('addr-name').value.trim(),
        detail: document.getElementById('addr-detail').value.trim(),
        province: document.getElementById('addr-province').value.trim(),
        zip: document.getElementById('addr-zip').value.trim(),
        phone: document.getElementById('addr-phone').value.trim()
    };
    toggleAddressEdit();
    renderProfileData();
    showToast('บันทึกที่อยู่จัดส่งเรียบร้อย! 📍');
}

// Save Settings Form
function saveSettings(e) {
    e.preventDefault();
    const newUsername = document.getElementById('settings-username').value.trim();
    const newEmail = document.getElementById('settings-email').value.trim();
    const newPhone = document.getElementById('settings-phone').value.trim();

    if (!newUsername) return;

    state.user.username = newUsername;
    state.user.email = newEmail;
    state.user.phone = newPhone;

    renderProfileData();
    showToast('บันทึกข้อมูลบัญชีผู้ใช้แล้ว ⚙️');
}

// Wishlist Toggles
function toggleWishlist(productId) {
    if (state.wishlist.has(productId)) {
        state.wishlist.delete(productId);
        showToast('ลบสินค้าออกจากความพึงใจ 💔');
    } else {
        state.wishlist.add(productId);
        showToast('เพิ่มสินค้าถูกใจในรายการโปรดแล้ว! ❤️');
    }
    
    // Update active layouts
    renderProductsPage();
    renderBestSellers();
    renderProfileData();
}

function renderWishlistProfile() {
    const container = document.getElementById('favorites-grid-container');
    if (!container) return;

    if (state.wishlist.size === 0) {
        container.innerHTML = `<p class="empty-state-text">ยังไม่มีสินค้าที่คุณถูกใจ กดหัวใจที่หน้ารายการสินค้าได้เลย!</p>`;
        return;
    }

    const wishlistProducts = products.filter(p => state.wishlist.has(p.id));
    container.innerHTML = `<div class="products-grid">${wishlistProducts.map(p => getProductCardHtml(p)).join('')}</div>`;
    
    // Bind card listeners inside profile subtab too
    attachProductCardListeners(container.querySelector('.products-grid'));
}

// --- UTILITY ENGINE ---

// Float Toast Message
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.remove('hidden');
    // Allow animation layout trigger
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Fade out timer
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 400);
    }, 3000);
}

// Escapes dynamic variables values for secure HTML injection
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Fallback generator for broken images
function handleImageError(img) {
    const parent = img.parentNode;
    if (!parent) return;

    // Create a beautiful placeholder div
    const placeholder = document.createElement('div');
    placeholder.className = 'img-placeholder-fallback';
    placeholder.style.width = '100%';
    placeholder.style.height = '100%';
    placeholder.style.display = 'flex';
    placeholder.style.flexDirection = 'column';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.background = 'linear-gradient(135deg, #ffe5e9 0%, #ffd3da 100%)';
    placeholder.style.color = '#ff4d6d';
    placeholder.style.fontSize = '0.9rem';
    placeholder.style.fontWeight = '600';
    placeholder.style.padding = '20px';
    placeholder.style.textAlign = 'center';
    placeholder.style.border = '1px dashed rgba(255, 77, 109, 0.3)';
    placeholder.style.borderRadius = 'inherit';
    placeholder.style.minHeight = img.height ? `${img.height}px` : '200px';
    
    // Get alternate text
    const altText = img.alt || 'Cosmetics Product';
    placeholder.innerHTML = `
        <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 2.2rem; margin-bottom: 10px; opacity: 0.8;"></i>
        <span>${altText}</span>
        <span style="font-size: 0.7rem; opacity: 0.6; margin-top: 5px; font-weight: normal;">(ไม่พบไฟล์รูปภาพ)</span>
    `;

    // Replace the image element
    parent.replaceChild(placeholder, img);
}

// Catch image errors globally in capturing phase
window.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        handleImageError(event.target);
    }
}, true);
