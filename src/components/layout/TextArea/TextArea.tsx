import classNames from './TextArea.module.pcss'

export function TextArea({ onChange, ...rest }) {
  return (
    <div className={classNames.container}>
      <textarea
        onChange={onChange && onChange}
        className={classNames.textarea}
        placeholder="Enter text here..."
        {...rest}
      />
    </div>
  )
}
