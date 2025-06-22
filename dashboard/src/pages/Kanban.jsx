import React, { useState } from 'react'

function Kanban() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "Task 1" },
        { id: "2", content: "Task 2" },
      ]
    },
    inProgress: {
      name: "In Progress",
      items: [
        { id: "3", content: "Task 3" },
      ]
    },
    done: {
      name: "Done",
      items: [
        { id: "4", content: "Task 4" },
      ]
    }
  });

  const [newTask, setNewTask] = useState("");
  const [activeCol, setActiveCol] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);

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
    <div className=" w-full  flex items-center ">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-bold mb-2 ">Kanban Board</h1>

        {/* Add Task Input */}
        <div className="mb-8 flex justify-center h-[50px]  overflow-hidden">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex p-3 ou  border-2 rounded-lg w-[400px]"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <select
            value={activeCol}
            onChange={(e) => setActiveCol(e.target.value)}
            className="p-3 ml-3 w-22 bg-zinc-700 text-white rounded-lg"
          >
            {Object.keys(columns).map((columnId) => (
              <option key={columnId} value={columnId}>
                {columns[columnId].name}
              </option>
            ))}
          </select>
          <button
            onClick={addNewTask}
            className="w-15 ml-3 text-white bg-blue-600 cursor-pointer rounded-lg hover:bg-blue-800"
          >
            Add
          </button>
        </div>

        {/* Kanban Columns */}
        <div className="flex justify-center gap-6 overflow-x-auto pb-6 w-full">
          {Object.keys(columns).map((columnId) => (
            <div
              key={columnId}
              className={`flex-shrink-0 w-80 bg-zinc-800 rounded-lg shadow-xl border-t-4 ${columnStyles[columnId].border}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              <div className={`p-4 text-white text-xl font-bold rounded-t-md ${columnStyles[columnId].header}`}>
                {columns[columnId].name}
                <span className="ml-2 px-2 py-1 bg-zinc-800 opacity-30 rounded-full text-sm">
                  {columns[columnId].items.length}
                </span>
              </div>

              <div className="p-3 min-h-64">
                {columns[columnId].items.length === 0 ? (
                  <div className="text-center py-10 text-zinc-500">Drop tasks here</div>
                ) : (
                  columns[columnId].items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      draggable
                      onDragStart={() => handleDragStart(columnId, item)}
                    >
                      <span className="mr-2">{item.content}</span>
                      <button
                        onClick={() => removeTask(columnId, item.id)}
                        className="text-zinc-400 hover:text-red-700 transition-colors duration-200 w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-600"
                      >
                        <span className="text-lg cursor-pointer">X</span>
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
