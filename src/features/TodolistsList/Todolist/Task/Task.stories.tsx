import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from './Task'
import {action} from "@storybook/addon-actions";
import {TaskStatuses} from "../../../../API/tasks-api";

export default {
    title: 'TodoList/Task',
    component: Task
} as ComponentMeta<typeof Task>;

const TaskExample: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs = {
    removeTask: action('Task removed'),
    addTask: action('Task added'),
    changeTaskStatus: action('status of Task changed'),
    changeTaskTitle: action('title of Task changed')
}

export const TaskIsDone = TaskExample.bind({});
TaskIsDone.args = {
    ...baseArgs,
    taskID: 'taskId',
    taskTitle: 'Title',
    taskStatus: TaskStatuses.New,
    todoListID: 'todoListId'
};
export const TaskIsNotDone = TaskExample.bind({});
TaskIsNotDone.args = {
    ...baseArgs,
    taskID: 'taskId',
    taskTitle: 'Title',
    taskStatus: TaskStatuses.New,
    todoListID: 'todoListId'
};
