import classNames from './CryptoSymbol.module.pcss'

export function CryptoIcon({ src = null }: { src?: string | null }) {
  return <div className={classNames.iconContainer}>{src ? <img src={src} /> : null}</div>
}
