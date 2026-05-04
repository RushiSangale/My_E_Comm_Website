function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const container = document.getElementById("ordersContainer");

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders found</p>";
        return;
    }

    orders.forEach(order => {
        let html = `
            <div class="card mb-4 p-3">
                <h5>Order ID: ${order.id}</h5>
                <p>Date: ${order.date}</p>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        order.items.forEach(item => {
            html += `
                <tr>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td>${item.quantity}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML += html;
    });
}

loadOrders();