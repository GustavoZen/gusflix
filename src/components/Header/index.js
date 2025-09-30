import './style.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <Link className='logo' to="/">Güsflix</Link>
            <div className='container-favoritos'>
            <Link className='favoritos' to="/favoritos">Favoritos</Link>
            </div>
        </header>
    );
}

export default Header;