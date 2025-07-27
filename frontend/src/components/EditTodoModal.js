import React, { useState } from "react";

function EditTodoModal({ todo, onSave, onClose }) {
  const [editedText, setEditedText] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(todo.id, editedText);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Todo</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
