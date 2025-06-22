import React, { useState, useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('todo-orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Pending');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    localStorage.setItem('todo-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = () => {
    if (!customer || !product || !quantity || !price || !orderDate) {
      alert('All fields are required!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer,
      product,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      status,
      orderDate,
    };

    setOrders([...orders, newOrder]);
    setCustomer('');
    setProduct('');
    setQuantity('');
    setPrice('');
    setStatus('Pending');
    setOrderDate('');
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>

      {/* Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Customer Name"
          className="border px-3 py-2 mr-2 rounded-xl mb-2"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Name"
          className="border px-3 py-2 mr-2 rounded-xl mb-2"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border px-3 py-2 mr-2 rounded-xl mb-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border px-3 py-2 mr-2 rounded-xl mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 mr-2 rounded-xl mb-2"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 mr-2 rounded-xl mb-2"
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button
          onClick={addOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800"
        >
          Add Order
        </button>
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Customer</th>
                <th className="border px-4 py-2 text-left">Product</th>
                <th className="border px-4 py-2 text-left">Qty</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Order Date</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{order.customer}</td>
                  <td className="border px-4 py-2">{order.product}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">₹{order.price.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">{order.orderDate}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
