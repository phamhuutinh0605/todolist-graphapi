import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { useState } from "react";
import { useEffect } from "react";
import TodoItem from "./TodoItem";
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await API.graphql(graphqlOperation(listTodos));
        setTodos(data.listTodos.items);
      } catch (error) {
        console.log("error fetching todos:", error);
      }
    }

    fetchData();
  }, []);
  console.log(todos);
  return (
    <div>
      <h2>Todos:</h2>
      <ul>
        {/* {todos.map(todo => (
          <li key={todo.id}>
            {todo.name} - {todo.description} - {todo.completed ? 'Completed' : 'Not completed'}
          </li>
        ))} */}

        {todos.map((todo) => {
          return <TodoItem todo={todo} />;
        })}
      </ul>
    </div>
  );
};
export default TodoList;
