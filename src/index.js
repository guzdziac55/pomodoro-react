/* eslint-disable import/no-cycle */
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import store from './store'

export const persistor = persistStore(store)

const RenderApp = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                        <ToastContainer
                            autoClose={2000}
                            position="bottom-center"
                            hideProgressBar
                        />
                    </PersistGate>
                </Provider>
            </React.StrictMode>
        </BrowserRouter>,

        document.getElementById('root')
    )
}
RenderApp()
