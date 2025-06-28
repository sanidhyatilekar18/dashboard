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
    <div className="mt-15 w-full max-w-screen px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>

      <div className="mb-6 flex flex-col md:flex-row flex-wrap gap-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          type="text"
          placeholder="Product Name"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded-xl  dark:text-black dark:bg-white w-full md:w-[200px] "
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button
          onClick={addOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 w-full md:w-[200px] h-10"
        >
          Add Order
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="overflow-x-auto max-w-screen">
          
          <table className="min-w-[600px] w-full table-auto border border-gray-300 rounded-lg hidden sm:table">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-2 text-left dark:text-black">#</th>
                <th className="border px-2 py-2 text-left dark:text-black">Customer</th>
                <th className="border px-2 py-2 text-left dark:text-black">Product</th>
                <th className="border px-2 py-2 text-left dark:text-black">Qty</th>
                <th className="border px-2 py-2 text-left dark:text-black">Price</th>
                <th className="border px-2 py-2 text-left dark:text-black">Status</th>
                <th className="border px-2 py-2 text-left dark:text-black">Order Date</th>
                <th className="border px-2 py-2 text-left dark:text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{order.customer}</td>
                  <td className="border px-4 py-2">{order.product}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">₹{order.price.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border rounded px-2 py-1 dark:text-white dark:bg-gray-800 bg-white text-black"
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

         
          <div className="sm:hidden flex flex-col gap-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold">#{index + 1}</span>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 text-xs"
                  >
                    Delete
                  </button>
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Customer: </span>
                  {order.customer}
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Product: </span>
                  {order.product}
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Qty: </span>
                  {order.quantity}
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Price: </span>
                  ₹{order.price.toFixed(2)}
                </div>
                <div className="mb-1">
                  <span className="font-semibold">Status: </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border rounded px-2 py-1 dark:text-white dark:bg-gray-800 bg-white text-black"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <span className="font-semibold">Order Date: </span>
                  {order.orderDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;