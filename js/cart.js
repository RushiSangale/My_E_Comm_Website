// Get cart from LocalStorage
function getCart(){
    try {
        const cart = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        console.error("Cart parse error :",error);
        return [];
    }
}

//Save Cart
function saveCart(cart){
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error('Cart Save error :', error);
        alert("Unable to save cart. ");
    }
}

// Add Product to Cart
async function addToCart(productId){
    try {
        if (!productId) throw new Error("Invalid product Id!");
        
        const res = await fetch('data/products.json');
        if(!res.ok) throw new Error("Unable to fetch product data");
            
        const products = await res.json();
        const product = products.find(p => p.id === productId);

        if(!product) throw new Error("Product not found!");

        let cart = getCart();

        const existing = cart.find(item =>item.id === productId);

        if(existing){
            existing.quantity += 1;
        }
        else{
            cart.push({
                id: product.id,
                name:product.name,
                price: product.price,
                image: product.image,
                quantity : 1,
            });
        }
        saveCart(cart);
        alert("Product added into the cart!");
    } catch (error) {
        console.error(error);
        alert("Something went wrong! while adding the product to cart");
    }
}

function displayCart(){
    const cart = getCart();

    const container = document.getElementById("cartContainer");

    if(!container) return;

    if(cart.length === 0){
        container.innerHTML= `
           <div class="alert alert-danger">
               Your cart is empty!
           </div> 
        `;
        return;
    }

    let total = 0;
    let html = `
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            `;

            cart.forEach(item =>{
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
            html += `
                <tr>
                    <td>
                        <img src="${item.image}" width="50"/>

                        ${item.name}
                    </td>
                    <td>₹${item.price}</td>

                    <td>
                        <input type="number" min="1" value="${item.quantity}"
                        onchange="updateQuantity(${item.id}, this.value)"/>
                    </td>    
                    <td> ₹${itemTotal}</td>

                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">
                                Remove
                        </button>
                </tr>
            `;    
            });

            html +=`
                </tbody>
            </table>
            
            <h4 class="text-end">Total : ₹${total}</h4>
            <a href="checkout.html" class="btn btn-success">
                Proceed to Checkout
            </a>    
            `;
            container.innerHTML = html;
}

function updateQuantity(id, qty){
    let cart = getCart();

    qty= parseInt(qty);

    if(qty <=0){
        alert("Quantity must be at least 1!");
        return;
    }

    cart = cart.map(item => {
        if (item.id === id) {
            item.quantity = qty;

        }
        return item;
    });
    saveCart(cart);
    displayCart();
}

function removeItem(id){
    let cart = getCart();
    
    cart = cart.filter(item => item.id != id);
    saveCart(cart);
    displayCart();
}


displayCart();