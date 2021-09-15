import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWithRedux from './AppWithRedux'
import {action} from "@storybook/addon-actions";
import {store} from "./components/store/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const AppWithReduxExample: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux   />

export const AppWithReduxComponent = AppWithReduxExample.bind({});
