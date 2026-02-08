/* ============================================
   SPLASH SCREEN – runs immediately (IIFE)
   ============================================ */
(function initSplash() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    // Letter-by-letter title reveal
    const titleEl = document.getElementById('splash-title');
    if (titleEl) {
        const text = 'LAS ALITAS DEL VAMPIRO';
        text.split('').forEach((ch, i) => {
            const span = document.createElement('span');
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            span.style.animationDelay = `${0.6 + i * 0.05}s`;
            titleEl.appendChild(span);
        });
    }

    const MIN_DISPLAY = 2500;           // 2.5 seconds minimum
    const startTime = Date.now();

    function hideSplash() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY - elapsed);

        setTimeout(() => {
            splash.classList.add('splash-hide');
            setTimeout(() => splash.remove(), 600);
        }, remaining);
    }

    if (document.readyState === 'complete') {
        hideSplash();
    } else {
        window.addEventListener('load', hideSplash);
    }
})();

/* ============================================
   SCROLL REVEAL – IntersectionObserver
   ============================================ */
(function initReveal() {
    function setup() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        els.forEach(el => observer.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();

/* ============================================
   MAIN APPLICATION LOGIC (unchanged business logic)
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: "Costillas - 1/2 kg", img: "https://i.imgur.com/Z39P8Ur.jpeg", price: 130, includes: "Un deleite para los amantes de la carne." },
        { name: "Costillas - 1 kg", img: "https://i.imgur.com/Z39P8Ur.jpeg", price: 250, includes: "Disfruta del doble de placer con nuestras costillas tiernas y jugosas." },
        { name: "Alitas", img: "https://i.imgur.com/9huXWxh.jpeg", price: 70, includes: "Alitas doradas y crujientes, el antojo ideal en cualquier momento." },
        { name: "Alitas con papas", img: "https://i.imgur.com/uLVE08v.jpeg", price: 90, includes: "Nuestras deliciosas Alitas con una porción de papas a la francesa ¡pruébalas!" },
        { name: "Chamorro", img: "https://i.imgur.com/ZP2mkM6.jpeg", price: 120, includes: "Preparado lentamente hasta lograr una textura perfecta." },
        { name: "Chamorro con Papas", img: "https://i.imgur.com/2nKdRXh.jpeg", price: 150, includes: "Nuestro suculento chamorro acompañado de una ración de papas a la francesa." },
        { name: "Papas a la Francesa", img: "https://i.imgur.com/vFdmSf3.png", price: 45, includes: "Disfruta de nuestras papas a la francesa, doradas y crujientes." },
        { name: "Michelada", img: "https://i.imgur.com/2brYSb2.jpeg", price: 90, includes: "La combinación perfecta de cerveza fría con un toque picante y cítrico." },
        { name: "Michelada con Clamato", img: "https://i.imgur.com/2brYSb2.jpeg", price: 120, includes: "Eleva tu michelada con un golpe de jugo de clamato, para un sabor más rico y profundo." },
        { name: "Michelada con Camarón", img: "https://i.imgur.com/2brYSb2.jpeg", price: 150, includes: "Disfruta de una michelada especial con camarones frescos. Simplemente lo mejor." },
        { name: "Blue o Pitufos", img: "https://i.imgur.com/W2cSmwD.jpeg", price: 80, includes: "Sumérgete en el sabor de nuestra bebida azul, una mezcla refrescante y dulce que te encantará." },
        { name: "Soda Italiana", img: "https://i.imgur.com/hvFQM6K.png", price: 60, includes: "Prueba nuestras sodas italianas, vibrantes y refrescantes." },
        { name: "Cerillo", img: "https://i.imgur.com/B2rz8Fn.png", price: 35, includes: "Una pequeña pero poderosa explosión de sabor." },
        { name: "Cerillo lata Grande", img: "https://i.imgur.com/RzNzcOj.png", price: 55, includes: "Más refrescante para saciar esa sed (de la mala)." },
        { name: "Refresco", img: "https://i.imgur.com/IxCc0m8.png", price: 25, includes: "" },
        { name: "Salsa Pastor", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa BBQ Diabla", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Frutos Rojos", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Tamarindo Habanero", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Cajun", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Búfalo", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Fresa Hot", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Maracuyá Habanero", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Flamin' Hot", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Crema de Habanero", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Queso Jalapeño", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Zarzamora Chipotle", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Mango Habanero", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
        { name: "Salsa Chetos", img: "https://i.imgur.com/MI5oH8w.jpeg", price: 0, includes: "" },
    ];

    const cart = [];
    let total = 0;
    let discountApplied = false;
    let selectedProduct = null;

    function createProductElement(product, index, layout = 'vertical') {
        const productItem = document.createElement('div');
        if (layout === 'horizontal') {
            productItem.classList.add('horizontal-product-item');
            productItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-item-content">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <p>${product.includes}</p>
                    <select id="quantity-${layout}-${index}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <p><button class="choose-btn" onclick="window.showProductModal(${index}, '${layout}')">Elegir</button></p>
                </div>
            `;
        } else {
            productItem.classList.add('vertical-product-item');
            productItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="scroll-menu-item-content">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <p>${product.includes}</p>
                    <select id="quantity-${layout}-${index}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <p><button class="choose-btn" onclick="window.showProductModal(${index}, '${layout}')">Elegir</button></p>
                </div>
            `;
        }
        return productItem;
    }

    function displayProducts(productsToDisplay, layout = 'vertical') {
        const menu = layout === 'horizontal' ? document.getElementById('menu-horizontal') : document.getElementById('menu');
        menu.innerHTML = '';
        productsToDisplay.forEach((product, index) => {
            menu.appendChild(createProductElement(product, index, layout));
        });
    }

    window.showProductModal = function (index, layout = 'vertical') {
        const productList = layout === 'horizontal' ? topProducts : products;
        const quantitySelect = document.getElementById(`quantity-${layout}-${index}`);
        const quantity = parseInt(quantitySelect.value);
        selectedProduct = { ...productList[index], quantity };

        const modalContent = document.getElementById('product-modal-content');
        modalContent.innerHTML = `
            <h3>${selectedProduct.name}</h3>
            <img src="${selectedProduct.img}" alt="${selectedProduct.name}" style="width: 100px; height: 100px;">
            <p style="color: var(--text-color);">Precio: $${selectedProduct.price.toFixed(2)}</p>
            <p style="color: var(--text-color);">${selectedProduct.includes}</p>
            <p style="color: var(--text-color);">Cantidad: ${selectedProduct.quantity}</p>
        `;

        toggleProductModal();
    };

    window.addProductToCart = function () {
        const existingProduct = cart.find(item => item.name === selectedProduct.name);

        if (existingProduct) {
            existingProduct.quantity += selectedProduct.quantity;
        } else {
            cart.push({ name: selectedProduct.name, price: selectedProduct.price, quantity: selectedProduct.quantity });
        }

        updateCart();
        toggleProductModal();
        alert(`Producto agregado al carrito: ${selectedProduct.name} x ${selectedProduct.quantity}`);
    };

    function updateCart() {
        const cartItemsSection = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const paypalForm = document.getElementById('paypal-form');
        const whatsappBtn = document.getElementById('whatsapp-btn');
        const editCartItems = document.getElementById('edit-cart-items');

        cartItemsSection.innerHTML = '';
        editCartItems.innerHTML = '';
        total = 0;

        cart.forEach((item, index) => {
            cartItemsSection.innerHTML += `<p>${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>`;
            editCartItems.innerHTML += `
                <p>
                    ${item.name} - 
                    <button class="quantity-btn" onclick="window.decreaseQuantity(${index})">-</button>
                    ${item.quantity}
                    <button class="quantity-btn" onclick="window.increaseQuantity(${index})">+</button>
                    = $${(item.price * item.quantity).toFixed(2)}
                    <button onclick="window.removeCartItem(${index})">Eliminar</button>
                </p>`;
            total += item.price * item.quantity;
        });

        if (discountApplied) {
            total *= 0.5; // Apply 50% discount
        }

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        updatePayPalForm();
        updateWhatsAppLink();
    }

    window.increaseQuantity = function (index) {
        cart[index].quantity += 1;
        updateCart();
    };

    window.decreaseQuantity = function (index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            window.removeCartItem(index);
        }
        updateCart();
    };

    window.removeCartItem = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    function updatePayPalForm() {
        const paypalForm = document.getElementById('paypal-form');
        paypalForm.innerHTML = `
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                <input type="hidden" name="cmd" value="_xclick" />
                <input type="hidden" name="business" value="las.alitas.del.vampiro1@gmail.com" />
                <input type="hidden" name="currency_code" value="MXN" />
                <input type="hidden" name="amount" value="${total.toFixed(2)}" />
                <input type="hidden" name="item_name" value="${cart.map(item => `${item.name} (${item.quantity})`).join(', ')}" />
                <input type="image" src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/silver-pill-paypal-44px.png" border="0" name="submit" title="Pay with PayPal" alt="PayPal - The safer, easier way to pay online!" />
            </form>
        `;
    }

    function updateWhatsAppLink() {
        const whatsappBtn = document.getElementById('whatsapp-btn');
        const selectedPaymentMethod = getSelectedPaymentMethod();
        const selectedDeliveryMethod = getSelectedDeliveryMethod();
        const deliveryAddress = document.getElementById('delivery-address').value.trim();
        const orderNotes = document.getElementById('order-notes').value.trim();
        const message = `Orden para Las Alitas Del Vampiro:\n${cart.map(item => `${item.name} (${item.quantity}) - $${item.price} c/u`).join('\n')}\nTotal: $${total.toFixed(2)}\nMétodo de pago: ${selectedPaymentMethod}\nMétodo de entrega: ${selectedDeliveryMethod}\nDirección de entrega: ${deliveryAddress}\nNotas: ${orderNotes}`;
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/526313400977?text=${encodedMessage}`;
        whatsappBtn.style.display = total > 0 ? 'inline-flex' : 'none';
    }

    function getSelectedPaymentMethod() {
        return document.querySelector('input[name="payment-method"]:checked').value;
    }

    function getSelectedDeliveryMethod() {
        return document.querySelector('input[name="delivery-method"]:checked').value;
    }

    document.querySelectorAll('input[name="payment-method"], input[name="delivery-method"]').forEach(input => {
        input.addEventListener('change', updateWhatsAppLink);
    });

    window.clearCart = function () {
        cart.length = 0;
        discountApplied = false; // Reset discount when cart is cleared
        updateCart();
    };

    window.applyDiscount = function () {
        const discountCodeInput = document.getElementById('discount-code');
        const discountCode = discountCodeInput.value.trim().toLowerCase();

        if (discountCode === "lasalitasdelvampiro") {
            discountApplied = true;
            alert("¡Código de descuento aplicado! 50% de descuento en tu pedido.");
        } else if (discountCode === "elvampiro") {
            applyBOGODiscount();
            alert("¡Código de descuento aplicado! Compra uno y obtén uno gratis.");
        } else {
            discountApplied = false;
            alert("Código de descuento no válido.");
        }
        updateCart();
    };

    function applyBOGODiscount() {
        if (cart.length > 0) {
            // Find the most expensive item in the cart
            let maxPrice = Math.max(...cart.map(item => item.price));
            let mostExpensiveItem = cart.find(item => item.price === maxPrice);

            if (mostExpensiveItem) {
                // Add a free item to the cart (same item as the most expensive one)
                cart.push({
                    name: `${mostExpensiveItem.name} (Gratis)`,
                    price: 0, // Free item
                    quantity: 1
                });
            }
        }
    }

    window.toggleDiscountModal = function () {
        const discountModal = document.getElementById('discount-modal');
        discountModal.style.display = discountModal.style.display === 'block' ? 'none' : 'block';
    };

    window.toggleProductModal = function () {
        const productModal = document.getElementById('product-modal');
        productModal.style.display = productModal.style.display === 'block' ? 'none' : 'block';
    };

    // Display top 6 most expensive products in horizontal layout
    const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 6);
    displayProducts(topProducts, 'horizontal');

    // Display all products in vertical layout initially
    displayProducts(products, 'vertical');
});

/* ============================================
   GLOBAL FUNCTIONS
   ============================================ */
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' || cart.style.display === '' ? 'block' : 'none';
}

function toggleModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('edit-modal');
    const discountModal = document.getElementById('discount-modal');
    const productModal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    } else if (event.target === discountModal) {
        discountModal.style.display = 'none';
    } else if (event.target === productModal) {
        productModal.style.display = 'none';
    }
}

function toggleTheme() {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = isDark ? '🌙' : '☀️';
}
