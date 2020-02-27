import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState({
    id: null,
    name: '',
    completed: false,
  });

  function handleSubmit(event) {
    const newTodos = [draft, ...todos];
    setTodos(newTodos);
    setDraft({
      id: null,
      name: '',
      completed: false,
    });
    event.preventDefault();
  }
  function handleChange(event) {
    const newDraft = {
      id: todos.length,
      name: event.target.value,
      completed: false,
    };
    setDraft(newDraft);
  }
  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={draft.name} />
        <button>Add Todo</button>
        <br />
        List:
        <div>
          {todos.map(todoInList => {
            return (
              <div key={todoInList.id}>
                <button onClick={() => deleteTodo(todoInList.id)}>x</button>

                <input
                  type="checkbox"
                  checked={todoInList.completed}
                  onChange={() => {
                    setTodos(
                      todos.map(todo => {
                        const newTodo = { ...todo };
                        if (todo.id === todoInList.id)
                          todo.completed = !todo.completed;
                        return newTodo;
                      }),
                    );
                  }}
                />
                {todoInList.name}
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}

export default App;
