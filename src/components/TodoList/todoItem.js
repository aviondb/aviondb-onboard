import React from "react";

export default function todoItem(props) {
  const { todos, updateTodoItem } = props;

  return todos.map((todo) => {
    return (
      <li
        key={todo.id}
        className="list-group-item"
        onClick={() => {
          updateTodoItem({
            id: todo.id,
            isDone: document.getElementById(todo.id).checked,
          });
        }}
      >
        {todo.isDone ? (
          <input type="checkbox" id={todo.id} checked />
        ) : (
          <input type="checkbox" id={todo.id} />
        )}
        <label htmlFor={todo.id}>{todo.todo}</label>
      </li>
    );
  });
}
