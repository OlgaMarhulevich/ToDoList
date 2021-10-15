import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from './App'
import {action} from "@storybook/addon-actions";
import {store} from "../store/store";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/TodolistsList',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const AppWithReduxExample: ComponentStory<typeof App> = () => <App demo/>

export const AppWithReduxComponent = AppWithReduxExample.bind({});
