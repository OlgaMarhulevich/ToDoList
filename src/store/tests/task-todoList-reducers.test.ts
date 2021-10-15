import { TodoListDomainType } from "../../API/todolist-api";
import {tasksReducer, TasksStateType} from "../tasksReducer";
import {addTodoListAC, removeTodoListAC, todoListsReducer} from "../todoListsReducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: 0,
                completed: false,
                todoListId: '',
                order: 0,
                deadline: '',
                description: '',
                priority: 1,
                addedDate: '',
                startDate: '',
                entityStatus: "idle"
            },
            {
                id: "2",
                title: "JS",
                status: 0,
                completed: false,
                todoListId: '',
                order: 0,
                deadline: '',
                description: '',
                priority: 1,
                addedDate: '',
                startDate: '',
                entityStatus: "idle"
            },
            {
                id: "3",
                title: "React",
                status: 0,
                completed: false,
                todoListId: '',
                order: 0,
                deadline: '',
                description: '',
                priority: 1,
                addedDate: '',
                startDate: '',
                entityStatus: "idle"
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: 0,
                completed: false,
                todoListId: '',
                order: 0,
                deadline: '',
                description: '',
                priority: 1,
                addedDate: '',
                startDate: '',
                entityStatus: "idle"
            },
            {
                id: "2",
                title: "milk",
                status: 0,
                completed: false,
                todoListId: '',
                order: 0,
                deadline: '',
                description: '',
                priority: 1,
                addedDate: '',
                startDate: '',
                entityStatus: "idle"
            },
            {
                id: "3",
                title: "tea",
                status: 0,
                completed: false,
                todoListId: '',
                order: 0,
                deadline: '',
                description: '',
                priority: 1,
                addedDate: '',
                startDate: '',
                entityStatus: "idle"
            }
        ]
    };
})

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC({todo: {
            id: 'todolistId1',
            title: 'new',
            order: 1,
            addedDate: ''
        }});
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC({todo: {
            id: 'todolistId1',
            title: 'new',
            order: 1,
            addedDate: ''
        }});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todo.id);
    expect(idFromTodoLists).toBe(action.payload.todo.id);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC({todoListID: 'todolistId2'});
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
