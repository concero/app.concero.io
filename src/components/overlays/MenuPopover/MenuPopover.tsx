import { CSSProperties, FC } from 'react'
import Icon from '../../Icon'
import * as Icons from 'tabler-icons-react'
import styles from './MenuPopover.module.css'
import { colors } from '../../../constants/colors'

export interface MenuItem {
  title: string
  iconName: keyof typeof Icons
  danger?: boolean
}

export interface MenuPopoverProps {
  items: MenuItem[]
  style?: CSSProperties
}

export const MenuPopover: FC<MenuPopoverProps> = ({ items, style }) => {
  return (
    <div className={styles.container} style={style}>
      {items.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          <Icon
            className={styles.icon}
            name={item.iconName}
            color={item.danger ? colors.red.dark : colors.text.secondary}
          />
          <span className={styles.title} style={item.danger ? { color: colors.red.dark } : {}}>
            {item.title}
          </span>
        </div>
      ))}
    </div>
  )
}
