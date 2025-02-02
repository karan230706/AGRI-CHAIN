document.addEventListener('DOMContentLoaded', () => {
    fetchFarmers();
    fetchUsers();
    fetchOrders();
    fetchDeliveryPersonnel();

    document.getElementById('addFarmerForm').addEventListener('submit', addFarmer);
    document.getElementById('addUserForm').addEventListener('submit', addUser);
    document.getElementById('addOrderForm').addEventListener('submit', addOrder);
    document.getElementById('addDeliveryPersonnelForm').addEventListener('submit', addDeliveryPersonnel);
});

function fetchFarmers() {
    fetch('http://localhost:5000/api/farmers')
        .then(response => response.json())
        .then(data => {
            const farmersSection = document.getElementById('farmersList');
            farmersSection.innerHTML = ''; // Clear previous content
            data.forEach(farmer => {
                const farmerDiv = document.createElement('div');
                farmerDiv.innerHTML = `
                    <h3>${farmer.name}</h3>
                    <p>ID: ${farmer._id}</p>
                    <p>Contact: ${farmer.contact}</p>
                    <p>Location: ${farmer.location}</p>
                    <p>Rating: ${farmer.rating}</p>
                    <p>Crops: ${farmer.crops.join(', ')}</p>
                    <p>Quantity: ${farmer.quantity}</p>
                `;
                farmersSection.appendChild(farmerDiv);
            });
        })
        .catch(error => console.error('Error fetching farmers:', error));
}

function fetchUsers() {
    fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(data => {
            const usersSection = document.getElementById('users');
            usersSection.innerHTML = ''; // Clear previous content
            data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <p>Location: ${user.location}</p>
                `;
                usersSection.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

function fetchOrders() {
    fetch('http://localhost:5000/api/orders')
        .then(response => response.json())
        .then(data => {
            const ordersSection = document.getElementById('orders');
            ordersSection.innerHTML = ''; // Clear previous content
            data.forEach(order => {
                const orderDiv = document.createElement('div');
                orderDiv.innerHTML = `
                    <p>User ID: ${order.userId}</p>
                    <p>Farmer ID: ${order.farmerId}</p>
                    <p>Crop: ${order.crop}</p>
                    <p>Quantity: ${order.quantity}</p>
                    <p>Status: ${order.status}</p>
                `;
                ordersSection.appendChild(orderDiv);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
}

function fetchDeliveryPersonnel() {
    fetch('http://localhost:5000/api/delivery-personnel')
        .then(response => response.json())
        .then(data => {
            const deliveryPersonnelSection = document.getElementById('delivery-personnel');
            deliveryPersonnelSection.innerHTML = ''; // Clear previous content
            data.forEach(personnel => {
                const personnelDiv = document.createElement('div');
                personnelDiv.innerHTML = `
                    <h3>${personnel.name}</h3>
                    <p>Contact: ${personnel.contact}</p>
                `;
                deliveryPersonnelSection.appendChild(personnelDiv);
            });
        })
        .catch(error => console.error('Error fetching delivery personnel:', error));
}

function addFarmer(event) {
    event.preventDefault();
    const name = document.getElementById('farmerName').value;
    const contact = document.getElementById('farmerContact').value;
    const location = document.getElementById('farmerLocation').value;
    const rating = document.getElementById('farmerRating').value;
    const crops = document.getElementById('farmerCrops').value.split(',');

    fetch('http://localhost:5000/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, location, rating, crops })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Farmer added:', data); // Log the response
        document.getElementById('newFarmerId').innerText = `New Farmer ID: ${data._id}`; // Display new farmer ID
        fetchFarmers(); // Refresh the list of farmers
    })
    .catch(error => console.error('Error adding farmer:', error));
}

function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const location = document.getElementById('userLocation').value;

    fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, location })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User added:', data); // Log the response
        document.getElementById('newUserId').innerText = `New User ID: ${data._id}`; // Display new user ID
        fetchUsers(); // Refresh the list of users
    })
    .catch(error => console.error('Error adding user:', error));
}

function addOrder(event) {
    event.preventDefault();
    const userId = document.getElementById('orderUserId').value;
    const farmerId = document.getElementById('orderFarmerId').value;
    const crop = document.getElementById('orderCrop').value;
    const quantity = document.getElementById('orderQuantity').value;

    fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, farmerId, crop, quantity })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order placed:', data); // Log the response
        fetchOrders(); // Refresh the list of orders
    })
    .catch(error => console.error('Error placing order:', error));
}

function addDeliveryPersonnel(event) {
    event.preventDefault();
    const name = document.getElementById('deliveryPersonnelName').value;
    const contact = document.getElementById('deliveryPersonnelContact').value;

    fetch('http://localhost:5000/api/delivery-personnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Delivery personnel added:', data); // Log the response
        fetchDeliveryPersonnel(); // Refresh the list of delivery personnel
    })
    .catch(error => console.error('Error adding delivery personnel:', error));
}