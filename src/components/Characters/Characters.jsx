import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from '../Search/Search';
import useCharacters from '../../hooks/useCharacters';
import styled from 'styled-components';


const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';

//Reducer que se va encvargar de agregar a fovoritos
const favoriteReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
};

const Characters = () => {
  // const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API);
  //Ahora se va utlizar custom hooks para la api
  /* const getCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character/');
    const data = await response.json();
    setCharacters(data.results);
  }
  useEffect(() => {
    getCharacters();
  }, []); */
  /* useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results));
  }, []); */

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
  }

  /* const handleSearch = (event) => {
    setSearch(event.target.value);
  } */
  //Busqueda con memoización
  /* const handleSearch = () => {
    setSearch(searchInput.current.value);
  } */

  //Busqueda con callback
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const Characters = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    justify-items: center;
    padding: 15px;
    @media screen and (max-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 425px) {
      display: grid;
      grid-template-columns: 1fr;
    }
  `;

  const Card = styled.div`
    width: 200px;
    padding: 10px 0;
    margin-top: 10px;
  `;

  const Image = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow:0px 2px 3px rgba(0, 0, 0, 0.5);
    transition: 0.2s ease;
  `;

  const Name = styled.h2`

  `;
  //Buesqueda simple
  /* const filteredUsers = characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }) */

  //Busqueda con useMemo
  const filteredUsers = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }), [characters, search]
  );

  return(
    <Characters>
      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
      {filteredUsers.map(character => (
        <Card key={character.id}>
          <Image src={character.image} alt="character" />
          <Name>{character.name}</Name>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a Favoritos
          </button>
        </Card>
      ))}
    </Characters>
  );
};

export default Characters;