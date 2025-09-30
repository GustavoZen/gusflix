import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from './components/Header';
import Favoritos from './pages/Favoritos';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filme/:id" element={<Filme/>}/>
                <Route path="/favoritos" element={<Favoritos/>}/>

                <Route path="*" element={<h1>404</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;