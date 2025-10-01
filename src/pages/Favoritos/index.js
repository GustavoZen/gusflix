import { useEffect } from "react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../services/api";
import "./favoritos.css";

function Favoritos(){

    const [favoritos, setFavoritos] = useState([]);

    const loadFavoritos = useCallback(() =>{
        let minhaLista = localStorage.getItem("@gusflix");
        minhaLista = JSON.parse(minhaLista) || [];
        setFavoritos(minhaLista);
    }, [])

    useEffect(()=> {
        loadFavoritos();
    }, [loadFavoritos]);

    function handleFavorito(event){
        const id = event.target.id;
        let filtroFilmes = favoritos.filter((item) => {
            return (item.id).toString() !== id;
        });
        setFavoritos(filtroFilmes);
        localStorage.setItem("@gusflix", JSON.stringify(filtroFilmes));
    }


    return(
        <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
            <h1>Favoritos: </h1>
            <div className="lista-favoritos">
                {favoritos.length === 0 ? 
                    <span>Você não possui nenhum filme salvo :(</span> 
                : 
                    favoritos.map((item) => {
                        return(
                            <article key={item.id} className="item-favorito">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src={`${imageUrl}${item.banner}`} alt={`${item.title}.png`} />
                                    <strong style={{marginLeft: "20px"}}>{item.title}</strong>
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                    <Link style= {{color:"white"}}to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                    <button id={item.id} onClick={handleFavorito}>Remover dos Favoritos</button>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Favoritos;