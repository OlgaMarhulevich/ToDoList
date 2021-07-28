import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [id: string]: Array<TaskType>
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {

  const todoListID_1 = v1()
  const todoListID_2 = v1()

  let [todoLists, setTodoList] = useState<TodoListType[]>([
    {id: todoListID_1, title: 'What to learn?', filter: 'all'},
    {id: todoListID_2, title: 'What to buy?', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListID_1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todoListID_2]: [
      {id: v1(), title: "Bear", isDone: false},
      {id: v1(), title: "Milk", isDone: false}
    ]
  })

  const addTask = (task: string, todoListID: string) => {
    const newTask = {id: v1(), title: task, isDone: false};
    tasks[todoListID] = [newTask, ...tasks[todoListID]]
    setTasks({...tasks});
  }

  const removeTask = (id: string, todoListID: string) => {
    tasks[todoListID] = tasks[todoListID].filter(task => task.id !== id);
    setTasks({...tasks});
  }

  const updateTask = (taskID: string, todoListID: string) => {
    tasks[todoListID] = tasks[todoListID]
        .map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t)
    setTasks({...tasks})
  }

  const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
    todoLists = todoLists
        .map(tdl => tdl.id === todoListID ? {...tdl, filter} : tdl)
    setTodoList([...todoLists])
  }

  const removeTodoList = (todoListID: string) => {
    todoLists = todoLists.filter(tdl => tdl.id !== todoListID)
    setTodoList([...todoLists])
    delete tasks[todoListID]
  }

  const getTasksForTodoList = (tdl: TodoListType) => {
    switch (tdl.filter) {
      case 'active':
        return tasks[tdl.id].filter(t => !t.isDone)
      case 'completed':
        return tasks[tdl.id].filter(t => t.isDone)
      default:
        return tasks[tdl.id]
    }
  }

  const tdlComponents = todoLists.map(tdl =>
      <Todolist
          key={tdl.id}
          id={tdl.id}
          title={tdl.title}
          filter={tdl.filter}
          tasks={getTasksForTodoList(tdl)}
          removeTask={removeTask}
          addTask={addTask}
          updateTask={updateTask}
          changeTodoListFilter={changeTodoListFilter}
          removeTodoList={removeTodoList}
      />)

  return (
      <div className="App">
        { tdlComponents }
      </div>
  );
}

export default App;