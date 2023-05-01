import { FC } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'

interface IconComponentProps extends IconProps {
  name?: keyof typeof Icons
}

const Icon: FC<IconComponentProps> = ({ name = 'Plant', ...rest }) => {
  const IconComponent = Icons[name]
  return <IconComponent {...rest} />
}

export default Icon
