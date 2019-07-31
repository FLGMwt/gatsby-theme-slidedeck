import React from 'react';
import { css, Styled, ColorMode } from 'theme-ui';
import { Global } from '@emotion/core';

const Layout = ({ children, ...props }) => {
  return (
    <Styled.root
      {...props}
      style={{
        ...props.style,
        // allow swipe handlers to capture full screen
        height: '100vh',
        width: '100vw',
      }}
    >
      <ColorMode />
      {/*
          layout reset to allow full-screen touch handlers. prevents scrollbars
      */}
      <Global
        styles={css({
          body: {
            margin: 0,
            padding: 0,
          },
        })}
      />
      <div
        css={css({
          maxWidth: 'container',
          mx: 'auto',
          px: 3,
        })}
      >
        {children}
      </div>
    </Styled.root>
  );
};

export default Layout;
