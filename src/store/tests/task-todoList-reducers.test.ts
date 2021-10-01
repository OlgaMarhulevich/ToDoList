import {tasksReducer, TasksStateType} from "../tasksReducer";
import {addTodoListAC, removeTodoListAC, TodoListDomainType, todoListsReducer} from "../todoListsReducer";

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
                startDate: ''
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
                startDate: ''
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
                startDate: ''
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
                startDate: ''
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
                startDate: ''
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
                startDate: ''
            }
        ]
    };
})

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist");
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

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodoLists).toBe(action.todoListID);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
