export const handleSelect = (item, type, setSelectedItemsIds) => {
  if (type === 'singleselect') {
    setSelectedItemsIds([item.id])
    return
  }

  setSelectedItemsIds((prevKeys: string) => {
    if (prevKeys.includes(item.id)) {
      return prevKeys.filter((itemKey: string) => itemKey !== item.id)
    }
    return [...prevKeys, item.id]
  })
}
