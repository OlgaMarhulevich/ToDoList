import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddItemForm} from './AddItemForm'
import {action} from "@storybook/addon-actions";

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'add item on click button'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

const AddItemExample: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItem = AddItemExample.bind({});
AddItem.args = {
  addItem: action('item added; value:')
};
