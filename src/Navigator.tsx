import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'

const ExchangeScreen = lazy(() => import('./components/screens/ExchangeScreen/ExchangeScreen').then((module) => ({ default: module.ExchangeScreen })))
// const PortfolioScreen = lazy(() => import('./components/screens/PortfolioScreen/PortfolioScreen').then((module) => ({ default: module.PortfolioScreen })))
// const StakingScreen = lazy(() => import('./components/screens/StakingScreen/StakingScreen').then((module) => ({ default: module.StakingScreen })))

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = () => (
  <BrowserRouter>
    <AppScreen>
      <Header />
      <Routes>
        <Route
          path={routes.exchange}
          element={
            <Suspense fallback={<FullScreenLoader />}>
              <ExchangeScreen />
            </Suspense>
          }
        />
        {/*<Route*/}
        {/*  path={routes.portfolio}*/}
        {/*  element={*/}
        {/*    <Suspense fallback={<FullScreenLoader />}>*/}
        {/*      <PortfolioScreen />*/}
        {/*    </Suspense>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={routes.staking}*/}
        {/*  element={*/}
        {/*    <Suspense fallback={<FullScreenLoader />}>*/}
        {/*      <StakingScreen />*/}
        {/*    </Suspense>*/}
        {/*  }*/}
        {/*/>*/}
        <Route path={routes.root} element={<Navigate to={routes.exchange} />} />
      </Routes>
    </AppScreen>
  </BrowserRouter>
)
