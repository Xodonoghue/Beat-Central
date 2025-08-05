import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import Footer from "./Footer";

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask.trim() };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
    cancelEdit();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <main className="bg-gradient-to-b from-black to-indigo-800 min-h-screen flex flex-col">
      <UserNavbar />
      <div className="flex-grow p-10">
        <h1 className="text-white text-3xl mb-6 text-center">Tasks</h1>
        <div className="flex mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
            className="flex-grow p-2 rounded-l-lg"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-4 rounded-r-lg"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-black/40 rounded p-2"
            >
              {editingId === t.id ? (
                <>
                  <input
                    className="flex-grow p-1 mr-2 text-black"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={() => saveEdit(t.id)}
                    className="text-green-400 mr-2"
                  >
                    Save
                  </button>
                  <button onClick={cancelEdit} className="text-yellow-400 mr-2">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow text-white">{t.text}</span>
                  <button
                    onClick={() => startEdit(t.id, t.text)}
                    className="text-blue-400 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
};

export default Tasks;
