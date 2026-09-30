// ===============================
// CRM DATA
// ===============================

let customers = [];
let products = [];
let orders = [];
let feedbacks = [];


// ===============================
// CUSTOMER MANAGEMENT
// ===============================

const customerForm = document.querySelector("#customers form");

customerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const inputs = customerForm.querySelectorAll("input");

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const phone = inputs[2].value.trim();

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all customer details.");
        return;
    }

    const customer = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone
    };

    customers.push(customer);

    customerForm.reset();

    displayCustomers();

    updateDashboard();

    alert("Customer added successfully!");
});


function displayCustomers() {

    const tbody = document.querySelector("#customers tbody");

    tbody.innerHTML = "";

    if (customers.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">No customers yet</td>
            </tr>
        `;

        return;
    }

    customers.forEach(function (customer) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button onclick="deleteCustomer(${customer.id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}


function deleteCustomer(id) {

    customers = customers.filter(function (customer) {
        return customer.id !== id;
    });

    displayCustomers();

    updateDashboard();
}


// ===============================
// PRODUCT MANAGEMENT
// ===============================

const productForm = document.querySelector("#products form");

productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const inputs = productForm.querySelectorAll("input");
    const category = productForm.querySelector("select");

    const name = inputs[0].value.trim();
    const productCategory = category.value;
    const price = Number(inputs[1].value);

    if (
        name === "" ||
        productCategory === "Select Category" ||
        price <= 0
    ) {
        alert("Please enter valid product details.");
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        category: productCategory,
        price: price
    };

    products.push(product);

    productForm.reset();

    displayProducts();

    updateDashboard();

    alert("Product added successfully!");
});


function displayProducts() {

    const tbody = document.querySelector("#products tbody");

    tbody.innerHTML = "";

    if (products.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">No products yet</td>
            </tr>
        `;

        return;
    }

    products.forEach(function (product) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>
                <button onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateOrderProductList();
}


function deleteProduct(id) {

    products = products.filter(function (product) {
        return product.id !== id;
    });

    displayProducts();

    updateDashboard();
}


// ===============================
// ORDER MANAGEMENT
// ===============================

const orderForm = document.querySelector("#orders form");

const customerSelect = orderForm.querySelectorAll("select")[0];
const productSelect = orderForm.querySelectorAll("select")[1];
const quantityInput = orderForm.querySelector("input");


function updateOrderCustomerList() {

    customerSelect.innerHTML = `
        <option value="">Select Customer</option>
    `;

    customers.forEach(function (customer) {

        customerSelect.innerHTML += `
            <option value="${customer.id}">
                ${customer.name}
            </option>
        `;
    });
}


function updateOrderProductList() {

    productSelect.innerHTML = `
        <option value="">Select Product</option>
    `;

    products.forEach(function (product) {

        productSelect.innerHTML += `
            <option value="${product.id}">
                ${product.name} - ₹${product.price}
            </option>
        `;
    });
}


orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const customerId = Number(customerSelect.value);
    const productId = Number(productSelect.value);
    const quantity = Number(quantityInput.value);

    if (
        !customerId ||
        !productId ||
        quantity <= 0
    ) {
        alert("Please select customer, product and quantity.");
        return;
    }

    const customer = customers.find(function (item) {
        return item.id === customerId;
    });

    const product = products.find(function (item) {
        return item.id === productId;
    });

    const total = product.price * quantity;

    const order = {
        id: Date.now(),
        customer: customer.name,
        product: product.name,
        quantity: quantity,
        total: total
    };

    orders.push(order);

    orderForm.reset();

    displayOrders();

    updateDashboard();

    alert("Order placed successfully!");
});


function displayOrders() {

    const tbody = document.querySelector("#orders tbody");

    tbody.innerHTML = "";

    if (orders.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">No orders yet</td>
            </tr>
        `;

        return;
    }

    orders.forEach(function (order) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>₹${order.total}</td>
        `;

        tbody.appendChild(row);
    });
}


// ===============================
// FEEDBACK MANAGEMENT
// ===============================

const feedbackForm = document.querySelector("#feedback form");

feedbackForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nameInput = feedbackForm.querySelector("input");
    const messageInput = feedbackForm.querySelector("textarea");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || message === "") {
        alert("Please enter customer name and feedback.");
        return;
    }

    const feedback = {
        id: Date.now(),
        name: name,
        message: message
    };

    feedbacks.push(feedback);

    feedbackForm.reset();

    alert("Feedback submitted successfully!");
});


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    const cards = document.querySelectorAll(".card");

    // Customers
    cards[0].querySelector("p").textContent =
        customers.length;

    // Products
    cards[1].querySelector("p").textContent =
        products.length;

    // Orders
    cards[2].querySelector("p").textContent =
        orders.length;

    // Sales
    let totalSales = 0;

    orders.forEach(function (order) {
        totalSales += order.total;
    });

    cards[3].querySelector("p").textContent =
        "₹" + totalSales;
}


// ===============================
// LOGOUT
// ===============================

const logoutButton = document.querySelector("header button");

logoutButton.addEventListener("click", function () {

    alert("You have been logged out.");

});


// ===============================
// INITIAL LOAD
// ===============================

displayCustomers();

displayProducts();

displayOrders();

updateOrderCustomerList();

updateOrderProductList();

updateDashboard();