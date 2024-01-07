import React from "react";
import { useState } from "react";

function P1() {
  let [title, settitle] = useState("");
  let [todos, settodos] = useState([]);
  let [editId, setEditId] = useState(null);
  let [editmode, setEditMode] = useState(false);
  function handle(e) {
    e.preventDefault();
    if (!title) {
      alert("Enter Something");
    } else if (title && editId) {
      settodos(
        todos.map((i) => {
          if (i.id == editId) {
            return { ...i, title: title };
          }
          return i;
        })
      );
      settitle("");
      setEditId(null);
      setEditMode(false);
    } else {
      let newd = { id: new Date().getTime(), title: title };
      settodos([...todos, newd]);
      settitle("");
    }
  }
  console.log(todos);
  return (
    <div className="bg-red-200 p-5 m-auto text-center">
      <p>Practice one todo</p>
      <form onSubmit={handle}>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button type="submit">{editmode ? "Edit" : "Add"}</button>
      </form>
      <ol>
        {todos.map((i, id) => {
          return (
            <li key={id}>
              <p>{id + 1}</p>
              <p>{i.title}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default P1;
