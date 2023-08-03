import { JSX } from 'react/jsx-runtime'
import { FC, ReactElement } from 'react'
import { useAccount } from 'wagmi'
import { BaseButton } from './BaseButton'
import { Button } from '../../../buttons/Button/Button'
import IntrinsicAttributes = JSX.IntrinsicAttributes

interface DesktopButtonProps {
  open: IntrinsicAttributes & ((options?: any) => Promise<void>)
  ButtonWithPopover: (props: any) => ReactElement
  toggleTheme: () => void
  theme: string
}

export const DesktopButton: FC<DesktopButtonProps> = ({ open, ButtonWithPopover, toggleTheme, theme }) => {
  const { isConnected } = useAccount()

  return (
    <div>
      {isConnected ? <ButtonWithPopover onClick={open} /> : <BaseButton onClick={open} />}
      {/* <Button */}
      {/*  size="sq-md" */}
      {/*  onClick={toggleTheme} */}
      {/*  variant="black" */}
      {/*  leftIcon={{ */}
      {/*    name: theme === 'light' ? 'Moon' : 'Sun', */}
      {/*    iconProps: { size: 18 }, */}
      {/*  }} */}
      {/* /> */}
    </div>
  )
}
