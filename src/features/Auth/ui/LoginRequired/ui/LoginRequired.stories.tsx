import type { Meta, StoryObj } from '@storybook/react'
import { LoginRequired } from './LoginRequired'

const meta: Meta<typeof LoginRequired> = {
	component: LoginRequired,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
