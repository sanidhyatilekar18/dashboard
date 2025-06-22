import React, { useState, useEffect } from 'react';

function Employees() {
  const [employees, setEmployees] = useState(() => {
    try {
      const stored = localStorage.getItem('todo-employees');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    localStorage.setItem('todo-employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (!name.trim() || !email.trim() || !role.trim()) {
      alert('Name, Email, and Role are required!');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name,
      email,
      role
    };

    setEmployees([...employees, newEmployee]);
    setName('');
    setEmail('');
    setRole('');
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Management</h1>

      {/* Form */}
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
        <input
          type="text"
          placeholder="Role"
          className="border px-3 py-2 mr-2 rounded-xl"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button
          onClick={addEmployee}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      {employees.length === 0 ? (
        <p className="text-gray-600">No employees added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{emp.name}</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteEmployee(emp.id)}
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

export default Employees;
