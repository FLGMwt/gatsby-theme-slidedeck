import React, { useState } from 'react';
import { css, useColorMode } from 'theme-ui';
import { home } from '../utils/navigation';
import Button from './button';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 3,
      })}
    >
      <Button onClick={() => setMenuOpen(!menuOpen)}>Menu</Button>
      {menuOpen && (
        <>
          <Button onClick={home}>Go to Decks</Button>
          <Button
            onClick={() =>
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
          >
            Enable {colorMode === 'light' ? 'dark' : 'light'} mode
          </Button>
        </>
      )}
    </div>
  );
};

export default Menu;
