import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStandaloneToast } from '@chakra-ui/toast'
import AppRoutes from '@/routes'
import store from '@/store'
import '@/sass/_global.scss'

const { ToastContainer } = createStandaloneToast()

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastContainer />
        <AppRoutes />
    </Provider>
)
