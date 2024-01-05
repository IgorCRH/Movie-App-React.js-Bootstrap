import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaFilmes from './ListaFilmes';
import AddFavoritos from './AddFavoritos';
import RemoverFavoritos from './RemoverFavoritos';

class App extends React.Component {
  state = {
    filmes: [],
    favoritos: [],
    searchTerm: '',
    showFilmes: false, // Adiciona esta variável de estado
  };

  addFilmeFavorito = (filme) => {
    this.setState((prevState) => ({
      favoritos: [...prevState.favoritos, filme],
    }), () => {
      this.salvarparaDispositivo(this.state.favoritos);
    });
  };

  removerFilmeFavorito = (filme) => {
    this.setState((prevState) => ({
      favoritos: prevState.favoritos.filter((fav) => fav !== filme),
    }), () => {
      this.salvarparaDispositivo(this.state.favoritos);
    });
  }

  buscarFilmes = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=f3636e4d&s=${this.state.searchTerm}`);
      const data = await response.json();

      if (data.Search) {
        this.setState({ filmes: data.Search, showFilmes: true }); // Atualiza a variável showFilmes
      } else {
        this.setState({ filmes: [], showFilmes: true }); // Atualiza a variável showFilmes
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchClick = () => {
    this.buscarFilmes();
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.buscarFilmes();
    }
  };

  salvarparaDispositivo = (items) => {
    localStorage.setItem('app-filme-database', JSON.stringify(items))
  };

  componentDidMount() {
    const favoritosSalvos = JSON.parse(localStorage.getItem('app-filme-database')) || [];
    this.setState({ favoritos: favoritosSalvos });
  }

  render() {
    return (
      <div className='Principal'>
        <input
          type="text"
          placeholder="Digite para pesquisar filmes"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleSearchClick}>Pesquisar</button>

        <div className='container-lista filmeapp'>
          {this.state.showFilmes && <h2>Lista de Filmes</h2>}
          <div className='row'>
            <ListaFilmes
              filmes={this.state.filmes}
              handleFavouritesClick={this.addFilmeFavorito}
              favouriteComponent={AddFavoritos}
            />
          </div>
        </div>
        <div className='container-lista filmeapp'>
          <h2>Favoritos</h2>
          <div className='row'>
            <ListaFilmes
              filmes={this.state.favoritos}
              handleFavouritesClick={this.removerFilmeFavorito}
              favouriteComponent={RemoverFavoritos}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;