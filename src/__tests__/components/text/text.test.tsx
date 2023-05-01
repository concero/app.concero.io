import { chai, describe, test } from 'vitest'
import { expect } from 'chai'
import chaiDom from 'chai-dom'
import { render, screen } from '@testing-library/react'
import * as TextComponents from '../../../components/text'

chai.use(chaiDom)

const testTextComponent = (Component, componentName) => {
  describe(`${componentName} component`, () => {
    test('renders without crashing', () => {
      render(<Component>{`Test ${componentName}`}</Component>)
      const element = screen.getByText(`Test ${componentName}`)
      expect(element).to.exist
    })

    test('renders with custom styles', () => {
      render(
        <Component style={{ color: 'red', fontSize: '32px' }}>{`Test ${componentName} with Custom Styles`}</Component>,
      )
      const element = screen.getByText(`Test ${componentName} with Custom Styles`)
      expect(element).to.have.style('color', 'red')
      expect(element).to.have.style('font-size', '32px')
    })

    test('renders with additional props', () => {
      render(
        <Component id="testId" data-testid="testDataId">
          {`Test ${componentName} with Additional Props`}
        </Component>,
      )
      const element = screen.getByTestId('testDataId')
      expect(element).to.have.attribute('id', 'testId')
    })
    test('renders with different child types', () => {
      const text = 'Test Text'
      const link = <a href="https://example.com">Link</a>
      render(
        <Component>
          {text}
          {link}
        </Component>,
      )
      const textElement = screen.getByText(text)
      const linkElement = screen.getByText('Link')
      expect(textElement).to.exist
      expect(linkElement).to.exist
    })
  })
}

Object.entries(TextComponents).forEach(([name, Component]) => {
  testTextComponent(Component, name)
})
