// ListaFilmes.js
import React from 'react';

const ListaFilmes = (itens) => {
  const FavouriteComponent = itens.favouriteComponent;

  const adicionarAosFavoritos = (filme) => {
    itens.handleFavouritesClick(filme);
  };

  return (
    <div className='lista-filmes'>
      {itens.filmes.map((filme, indice) => (
        <div key={indice} className='image-container d-flex justify-content-start m-3'>
          <img src={filme.Poster} alt={filme.Title} />
          <div onClick={() => adicionarAosFavoritos(filme)} className='overlay d-flex align-items-center justify-content-center'>
            <FavouriteComponent></FavouriteComponent>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaFilmes;
