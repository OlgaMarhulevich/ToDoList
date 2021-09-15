import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Input} from './Input'
import {action} from "@storybook/addon-actions";

export default {
  title: 'TodoList/Input',
  component: Input,
  argTypes: {
    addItem: {
      description: 'add item on click button'
    }
  },
} as ComponentMeta<typeof Input>;

const AddItemExample: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const AddItem = AddItemExample.bind({});
AddItem.args = {
  addItem: action('item added; value:')
};
