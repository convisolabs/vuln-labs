import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import env from "react-dotenv";

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`${env.BACKEND_URL}/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
