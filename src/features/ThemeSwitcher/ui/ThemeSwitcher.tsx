import clsx from 'clsx'
import { Button, Switch, useTheme } from '@concero/ui-kit'
import DarkModeIcon from '@/shared/assets/icons/monochrome/theme/mode_dark.svg?react'
import cls from './ThemeSwitcher.module.pcss'

type TProps = {
	className?: string
}

export const ThemeSwitcher = (props: TProps) => {
	const { className } = props
	const { toggleTheme, theme } = useTheme()
	return (
		<Button
			as="div"
			className={clsx(className, cls.btn)}
			leftIcon={<DarkModeIcon />}
			rightIcon={<Switch checked={theme == 'dark'} className={cls.switch} />}
			variant="tetrary"
			isFull
			onClick={toggleTheme}
		>
			Dark Theme
		</Button>
	)
}
