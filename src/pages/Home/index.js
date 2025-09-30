import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api, {imageUrl} from '../../services/api';
import './style.css';

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);    
        async function loadFilmes(){
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '60d1a175b89d11e90614a3ffbe5c97ff',
                    language: 'pt-BR',
                    page: 1 
                }
            })
            setFilmes(response.data.results);
            setCarregando(false);
        };
        loadFilmes();
    }, [] )

    if(carregando){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
    return(
        <div className='App'>
            <h1>Página Inicial</h1>
            <div className='filmes-container'>
                {filmes.slice(0,10).map(filme => {
                    return(
                        <article className='filme' key={filme.id}>
                            <img src={`${imageUrl}${filme.poster_path}`} alt={filme.title} />
                            <div className ='info'>
                                <h1>{filme.title}</h1>
                                <p>{filme.overview}</p>
                                <Link to={`filme/${filme.id}`}>Acessar</Link>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;