import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../../context/ThemeContext';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setDarkMode(!darkMode)
    theme === 'lightMode' ? setTheme('darkMode') : setTheme('lightMode');
    console.log(theme)
    console.log(darkMode)
  }

  const Header = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  `;

  return (
    <Header>
      <h1>ReactHooks</h1>
      <button type="button" onClick={handleClick}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </Header>
  );
};

export default Header;
