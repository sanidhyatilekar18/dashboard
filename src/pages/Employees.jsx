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
  <div className="p-4 mt-15 sm:p-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4">Employee Management</h1>

    {/* Input Form */}
    <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap gap-2">
      <input
        type="text"
        placeholder="Name"
        className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full sm:w-[200px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full sm:w-[200px]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        className="border px-3 py-2 rounded-xl dark:text-black dark:bg-white w-full sm:w-[200px]"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button
        onClick={addEmployee}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 w-full sm:w-[200px]"
      >
        Add Employee
      </button>
    </div>

    {/* Empty Message */}
    {employees.length === 0 ? (
      <p className="text-gray-600 dark:text-amber-50">No employees added yet.</p>
    ) : (
      <>
        {/* Table View for sm and up */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full w-full table-auto border border-gray-300 rounded-md text-xs sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left dark:text-black">#</th>
                <th className="border px-4 py-2 text-left dark:text-black">Name</th>
                <th className="border px-4 py-2 text-left dark:text-black">Email</th>
                <th className="border px-4 py-2 text-left dark:text-black">Role</th>
                <th className="border px-4 py-2 text-left dark:text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 break-words max-w-[120px] sm:max-w-none">{emp.name}</td>
                  <td className="border px-4 py-2 break-words max-w-[140px] sm:max-w-none">{emp.email}</td>
                  <td className="border px-4 py-2 break-words max-w-[100px] sm:max-w-none">{emp.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteEmployee(emp.id)}
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

        {/* Card View for small screens */}
        <div className="space-y-4 sm:hidden">
          {employees.map((emp, index) => (
            <div
              key={emp.id}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <p className="font-semibold text-sm mb-1">#{index + 1}</p>
              <p className="text-sm"><strong>Name:</strong> {emp.name}</p>
              <p className="text-sm"><strong>Email:</strong> {emp.email}</p>
              <p className="text-sm"><strong>Role:</strong> {emp.role}</p>
              <button
                onClick={() => deleteEmployee(emp.id)}
                className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800 w-full"
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
export default Employees;
