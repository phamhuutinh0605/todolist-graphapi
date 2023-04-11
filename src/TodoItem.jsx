import { API, graphqlOperation } from "aws-amplify";
import { updateTodo, deleteTodo } from "./graphql/mutations";
import { useState } from "react";

const TodoItem = ({ todo }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);

  const handleUpdate = async (event) => {
    // event.preventDefault();

    const updatedTodo = {
      id: todo.id,
      name,
      description,
      completed,
    };

    try {
      await API.graphql(graphqlOperation(updateTodo, { input: updatedTodo }));
      setIsEditing(false);
    } catch (error) {
      console.log("error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    const deleteTodoInput = {
      id: todo.id,
    };

    try {
      await API.graphql(
        graphqlOperation(deleteTodo, { input: deleteTodoInput })
      );
    } catch (error) {
      console.log("error deleting todo:", error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {todo.name} - {todo.description} -{" "}
          {todo.completed ? "Completed" : "Not completed"}
          <br />
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};
export default TodoItem;
