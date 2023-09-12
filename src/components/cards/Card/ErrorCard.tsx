import { Reload } from '@tabler/icons-react'
import classNames from './ErrorCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'

export function ErrorCard({ setIsOk }) {
  return (
    <div className={classNames.container} >
      <h4 className={classNames.headerTitle}>Couldn’t load data.</h4>
      <Button variant='black' size='sm' leftIcon={<Reload size={16} color={colors.text.secondary} />} onClick={() => setIsOk(true)}>
        <p className="body1">Retry<p>
      </Button>
    </div>
  )}
