import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ExchangeScreen } from './components/screens/ExchangeScreen/ExchangeScreen'
import { AppScreen } from './components/screens/AppScreen'
import { Header } from './components/layout/Header/Header'

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = ({}) => (
  <BrowserRouter>
    <AppScreen>
      <Header />
      <Routes>
        <Route path="/" element={<ExchangeScreen />} />
      </Routes>
    </AppScreen>
  </BrowserRouter>
)
