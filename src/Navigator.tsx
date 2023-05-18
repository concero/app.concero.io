import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExchangeScreen } from './components/screens/ExchangeScreen/ExchangeScreen'
import { AppScreen } from './components/screens/AppScreen'
import { Header } from './components/layout/Header/Header'
import { routes } from './constants/routes.ts'

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = ({}) => (
  <BrowserRouter>
    <AppScreen>
      <Header />
      <Routes>
        <Route path={routes.exchange} element={<ExchangeScreen />} />
        <Route path={routes.portfolio} element={<div>Portfolio</div>} />
        <Route path={routes.root} element={<Navigate to={routes.exchange} />} />
      </Routes>
    </AppScreen>
  </BrowserRouter>
)
