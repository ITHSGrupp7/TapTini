import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { persistor, store } from "./state/store.ts"
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
