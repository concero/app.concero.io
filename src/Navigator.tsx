import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExchangeScreen } from './components/screens/ExchangeScreen/ExchangeScreen'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { PortfolioScreen } from './components/screens/PortfolioScreen/PortfolioScreen'

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = ({}) => (
  // const { modalState, modalDispatch } = useContext(ModalContext)
  <BrowserRouter>
    <AppScreen>
      <Header />
      <Routes>
        <Route path={routes.exchange} element={<ExchangeScreen />} />
        <Route path={routes.portfolio} element={<PortfolioScreen />} />
        {/* <Route path={routes.staking} element={<StakingScreen />} /> */}
        <Route path={routes.root} element={<Navigate to={routes.exchange} />} />
      </Routes>
      {/* todo: : may be a good idea to have 1 top level modal with context, issue is - everything rerenders when modal is open */}
      {/* <EntityListModal */}
      {/*  animate={false} */}
      {/*  title={`Select ${modalState.entityType}`} */}
      {/*  data={modalState.data} */}
      {/*  columns={modalState.entityType === 'chain' ? ChainColumns : TokenColumns} */}
      {/*  show={modalState.show} */}
      {/*  setShow={(value) => modalDispatch({ type: 'SET_SHOW', payload: value })} */}
      {/*  onSelect={(entity) => modalDispatch({ type: 'SET_ENTITY', payload: entity })} */}
      {/* /> */}
    </AppScreen>
  </BrowserRouter>
)
