import {v1} from 'uuid';
import {FilterValuesType, TodoListDomainType} from '../../API/todolist-api';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "../todoListsReducer";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC({todoListID: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let newTodolistTitle = {
        id: '123',
        title: "What to buy",
        filter: "all",
        addedDate: '',
        order: 0
    };
    const endState = todoListsReducer(startState, addTodoListAC({todo: newTodolistTitle}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Task";
    const endState = todoListsReducer(startState, changeTodoListTitleAC({title: newTodolistTitle, todoListID: todolistId2}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, changeTodoListFilterAC({filter: newFilter, todoListID: todolistId2}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




