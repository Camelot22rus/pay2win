import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { HomePage, LoginPage, RegisterPage, GamePage, AddOfferPage } from './pages'
import { useAuth } from 'hooks/use-auth'
import Header from 'components/Header'

const App = () => {
  const {isAuth} = useAuth()

  return (
    <SnackbarProvider maxSnack={3}>
        <BrowserRouter basename="/">
            {isAuth ?
              <>
                <Header />
                <Routes>
                  <Route path="/"  element={<HomePage />}/>
                  <Route path="/games" element={<HomePage />}/>
                  <Route path="/games/:gameId" element={<GamePage />}/>
                  <Route path="/games/:gameId/:tab" element={<GamePage />}/>
                  <Route path="/addOffer" element={<AddOfferPage />}/>
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
              </>
            :
              <Routes>
                  <Route path="/"  element={<LoginPage />} />
                  <Route path="/register"  element={<RegisterPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            }
        </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App