import React from 'react';
import { Styled, css } from 'theme-ui';

const DeckTitle = ({ title, subtitle }) => (
  <div
    css={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Styled.h1 css={css({ fontSize: 6 })}>{title}</Styled.h1>
    {!!subtitle && <Styled.h2>{subtitle}</Styled.h2>}
  </div>
);

export default DeckTitle;
