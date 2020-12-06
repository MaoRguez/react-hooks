import React, { useState } from 'react';
// import styled from 'styled-components';
import ThemeContext from './context/ThemeContext';
import Header from './components/Header/Header';
import Characters from './components/Characters/Characters';
import './App.css';


function App() {
  const [theme, setTheme] = useState('lightMode');

  /* const Container = styled.main`
    background-Color: ${props => props.theme ? '#fafafa' : '#252525'};
    color: ${props => props.theme ? '#252525' : '#fafafa'};
    /* .darkMode {
      background-color: #252525;
      color: #fafafa;
    }
    .lightMode {
      background-color: #fafafa;
      color: #252525;
    }
  `;*/

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={'App ' + theme}>
        <Header />
        <Characters />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
