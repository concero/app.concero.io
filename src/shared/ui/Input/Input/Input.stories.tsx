import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import Plus from '@/lib/assets/icons/monochrome/Plus.svg?react'
const meta: Meta<typeof Input> = {
	component: Input,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		placeholder: 'Input',
	},
}
export const PrimaryFull: Story = {
	args: {
		icon: <Plus />,
		iconHint: <Plus />,
		placeholder: 'Placeholder',
		hintText: 'Hint text',
		count: {
			max: 10,
		},
		labelText: 'Label',
		subLabelText: 'Help text',
	},
}
export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '50px' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<Input
					size="m"
					icon={<Plus />}
					placeholder="Medium"
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
				<Input
					size="m"
					isFocused
					placeholder="Focused"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="m"
					isHovered
					placeholder="Hovered"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="m"
					isPressed
					placeholder="Pressed"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="m"
					isError
					placeholder="Error"
					icon={<Plus />}
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
				<Input
					size="m"
					isSuccess
					placeholder="Success"
					icon={<Plus />}
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<Input
					size="l"
					icon={<Plus />}
					placeholder="Large"
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
				<Input
					size="l"
					isFocused
					placeholder="Focused"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="l"
					isHovered
					placeholder="Hovered"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="l"
					isPressed
					placeholder="Pressed"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="l"
					isError
					placeholder="Error"
					icon={<Plus />}
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
				<Input
					size="l"
					isSuccess
					placeholder="Success"
					icon={<Plus />}
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<Input
					size="xl"
					icon={<Plus />}
					placeholder="Extra Large"
					iconHint={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					hintText="Hint text"
				/>
				<Input
					size="xl"
					isFocused
					placeholder="Focused"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="xl"
					isHovered
					placeholder="Hovered"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="xl"
					isPressed
					placeholder="Pressed"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="xl"
					isError
					placeholder="Error"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
				<Input
					size="xl"
					isSuccess
					placeholder="Success"
					icon={<Plus />}
					labelText="Label"
					subLabelText="Help text"
					count={{
						max: 10,
					}}
					iconHint={<Plus />}
					hintText="Hint text"
				/>
			</div>
		</div>
	),
}
