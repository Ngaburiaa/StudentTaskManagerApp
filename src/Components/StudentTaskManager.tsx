import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const StudentTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = { id: uuidv4(), title, completed: false };
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="todo-app">
      <h1>TODO</h1>
      <form className="todo-input-wrapper" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      <div className="todo-card">
        {tasks.map((task) => (
          <label key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className="checkmark"></span>
            <span className="task-title">{task.title}</span>
          </label>
        ))}

        <div className="todo-footer">
          <span>{tasks.filter(t => !t.completed).length} items left</span>
          <div className="filters">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
          <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>

      <p className="reorder-text">Drag and drop to reorder list</p>
    </div>
  );
};

export default StudentTaskManager;
