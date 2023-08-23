// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { StakingScreen } from './StakingScreen' // 👇 This default export determines where your story goes in the story list

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof StakingScreen> = {
  component: StakingScreen,
}

export default meta
type Story = StoryObj<typeof StakingScreen>

export const FirstStory: Story = {
  args: {
    // 👇 The args you need here will depend on your component
  },
}
