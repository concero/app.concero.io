import classNames from './TextArea.module.pcss'

export const TextArea = () => {
  return (
    <div className={classNames.container}>
      <textarea className={classNames.textarea} placeholder="Enter text here..." />
    </div>
  )
}
