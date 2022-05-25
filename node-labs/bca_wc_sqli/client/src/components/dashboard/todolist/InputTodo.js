import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import env from "react-dotenv";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description };
      const response = await fetch(`${env.BACKEND_URL}/dashboard/todos`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      if (response.status === 403) {
        toast.error(parseResponse);
      }
      setTodosChange(true);
      setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
