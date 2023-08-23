import classNames from './TextArea.module.pcss'

export function TextArea({ value, onChangeText }) {
  return (
    <div className={classNames.container}>
      <textarea
        className={classNames.textarea}
        placeholder="Enter text here..."
        value={value}
        onChange={onChangeText}
      />
    </div>
  )
}
