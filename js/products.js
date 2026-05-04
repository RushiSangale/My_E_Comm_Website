document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

// 🔥 Global variable
let allProducts = [];

// 🔥 Load Products
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        allProducts = products; // store globally

        displayProducts(products);

    } catch (error) {
        console.log(error);
    }
}

// 🔥 Display Products
function displayProducts(products) {
    const container = document.getElementById("productList");

    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow">
                    <img src="${product.image}" class="card-img-top" height="200"/>

                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p class="text-success fw-bold">₹${product.price}</p>
                        <p>${product.description}</p>

                        <a href="${product.url}" class="btn btn-primary">
                            View Product
                        </a>
                    </div>    
                </div>
            </div>
        `;
    });
}

// 🔍 SEARCH FUNCTION
document.getElementById("searchInput").addEventListener("input", function () {
    const search = this.value.toLowerCase();

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );

    displayProducts(filtered);
});