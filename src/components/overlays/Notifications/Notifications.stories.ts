// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { Notifications } from './Notifications'

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Notifications> = {
	component: Notifications,
}

export default meta
type Story = StoryObj<typeof Notifications>

export const FirstStory: Story = {
	args: {
		// 👇 The args you need here will depend on your component
	},
}
