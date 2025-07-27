import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import '../Todo.css';

function TodoPage({setIsLoggedIn}) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch todos from backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/todos');
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Don't add empty todos

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setInput('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const editTodo = async (id, newText) => {
    if (!newText.trim()) return; // Don't update with empty text

    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });

      const updatedTodo = await response.json();
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Failed to edit todo:', err);
    }
  };

  if (loading) return <div>Loading todos...</div>;

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Todo App</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;