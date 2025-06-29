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
    <div className="mt-20 w-full max-w-screen px-2 sm:px-4 ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Customer Management</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full md:w-[200px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 w-full md:w-[200px]"
        >
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600 dark:text-amber-50">No users added yet.</p>
      ) : (
        <>
          {/* Table view for sm and up */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="min-w-[600px] w-full table-auto border border-gray-300 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left dark:text-black">#</th>
                  <th className="border px-4 py-2 text-left dark:text-black">Name</th>
                  <th className="border px-4 py-2 text-left dark:text-black">Email</th>
                  <th className="border px-4 py-2 text-left dark:text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 break-all">{user.name}</td>
                    <td className="border px-4 py-2 break-all">{user.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile */}
          <div className="sm:hidden space-y-4">
            {users.map((user, index) => (
              <div key={user.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                <p className="font-semibold">#{index + 1}</p>
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800 w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Customers;
