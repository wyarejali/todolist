// All necessary dependences
import React from "react";
import {
  BsCheck2Circle,
  BsCheck2Square,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";

// ToDoList
const TodoList = ({ items, editHandler, removeItem, completeItem }) => {
  return (
    <table className="table mb-0">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Task</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          const { id, title, complete } = item;
          return (
            <tr key={id} className="fw-normal">
              <td width="5%" className="align-middle">
                {index === 0 ? 1 + "." : index + 1 + "."}
              </td>
              <td
                width="70%"
                className={`align-middle ${complete && "complete"}`}
              >
                <span className="complete-task">
                  {complete && <BsCheck2Circle />}{" "}
                  <p className="d-inline-block">{title}</p>
                </span>
              </td>
              <td width="25%" className="align-middle">
                <div className="action-btn-area">
                  <button
                    className="btn btn-sm btn-success action-btn"
                    onClick={() => {
                      completeItem(id);
                    }}
                  >
                    <BsCheck2Square />
                  </button>
                  <button
                    className="btn btn-sm btn-primary action-btn"
                    onClick={() => {
                      editHandler(id);
                    }}
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="btn btn-sm btn-danger action-btn"
                    onClick={() => {
                      removeItem(id);
                    }}
                  >
                    <BsTrash />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoList;
