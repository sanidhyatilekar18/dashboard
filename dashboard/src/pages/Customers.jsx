import React, { useState, useEffect } from 'react';

function Customers() {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('todo-users');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    localStorage.setItem('todo-users', JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    if (!name.trim() || !email.trim()) {
      alert('Name and Email are required!');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email
    };

    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Customer Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 mr-2 rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 mr-2 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800"
        >
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600">No users added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
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

export default Customers;
