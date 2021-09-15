import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Task} from './Task'
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/Task',
    component: Task
} as ComponentMeta<typeof Task>;

const TaskExample: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs = {
    removeTask: action('task removed'),
    addTask: action('task added'),
    changeTaskStatus: action('status of task changed'),
    changeTaskTitle: action('title of task changed')
}

export const TaskIsDone = TaskExample.bind({});
TaskIsDone.args = {
    ...baseArgs,
    taskID: 'taskId',
    taskTitle: 'Title',
    taskIsDone: true,
    todoListID: 'todoListId'
};
export const TaskIsNotDone = TaskExample.bind({});
TaskIsNotDone.args = {
    ...baseArgs,
    taskID: 'taskId',
    taskTitle: 'Title',
    taskIsDone: false,
    todoListID: 'todoListId'
};
