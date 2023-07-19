import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

import '../../../styles/index.css'
import '../../../styles/App.css'
import './Button.module.pcss'

type Story = StoryObj<typeof Button>
const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Buttons/Button',
}

export const Default: Story = {
  render: (args) => (
    <div className="row dark">
      <Button variant="primary" {...args}>
        Button
      </Button>
    </div>
  ),
}
export default meta
