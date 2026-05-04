// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

async function loadProduct() {
    const res = await fetch('data/products.json');
    const products = await res.json();

    const product = products.find(p => p.id === id);

    displayProduct(product);
    loadRelated(products);
}

// DISPLAY PRODUCT
function displayProduct(product) {
    const container = document.getElementById("productDetails");

    container.innerHTML = `
        <div class="col-md-5">
            <img id="mainImg" src="${product.image}" class="img-fluid rounded mb-3">

            <!-- IMAGE GALLERY -->
            <div>
                <img src="${product.image}" class="thumb-img" onclick="changeImg(this)">
                <img src="https://picsum.photos/300/200?random=1" class="thumb-img" onclick="changeImg(this)">
                <img src="https://picsum.photos/300/200?random=2" class="thumb-img" onclick="changeImg(this)">
            </div>
        </div>

        <div class="col-md-7">
            <h2>${product.name}</h2>

            <!-- RATING -->
            <p>⭐⭐⭐⭐☆ (4.2/5)</p>

            <!-- PRICE -->
            <h4>
                ₹${product.price}
                <span class="text-muted text-decoration-line-through">₹${product.price + 10000}</span>
                <span class="text-danger">(20% OFF)</span>
            </h4>

            <p>${product.description}</p>

            <!-- DELIVERY -->
            <p class="text-success">✔ Free Delivery</p>
            <p class="text-success">✔ 7 Days Return</p>
            <p class="text-success">✔ Cash on Delivery Available</p>

            <!-- QUANTITY -->
            <div class="mb-3">
                <label>Quantity:</label>
                <input type="number" id="qty" value="1" min="1" class="form-control w-25">
            </div>

            <!-- BUTTONS -->
            <button onclick="addToCart(${product.id})" class="btn btn-primary">
                Add To Cart
            </button>

            <button onclick="addToWishlist(${product.id})" class="btn btn-outline-danger">
                ❤️ Wishlist
            </button>

            <!-- SPECIFICATIONS -->
            <h5 class="mt-4">Specifications</h5>
            <ul>
                <li>Brand: ${product.name.split(" ")[0]}</li>
                <li>RAM: 8GB</li>
                <li>Storage: 128GB</li>
                <li>Processor: Snapdragon</li>
            </ul>
        </div>
    `;
}

// CHANGE IMAGE
function changeImg(el) {
    document.getElementById("mainImg").src = el.src;
}

// ADD TO CART
async function addToCart(id) {
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const qtyInput = document.getElementById("qty");
        const qty = qtyInput ? parseInt(qtyInput.value) : 1;

        const res = await fetch('./data/products.json');
        const products = await res.json();

        const product = products.find(p => p.id === id);

        if (!product) {
            alert("Product not found!");
            return;
        }

        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart 🛒");

    } catch (error) {
        console.error(error);
        alert("Error adding to cart!");
    }
}

// 🔥 VERY IMPORTANT
window.addToCart = addToCart;

async function addToWishlist(id) {
    try {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // fetch product data
        const res = await fetch('./data/products.json');
        const products = await res.json();

        const product = products.find(p => p.id === id);

        if (!product) {
            alert("Product not found!");
            return;
        }

        // check if already exists
        const exists = wishlist.find(item => item.id === id);

        if (exists) {
            alert("Already in wishlist ❤️");
            return;
        }

        // add product
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert("Added to wishlist ❤️");

    } catch (error) {
        console.error(error);
        alert("Error adding to wishlist");
    }
}

// 🔥 IMPORTANT (make global)
window.addToWishlist = addToWishlist;

// RELATED PRODUCTS
function loadRelated(products) {
    const container = document.getElementById("relatedProducts");

    const randomProducts = products.slice(0, 3);

    randomProducts.forEach(p => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-3">
                    <img src="${p.image}" class="card-img-top">
                    <div class="card-body">
                        <h6>${p.name}</h6>
                        <p>₹${p.price}</p>
                        <a href="product-details.html?id=${p.id}" class="btn btn-sm btn-primary">
                            View
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

loadProduct();