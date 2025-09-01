import { AppScreen } from '@/components/screens/AppScreen/AppScreen'
import { CheckTermsOfUseDecorator } from '@/features/Auth'
import { Footer } from '@/widgets/Footer/ui/Footer'
import { Header } from '@/widgets/Header'
import { AppRouter } from './providers/router/AppRouter'
import './styles/index.css'
import cls from './App.module.pcss'
export const App = () => {
	return (
		<AppScreen>
			<CheckTermsOfUseDecorator>
				<Header />
				<div className={cls.wrap_page}>
					<AppRouter />
					<Footer />
				</div>
			</CheckTermsOfUseDecorator>
		</AppScreen>
	)
}
