export const handleBeforeUnload = (event) => {
  event.preventDefault()
  event.returnValue = ''
}
