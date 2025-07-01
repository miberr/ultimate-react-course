import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<p>Welcome to the app!</p>} />
                    <Route path="cities" element={<p>List of cities</p>} />
                    <Route
                        path="countries"
                        element={<p>List of countries</p>}
                    />
                    <Route path="form" element={<p>Form page</p>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
