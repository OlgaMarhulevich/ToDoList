import {Provider} from "react-redux";
import {AppStateType} from "../store/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../store/tasksReducer";
import {v1} from "uuid";
import {todoListsReducer} from "../store/todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../API/tasks-api";
import {appReducer} from "../store/appReducer";
import {authReducer} from "../store/authReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", addedDate: '', order: 0, filter: "all", entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", addedDate: '', order: 0,  filter: "all", entityStatus: "idle"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: "taskId1",
                title: "new task",
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                id: "taskId2",
                title: "new task",
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
        ],
        ["todolistId2"]: [
            {
                id: "taskId1",
                title: "new task",
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                id: "taskId1",
                title: "new task",
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
        ]
    },
    app: {
        status: 'loading',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false,
    },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)