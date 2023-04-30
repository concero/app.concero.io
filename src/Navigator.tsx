import { CSSProperties, FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ExchangeScreen } from './components/screens/ExchangeScreen'
import { AppScreen } from './components/screens/AppScreen'

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = ({ ...rest }) => {
  return (
    <BrowserRouter>
      <AppScreen>
        <Routes>
          <Route path="/" element={<ExchangeScreen />} />
        </Routes>
      </AppScreen>
    </BrowserRouter>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
