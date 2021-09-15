import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {EditableSpan} from './EditableSpan'
import {action} from "@storybook/addon-actions";

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan,
  argTypes: {
    changeTitle: {
      description: 'changing title on click button'
    },
    title: {
      defaultValue: 'Title',
      description: 'title of task or todoList'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanExample: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanComponent = EditableSpanExample.bind({});
EditableSpanComponent.args = {
  changeTitle: action('title changed:')
};
