import { FC } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'

interface IconComponentProps extends IconProps {
  name?: keyof typeof Icons
}

/**
 Renders an icon from the Tabler Icons library.
 @param {IconComponentProps} props - The props object that contains the name of the icon to render, and any additional icon props.
 @returns {JSX.Element} The icon component to render.
 */
const Icon: FC<IconComponentProps> = ({ name = 'Plant', ...rest }) => {
  const IconComponent = Icons[name]
  return <IconComponent {...rest} />
}

export default Icon
