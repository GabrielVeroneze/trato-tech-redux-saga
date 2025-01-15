import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PaginaPadrao from '@/pages/PaginaPadrao'
import Home from '@/pages/Home'
import Categoria from '@/pages/Categoria'
import Carrinho from '@/pages/Carrinho'
import Anuncie from '@/pages/Anuncie'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPadrao />}>
                    <Route index element={<Home />} />
                    <Route path="/categoria/:nomeCategoria" element={<Categoria />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/anuncie/:nomeCategoria" element={<Anuncie />} />
                    <Route path="/anuncie" element={<Anuncie />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes
