describe('Button_function', () => {
  // Tests that the onClick function is called when the button is clicked. Tags: [happy path]
  it('test_on_click_function_is_called_when_button_is_clicked', () => {
    const onClickMock = jest.fn()
    const wrapper = shallow(<Button onClick={onClickMock} />)
    wrapper.simulate('click')
    expect(onClickMock).toHaveBeenCalled()
  })

  // Tests that the Button component renders with default props. Tags: [happy path]
  it('test_button_renders_with_default_props', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('button')).toHaveLength(1)
    expect(wrapper.find('button').hasClass(styles.button)).toBe(true)
    expect(wrapper.find('button').hasClass(styles.md)).toBe(true)
    expect(wrapper.find('button').hasClass(styles.primary)).toBe(true)
    expect(wrapper.find(LoadingAnimation)).toHaveLength(0)
    expect(wrapper.find(Icon)).toHaveLength(0)
  })

  // Tests that the Button component renders with an error message when leftIcon or rightIcon have an invalid name prop. Tags: [edge case]
  it('test_left_or_right_icon_have_invalid_name_prop', () => {
    const wrapper = shallow(<Button leftIcon={{ name: 'invalidIcon' }} />)
    expect(wrapper.find(Icon)).toHaveLength(0)
    expect(wrapper.text()).toContain('Invalid icon name')
  })

  // Tests that the Button component renders with empty className. Tags: [edge case]
  it('test_button_renders_with_empty_class_name', () => {
    const wrapper = shallow(<Button className="" />)
    expect(wrapper.find('button').hasClass('')).toBe(true)
  })

  // Tests that the Button component renders with all props provided. Tags: [happy path]
  it('test_button_renders_with_all_props_provided', () => {
    const wrapper = shallow(
      <Button
        size="lg"
        variant="secondary"
        leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}
        rightIcon={{ name: 'AlertTriangle', iconProps: { size: 18 } }}
        isLoading={false}
        className="custom-class"
      >
        Test Button
      </Button>,
    )
    expect(wrapper.find('button')).toHaveLength(1)
    expect(wrapper.find('button').hasClass(styles.button)).toBe(true)
    expect(wrapper.find('button').hasClass(styles.lg)).toBe(true)
    expect(wrapper.find('button').hasClass(styles.secondary)).toBe(true)
    expect(wrapper.find('button').hasClass(styles.customClass)).toBe(true)
    expect(wrapper.find(LoadingAnimation)).toHaveLength(0)
    expect(wrapper.find(Icon)).toHaveLength(2)
    expect(wrapper.text()).toContain('Test Button')
  })

  // Tests that the Button component renders with leftIcon and rightIcon. Tags: [happy path]
  it('test_button_renders_with_left_and_right_icon', () => {
    const wrapper = shallow(
      <Button
        leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}
        rightIcon={{ name: 'AlertTriangle', iconProps: { size: 18 } }}
      >
        Test Button
      </Button>,
    )
    expect(wrapper.find(Icon)).toHaveLength(2)
  })
})
