import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character/');
    const data = await response.json();
    setCharacters(data.results);
  }
  useEffect(() => {
    getCharacters();
  }, []);
  /* useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results));
  }, []); */

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

  return(
    <Characters>
      {characters.map(character => (
        <Card key={character.id}>
          <Image src={character.image} alt="character" />
          <h2>{character.name}</h2>
        </Card>
      ))}
    </Characters>
  );
};

export default Characters;