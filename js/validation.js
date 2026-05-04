document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();

    try {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const payment = document.getElementById("payment").value;

        let errors = [];

        if (name.length < 2) {
            errors.push("Name must be at least 2 characters long!");
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailPattern)) {
            errors.push("Invalid email!");
        }

        const phonePattern = /^[6-9]\d{9}$/;
        if (!phone.match(phonePattern)) {
            errors.push("Phone must be 10 digits");
        }

        if (address.length < 10) {
            errors.push("Address too short!");
        }

        if (payment === "") {
            errors.push("Select payment method");
        }

        const cart = getCart();
        if (cart.length === 0) {
            errors.push("Cart is empty!");
        }

        if (errors.length > 0) {
            document.getElementById("message").innerHTML = `
             <div class="alert alert-danger">
             ${errors.join("<br>")}
             </div>
            `;
            return;
        }

        // 🔥 SAVE ORDER
        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            id: Date.now(),
            items: cart,
            date: new Date().toLocaleString()
        };

        orders.push(newOrder);

        localStorage.setItem("orders", JSON.stringify(orders));

        // clear cart
        localStorage.removeItem("cart");

        // success message
        document.getElementById("message").innerHTML = `
         <div class="alert alert-success">
         Order Placed Successfully !!! 🎉
         </div>
        `;

        document.getElementById("checkoutForm").reset();

    } catch (error) {
        console.error(error);

        document.getElementById("message").innerHTML = `
         <div class="alert alert-danger">
         Something went wrong. Try again!
         </div>
        `;
    }
});