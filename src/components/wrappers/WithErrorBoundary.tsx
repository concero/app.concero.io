import React, { Component } from 'react'
import { Button } from '../buttons/Button/Button'

export function FallbackComponent({ error }) {
	return (
		<div className="card f1 ac jc">
			<h5 style={{ color: 'var(--color-text-secondary)' }}>Something went wrong.</h5>
		</div>
	)
}

export function NotFoundFallback() {
	return (
		<div className="f1 ac jc">
			<h5 style={{ color: 'var(--color-text-secondary)' }}>No items found</h5>
		</div>
	)
}

export function FetchingFallback(setError: React.Dispatch<React.SetStateAction<null>>) {
	return (
		<div className="card f1 ac jc">
			<h5 style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--sp-md)' }}>Couldn't fetch data</h5>
			<Button
				variant="subtle"
				onClick={() => {
					setError(null)
				}}
			>
				Retry
			</Button>
		</div>
	)
}

export function withErrorBoundary(WrappedComponent) {
	return class ErrorBoundary extends Component {
		constructor(props) {
			super(props)
			this.state = { hasError: false }
		}

		static getDerivedStateFromError() {
			return { hasError: true }
		}

		componentDidCatch(error, errorInfo) {
			console.error('Caught by error boundary:', error, errorInfo)
		}

		resetError = () => {
			this.setState({ hasError: false })
		}

		render() {
			if (this.state.hasError) {
				return <FallbackComponent resetError={this.resetError} />
			}
			return <WrappedComponent {...this.props} />
		}
	}
}
