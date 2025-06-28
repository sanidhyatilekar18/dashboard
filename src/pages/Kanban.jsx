import React, { useState, useEffect } from 'react';

function Kanban() {
  const [columns, setColumns] = useState(() => {
    const savedData = localStorage.getItem("kanban-columns");
    return savedData ? JSON.parse(savedData) : {
      todo: { name: "To Do", items: [] },
      inProgress: { name: "In Progress", items: [] },
      done: { name: "Done", items: [] },
    };
  });

  const [newTask, setNewTask] = useState("");
  const [activeCol, setActiveCol] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns]);

  const addNewTask = () => {
    if (newTask.trim() === "") return;
    const updatedColumns = { ...columns };
    updatedColumns[activeCol].items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumns(updatedColumns);
    setNewTask("");
  };

  const removeTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(item => item.id !== taskId);
    setColumns(updatedColumns);
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!draggedItem) return;
    const { columnId: sourceColumnId, item } = draggedItem;
    if (sourceColumnId === columnId) return;

    const updatedColumns = { ...columns };
    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId].items.filter(i => i.id !== item.id);
    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-blue-600 to-yellow-600",
      border: "border-yellow-400"
    },
    inProgress: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400"
    },
    done: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400"
    }
  };

  return (
    <div className="w-full p-2 sm:p-4 md:p-6">
      <div className="flex flex-col gap-4 w-full mt-15">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-start">Kanban Board</h1>


        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6  items-center justify-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="p-2 sm:p-3 border-2 rounded-lg w-full sm:w-[300px] dark:bg-white dark:text-gray-800"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <select
            value={activeCol}
            onChange={(e) => setActiveCol(e.target.value)}
            className="p-2 sm:p-3 bg-zinc-700 text-white rounded-lg w-full sm:w-[160px]"
          >
            {Object.keys(columns).map((columnId) => (
              <option key={columnId} value={columnId}>
                {columns[columnId].name}
              </option>
            ))}
          </select>
          <button
            onClick={addNewTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full sm:w-auto"
          >
            Add
          </button>
        </div>


        <div className="flex flex-col md:flex-wrap lg:flex-row gap-4 items-stretch justify-center">
  {Object.keys(columns).map((columnId) => (
    <div
      key={columnId}
      className={`w-full sm:w-full md:w-[48%] lg:w-[350px] flex-grow bg-zinc-800 rounded-lg shadow-xl border-t-4 ${columnStyles[columnId].border}`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnId)}
    >
      <div className={`p-4 text-white text-base sm:text-lg font-semibold rounded-t-md ${columnStyles[columnId].header}`}>
        {columns[columnId].name}
        <span className="ml-2 px-2 py-1 bg-zinc-800 opacity-30 rounded-full text-xs sm:text-sm">
          {columns[columnId].items.length}
        </span>
      </div>

      <div className="p-3 min-h-40 sm:min-h-64 bg-zinc-800 dark:bg-amber-50 rounded-b-md">
        {columns[columnId].items.length === 0 ? (
          <div className="text-center py-6 sm:py-10 text-zinc-400">Drop tasks here</div>
        ) : (
          columns[columnId].items.map((item) => (
            <div
              key={item.id}
              className="p-4 mb-3 bg-zinc-600 text-white rounded-lg shadow-md cursor-move flex items-center justify-between hover:scale-[1.02] transition-transform duration-200"
              draggable
              onDragStart={() => handleDragStart(columnId, item)}
            >
              <span className="mr-2">{item.content}</span>
              <button
                onClick={() => removeTask(columnId, item.id)}
                className="text-zinc-400 hover:text-red-600 w-6 h-6 flex items-center justify-center rounded-full"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  ))}
</div>

    
        </div>
      </div>
  
  );
}

export default Kanban;
