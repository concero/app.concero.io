import { FC, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExchangeScreen } from './components/screens/ExchangeScreen/ExchangeScreen'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { PortfolioScreen } from './components/screens/PortfolioScreen/PortfolioScreen'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { StakingScreen } from './components/screens/StakingScreen/StakingScreen'

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = ({}) => (
  <BrowserRouter>
    <AppScreen>
      <Header />
      <Routes>
        <Route path={routes.exchange} element={<ExchangeScreen />} />
        <Route
          path={routes.portfolio}
          element={(
            <Suspense fallback={<FullScreenLoader />}>
              <PortfolioScreen />
            </Suspense>
          )}
        />
        <Route path={routes.portfolio} element={<PortfolioScreen />} />
        <Route path={routes.staking} element={<StakingScreen />} />
        <Route path={routes.root} element={<Navigate to={routes.exchange} />} />
      </Routes>
    </AppScreen>
  </BrowserRouter>
)
