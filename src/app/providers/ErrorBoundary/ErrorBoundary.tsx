import { PageError } from '@/widgets/PageError'
import React, { Suspense, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(_error: Error): { hasError: boolean } {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	override componentDidCatch(error: Error, info: ErrorInfo): void {
		// You can also log the error to an error reporting service
		console.log(error, info)
	}

	override render(): JSX.Element | ReactNode {
		const { hasError } = this.state
		const { children } = this.props

		if (hasError) {
			// You can render any custom fallback UI
			return (
				<Suspense fallback={''}>
					<PageError />
				</Suspense>
			)
		}

		return children
	}
}

export default ErrorBoundary
