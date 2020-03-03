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
              <div
                style={{ border: '1px solid grey', marginBottom: '20px' }}
                key={todoInList.id}
              >
                <button onClick={() => deleteTodo(todoInList.id)}>x</button>

                <input
                  type="checkbox"
                  checked={todoInList.completed}
                  onChange={event => {
                    setTodos(
                      todos.map(todo => {
                        const newTodo = { ...todo };
                        if (newTodo.id === todoInList.id)
                          newTodo.completed = event.target.checked;
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
