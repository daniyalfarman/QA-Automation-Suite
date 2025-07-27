import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
          className="edit-input"
        />
      ) : (
        <div className="todo-content">
          <span>{todo.text}</span>
          <div className="todo-actions">
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-button"
              id={todo.id}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;