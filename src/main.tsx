import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'   // ← поправили импорт
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

const basename = import.meta.env.BASE_URL

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename={basename}>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
)
