import api, {imageUrl, api_key} from '../../services/api';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import {toast} from 'react-toastify';

function Filme(){
    const [filme, setFilme] = useState({});
    const { id } = useParams();
    const [hasFilme, setHasFilme] = useState(false);
    const [filmesSalvos, setFilmesSalvos] = useState([]);
    const navigate = useNavigate();
    const notify = (a) => {toast(a)}

    useEffect(() => {        
        setHasFilme(filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id ));
    }, [filmesSalvos, filme]);

    useEffect(() => {
        setFilmesSalvos(JSON.parse(localStorage.getItem("@gusflix")) || []);
    },[]);

    const handleFavorito = () => {
        if(hasFilme){
            let filtroFilmes = filmesSalvos.filter( (filmeSalvo) => filmeSalvo.id !== filme.id );
            setFilmesSalvos(filtroFilmes);
            localStorage.setItem("@gusflix", JSON.stringify(filtroFilmes));
            notify('Filme Removido da Lista de Favoritos')
        } else {
            let filmesAtualizados = [...filmesSalvos, {id: filme.id, title: filme.title, banner: filme.poster_path}];
            setFilmesSalvos(filmesAtualizados);
            localStorage.setItem("@gusflix", JSON.stringify(filmesAtualizados));
            notify('Filme Adicionado à Lista de Favoritos')
        }
    }

    useEffect(()=>{
        async function loadFilme(){
            api.get(`movie/${id}`,{params:
                {
                    api_key: api_key,
                    language: 'pt-BR'
                }
            })
            .then((res)=>{
                setFilme(res.data);
                console.log(res.data);
            })
            .catch(()=>{
                navigate('/', {replace: true});
                return;
            })
        };
        loadFilme();
    }, [navigate, id])

    return(
        <div>
            <div className='filme-filme'>
                <div className = "info">
                    <h1>{filme.title}<br/>{filme.tagline}</h1>
                    <img src = {`${imageUrl}${filme.backdrop_path}`} alt={filme.title}/>
                    <span>Gênero(s): {filme.genres && filme.genres.map(g => g.name).join(', ')}</span>
                    <span><b>Sinópse:</b><br/><br/>{filme.overview}<br/><br/>Avaliação: {filme.vote_average} / 10</span>
                    <div className='area-botoes'>
                        <button onClick={() => {window.open(filme.homepage, '_blank')}}>Página do Filme</button>
                        <button onClick={() => {window.open(`https://youtube.com/results?search_query=${filme.title} Trailer`)}}>Trailer</button>
                        <button onClick={handleFavorito}>{!hasFilme ? 'Salvar como favorito' : 'Remover dos Favoritos'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filme;