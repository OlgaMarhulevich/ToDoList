import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "../tasksReducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId1',
                entityStatus: "idle"
            },
            {
                id: "2",
                title: "JS",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId1',
                entityStatus: "idle"
            },
            {
                id: "3",
                title: "React",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId1',
                entityStatus: "idle"
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId2',
                entityStatus: "idle"
            },
            {
                id: "2",
                title: "milk",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId2',
                entityStatus: "idle"
            },
            {
                id: "3",
                title: "tea",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId2',
                entityStatus: "idle"
            }
        ]
    };
})
test('correct Task should be deleted from correct array', () => {
    const action = removeTaskAC({todoListID: "todolistId2", taskId: '2'});
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual( {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId1',
                entityStatus: "idle"
            },
            {
                id: "2",
                title: "JS",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId1',
                entityStatus: "idle"
            },
            {
                id: "3",
                title: "React",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId1',
                entityStatus: "idle"
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId2',
                entityStatus: "idle"
            },
            {
                id: "3",
                title: "tea",
                status: 0,
                startDate: '',
                order: 0,
                addedDate: '',
                priority: 1,
                description: '',
                deadline: '',
                completed: false,
                todoListId: 'todolistId2',
                entityStatus: "idle"
            }
        ]
    });

});

test('correct Task should be added to correct array', () => {
    const action = addTaskAC({task: {
            id: "123",
            title: "juice",
            status: 0,
            startDate: '',
            order: 0,
            addedDate: '',
            priority: 1,
            description: '',
            deadline: '',
            completed: false,
            todoListId: 'todolistId2'
        }});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(0);
})

test('status of specified Task should be changed', () => {
    const action = changeTaskStatusAC({todoListID: "todolistId2", taskId: '2', status: 1});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(0);
    expect(endState["todolistId2"][1].status).toBe(1);
});

test('title of specified Task should be changed', () => {
    const action = changeTaskTitleAC({todoListID: "todolistId2", taskId: '2', title: "beer"});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('beer');
});


