import api, {imageUrl, api_key} from '../../services/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Filme(){
    const [filme, setFilme] = useState({});
    const { id } = useParams();
    
    useEffect(()=>{
        async function loadFilme(){
            const response = api.get(`movie/${id}`,{params:
                {
                    api_key: '60d1a175b89d11e90614a3ffbe5c97ff',
                    language: 'pt-BR'
                }
            })
            .then((res)=>{
                setFilme(res.data);
            })
            .catch((e)=>{
                console.log("Erro: " + e);
            })
        };
        loadFilme();
    }, [])

    return(
        <div>
            <h1>Página do Filme</h1>
        </div>
    );
}

export default Filme;